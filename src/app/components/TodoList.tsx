'use client';
import { useEffect, useRef, useState } from "react";
import Task from "../models/Task";
import { getAllTasksFromApi, getHealthBack } from "../services/api";
import TaskInfoCard from "./TaskInfoCard";
import AddTaskCard from "./AddTaskCard";

export default function TodoList() {

  const [health, setHealth] = useState<string | null>(null);

  const [allTasks, setAllTasks] = useState<Task[] | null>([]);
  // const [tasksLoaded, setTasksLoaded] = useState<boolean>(false);

  
  useEffect(() => {
    async function featHealthData() {
      try {
        const healthData = await getHealthBack();
        setHealth(healthData);
      } catch (error) {
        console.log("Erro ao obter Health", error);
      }
    }
    featHealthData();
  }, []);

  async function featchTaskData() {
    try {
      const tasks = await getAllTasksFromApi();
      console.log(tasks);
      setAllTasks(tasks);
    } catch (error) {
      console.log("Erro ao obter todas as tarefas", error);
    }
  }

  useEffect(() => {
    featchTaskData();
  }, [allTasks]);

  const taskInProgress = allTasks ? allTasks.filter(task => task.currentState === "INPROGRESS") : [];
  const taskDoneDate = allTasks ? allTasks.filter(task => task.currentState === "DONE") : [];
  return (
    <>
      <p>{health}</p>

      <div>
        <AddTaskCard />
      </div>
      <div>
        <h4>Tasks To Do</h4>
        <TaskInfoCard taskList={taskInProgress} />
      </div>
      <div>
        <h4>Tasks Done</h4>
        <TaskInfoCard taskList={taskDoneDate} />
      </div>

    </>
  )
}


