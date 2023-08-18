import { apiConfig } from "./api_config";

const analysisRequest = async (body: any) => {
    try {
        const response = await fetch(apiConfig.url+'/code/analyze', {
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

export default analysisRequest;