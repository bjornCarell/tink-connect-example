import {handleResponse} from '../handleResponse/handleResponse'

export const getTransactionData = async (token,base) => {
    const response = await fetch(`${base}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            limit: 5
        })
    });

    return handleResponse(response);
}

