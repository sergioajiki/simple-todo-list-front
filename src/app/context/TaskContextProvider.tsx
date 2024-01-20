'use client';
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Task } from "../types/propsTask";
import { getAllTasksFromApi } from "../services/api";

export const TaskContext = React.createContext({});

function TaskContextProvider({ children }: { children: React.ReactNode }) {
    const [taskLoaded, setTaskLoaded] = useState<boolean>(false);
    const [allTasks, setAllTasks] = useState<Task[] | null>([]);
    const [taskInProgress, setTaskInProgress] = useState<Task[]>([]);
    const [taskDone, setTaskDone] = useState<Task[]>([]);

    const featchTaskData = useCallback(async () => {
        const tasks = await getAllTasksFromApi();
        console.log(tasks);
        setAllTasks(tasks);
        const tInProgress: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "INPROGRESS") : [];
        setTaskInProgress(tInProgress);
        const tDone: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "DONE") : [];
        setTaskDone(tDone);
    }, [taskDone, taskInProgress, allTasks])

    useEffect(() => {
        if (!taskLoaded) {
            featchTaskData();
            setTaskLoaded(true);
        }
    }, [taskLoaded, featchTaskData]);

    console.log('allTasks', allTasks);
    console.log('taskInProgress', taskInProgress);
    console.log('taskDone', taskDone);
    console.log('taskLoaded', taskLoaded);

    const values = {
        allTasks,
        setAllTasks,
        taskInProgress,
        setTaskInProgress,
        taskDone,
        setTaskDone,        
        taskLoaded,
        setTaskLoaded,
        featchTaskData
    };

    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    );
}

TaskContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TaskContextProvider;