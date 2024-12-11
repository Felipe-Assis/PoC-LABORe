const apiRequest = async (url, options = {}, addToast) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.details || 'Erro desconhecido na API');
        }

        return data;
    } catch (error) {
        console.error(`API request failed: ${error.message}`);
        if (addToast) {
            addToast(error.message, 'danger');
        }
        throw error; // rethrow for further handling if needed
    }
};

export default apiRequest;