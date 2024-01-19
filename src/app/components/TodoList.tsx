'use client';
import { useEffect, useState } from "react";
import Task from "../models/Task";
import { getAllTasksFromApi, getHealthBack } from "../services/api";

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

  return (
    <>
      <p>{health}</p>
      <ul>
        {allTasks.map(task => (
            <li key={task.id}>{task.taskName} - {task.description} - {task.taskCreationDate.toString()} - {task.priority} - {task.currentState} - {task.taskDoneDate?.toString()}</li> 
        ))}
      </ul>
    </>
  )
}


