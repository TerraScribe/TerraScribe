import { apiConfig } from "./api_config";

const postRequest = async (body: any) => {
    try {
        const response = await fetch(apiConfig.url+'/code/visual', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default postRequest;