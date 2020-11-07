import dotenv from'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fetch from 'node-fetch'
import {handleResponse} from './handleResponse/handleResponse'
import {getAccessToken, CLIENT_ID, CLIENT_SECRET} from './getAccessToken/getAccessToken'
import {getUserData} from './getUserData/getUserData'
import {getAccountData} from './getAccountData/getAccountData'

dotenv.config()
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Needed to make client-side routing work in production.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const base = "https://api.tink.se/api/v1";

// This is the server API, where the client can post a received OAuth code.
app.post("/callback", function(req, res) {
  getAccessToken(req.body.code, base)
    .then(response => getData(response.access_token))
    .then(response => {
      res.json({
        response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.toString() });
    });
});


async function getData(accessToken) {
  const [
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData
  ] = await Promise.all([
    getCategoryData(accessToken),
    getUserData(accessToken),
    getAccountData(accessToken),
    getInvestmentData(accessToken),
    getTransactionData(accessToken)
  ]);

  return {
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData
  };
}

async function getInvestmentData(token) {
  const response = await fetch(base + "/investments", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

async function getTransactionData(token) {
  const response = await fetch(base + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ limit: 5 })
  });

  return handleResponse(response);
}

async function getCategoryData(token) {
  const response = await fetch(base + "/categories", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

if (!CLIENT_ID) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Warning: REACT_APP_CLIENT_ID environment variable not set"
  );
}

if (!CLIENT_SECRET) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Warning: TINK_CLIENT_SECRET environment variable not set"
  );
}

// Start the server.
const port = 8080;
app.listen(port, function() {
  console.log("Tink example app listening on port " + port);
});
