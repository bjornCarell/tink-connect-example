import {handleResponse} from '../handleResponse/handleResponse'

export const getUserData = async (token, base) => {
    const response = await fetch(`${base}/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(response);
}