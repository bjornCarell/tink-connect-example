import {handleResponse} from '../handleResponse/handleResponse'

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;

export const getAccessToken = async (code,base) => {
    const body = {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
    };

    const response = await fetch(`${base}/oauth/token`, {
        method: 'POST',
        body: Object.keys(body)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
            .join('&'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });

    return handleResponse(response);
}