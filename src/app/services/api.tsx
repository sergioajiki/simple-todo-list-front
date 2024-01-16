import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
}); 

// retorna o endpoint get/users
async function getAllTasks() {
    const response = await api.get('/tasks');
    console.log(response.data);
    
    return response.data;
}

export { getAllTasks};