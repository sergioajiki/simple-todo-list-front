'use client';
import { useEffect, useState } from "react";
import Task from "../models/Task";
import { getAllTasksFromApi, getHealthBack } from "../services/api";

export default function TodoList() {

  const [health, setHealth] = useState<string | null>(null);

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

  // async function getAllTasks(): Promise<Task[]> {
  //   const allTasks = await getAllTasksFromApi();
  //   console.log(allTasks);
  //   return allTasks;
  // }
  return (
    <>
      <p>{health}</p>
    </>
  )
}


