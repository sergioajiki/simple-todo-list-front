import axios from 'axios';
import { TaskPayload } from '../types/propsTask';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

async function getAllTasksFromApi() {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}

async function getHealthBack(): Promise<string> {
    const response = await api.get('/health');
    return response.data;
}

async function createTask(taskPayload: TaskPayload) {
    const response = await api.post('/tasks', taskPayload);
    return response.data;
}

async function updateTaskDoneFromApi(id: number) {
    const response = await api.patch(`/tasks/updateTaskDone/${id}`);
    return response.data;
}

async function updateTaskInProgressFromApi(id: number) {
    const response = await api.patch(`/tasks/updateTaskInProgress/${id}`);
    return response.data;
}
async function deleteTaskFromApi(id: number) {
    const response = await api.delete(`/tasks/${id}`);
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