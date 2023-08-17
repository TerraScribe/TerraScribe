import { apiConfig } from "./api_config";
const visualize = async (
    prompt: string,
    selectedProvider: string,
    selectedTfVersion: string,
) => {
    try {
        const response = await fetch(apiConfig.url+'/visualize', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `${prompt} for ${selectedProvider} in terraform version ${selectedTfVersion}`,
            }),
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default visualize;
