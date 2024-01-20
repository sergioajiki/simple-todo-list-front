import axios from 'axios';
import { TaskPayload } from '../types/propsTask';

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

async function createTask(taskPayload: TaskPayload) {
    const response = await api.post('/tasks', taskPayload);
    // console.log(response.data);
    return response.data;
}

async function updateTaskDoneFromApi(id: number) {
    const response = await api.patch(`/tasks/updateTaskDone/${id}`);
    // console.log(response.data);
    return response.data;
}

async function updateTaskInProgressFromApi(id: number) {
    const response = await api.patch(`/tasks/updateTaskInProgress/${id}`);
    // console.log(response.data);
    return response.data;
}
async function deleteTaskFromApi(id: number) {
    const response = await api.delete(`/tasks/${id}`);
    // console.log(response.data);
    return response.data;
}

export {
    getAllTasksFromApi,
    updateTaskInProgressFromApi,
    updateTaskDoneFromApi,
    createTask,
    deleteTaskFromApi,
    getHealthBack

};