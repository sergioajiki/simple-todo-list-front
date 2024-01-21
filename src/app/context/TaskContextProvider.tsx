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
        setAllTasks(tasks);
        const tInProgress: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "INPROGRESS") : [];
        setTaskInProgress(tInProgress);
        const tDone: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "DONE") : [];
        setTaskDone(tDone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskDone, taskInProgress, allTasks])

    useEffect(() => {
        if (!taskLoaded) {
            featchTaskData();
            setTaskLoaded(true);
        }
    }, [taskLoaded, featchTaskData]);

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