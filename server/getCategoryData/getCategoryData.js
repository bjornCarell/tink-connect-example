import {handleResponse} from '../handleResponse/handleResponse'

export const getCategoryData = async (token, base) => {
    const response = await fetch(`${base}/category`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(response);
}