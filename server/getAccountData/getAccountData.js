import {handleResponse} from '../handleResponse/handleResponse'

export const getAccountData = async (token, base) => {
    const response = await fetch(`${base}/accounts/list`, {
        headers: {
            'Content-Type': 'application.json',
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(response);
}