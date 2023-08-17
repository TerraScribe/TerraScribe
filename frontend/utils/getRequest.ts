import { apiConfig } from "./api_config";

const getRequest = async () => {
    try {
        const response = await fetch(apiConfig.url+'/code');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getRequest;