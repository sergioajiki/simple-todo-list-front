'use client';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Task from "../models/Task";
import { deleteTaskFromApi, getAllTasksFromApi, getHealthBack, updateTaskDoneFromApi, updateTaskInProgressFromApi } from "../services/api";
import TaskInfoCard from "./TaskInfoCard";
import AddTaskCard from "./AddTaskCard";
import { TaskList } from "../types/propsTask";
import TaskContextProvider, { TaskContext } from "../context/TaskContextProvider";

export default function TodoList() {

  const [health, setHealth] = useState<string | null>(null);

  const {
     allTasks, 
     setAllTasks, 
     taskInProgress, 
     setTaskInProgress, 
     taskDone, 
     setTaskDone, 
     taskLoaded,
     setTaskLoaded, 
     featchTaskData
  } = useContext(TaskContext);

  // useEffect(() => {
  //   async function featHealthData() {
  //     try {
  //       const healthData = await getHealthBack();
  //       setHealth(healthData);
  //     } catch (error) {
  //       console.log("Erro ao obter Health", error);
  //     }
  //   }
  //   featHealthData();
  // }, []);

  async function deleteTask(id: number) {
    const response = await deleteTaskFromApi(id);
    setTaskLoaded(false);
  }

  async function updateTaskDone(id: number) {
    const response = await updateTaskDoneFromApi(id);
    setTaskLoaded(false);
  }

  async function updateTaskInProgress(id: number) {
    const response = await updateTaskInProgressFromApi(id);
    setTaskLoaded(false);
  }

  return (
    <>
      {/* <p>{health}</p> */}
      <div>
        <AddTaskCard />
      </div>
      <div>
        <h4>Tasks To Do</h4>
        <TaskInfoCard taskList={taskInProgress} />
      </div>
      <div>
        <h4>Tasks Done</h4>
        <TaskInfoCard taskList={taskDone} />
      </div>
    </>
  )
}


