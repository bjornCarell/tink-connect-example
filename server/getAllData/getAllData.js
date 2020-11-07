import {getUserData} from '../getUserData/getUserData'
import {getAccountData} from '../getAccountData/getAccountData'
import {getInvestmentData} from '../getInvestmentData/getInvestmentData'
import {getCategoryData} from '../getCategoryData/getCategoryData'
import {getTransactionData} from '../getTransactionData/getTransactionData'

export const getAllData = async accessToken => {
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