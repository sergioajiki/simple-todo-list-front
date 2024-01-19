'use client';
import { useEffect, useState } from "react";
import Task from "../models/Task";
import { getAllTasksFromApi, getHealthBack } from "../services/api";
import TaskInfoCard from "./TaskInfoCard";

export default function TodoList() {

  const [health, setHealth] = useState<string | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    async function featchTaskData() {
      try {
        const allTasks = await getAllTasksFromApi();
        // console.log(allTasks);
        setAllTasks(allTasks);
      } catch (error) {
        console.log("Erro ao obter todas as tarefas", error);
      }
    }
    featchTaskData();
  }, []);

  const taskInProgress = allTasks.filter(task => task.currentState === "INPROGRESS");
  const taskDoneDate = allTasks.filter(task => task.currentState === "DONE");
  return (
    <>
      <p>{health}</p>
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


