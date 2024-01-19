import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// retorna o endpoint get/users
async function getAllTasksFromApi() {
    try {
        const response = await api.get('/tasks');
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}

async function getHealthBack(): Promise<string> {
    const response = await api.get('/health');
    // console.log(response.data);
    return response.data;
}

export { getAllTasksFromApi, getHealthBack };