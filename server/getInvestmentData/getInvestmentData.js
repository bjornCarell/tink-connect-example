import {handleResponse} from '../handleResponse/handleResponse'

export const getInvestmentData = async (token, base) => {
    const response = await fetch(`${base}/investments`, {
        'Application-type': 'application.json',
        Authorization: `Bearer ${token}`
    });

    return handleResponse(response);
}