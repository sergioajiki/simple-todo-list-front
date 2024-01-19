'use client'
import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import TaskList from '../models/TaskList';
import Task from '../models/Task';
import { api } from '../services/api';

interface TaskContextProps {
    taskList: TaskList;
    addTask: (task: Task) => Promise<void>;
    fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskList, setTaskList] = useState<TaskList>(new TaskList());

    const addTask = useCallback(async (task: Task) => {
        try {
            await api.post('/tasks', task);
            setTaskList((prevTaskList) => {
                const updatedTaskList = new TaskList();
                updatedTaskList.tasks = [...prevTaskList.tasks, task];
                return updatedTaskList;
            });
        } catch (error) {
            console.log('Erro ao adicionar tarefa: ', error);

        }

    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await api.get('/tasks');
            const tasksData = response.data;
            const tasks = tasksData.map((task: any) => new Task(
                task.id,
                task.taskName,
                task.description,
                task.taskCreationDate,
                task.priority,
                task.currentStatus,
                task.taskDoneDate,
            ));
            setTaskList(new TaskList());
            tasks.forEach((task: Task) => taskList.addTask(task));

        } catch (error) {
            console.log('Erro ao buscar tarefas: ', error);
        }
    }, [taskList]);

    return (
        <TaskContext.Provider value={{ taskList, addTask, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext deve ser usado dentro do TaskProvider');
    }
    return context;
}