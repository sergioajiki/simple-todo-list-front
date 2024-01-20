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

  // const [allTasks, setAllTasks] = useState<Task[] | null>([]);
  // const [taskInProgress, setTaskInProgress] = useState<Task[]>([]);
  // const [taskDone, setTaskDone] = useState<Task[]>([]);
  // const [taskLoaded, setTaskLoaded] = useState<boolean>(false);
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

  // const featchTaskData = useCallback(async () => {
  //   const tasks = await getAllTasksFromApi();
  //   console.log(tasks);    
  //   setAllTasks(tasks);
  //   const tInProgress: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "INPROGRESS") : [];
  //   setTaskInProgress(tInProgress);
  //   const tDone: Task[] = tasks ? tasks.filter((task: Task) => task.currentState === "DONE") : [];
  //   setTaskDone(tDone);
  // }, [taskDone, taskInProgress, allTasks]) 


  // useEffect(() => {
  //   if (!taskLoaded) {
  //     featchTaskData();
  //     setTaskLoaded(true);
  //   }
  // }, [taskLoaded, featchTaskData]);

  async function deleteTask(id: number) {
    const response = await deleteTaskFromApi(id);
    setTaskLoaded(false);
    // console.log(response);
  }

  async function updateTaskDone(id: number) {
    const response = await updateTaskDoneFromApi(id);
    setTaskLoaded(false);
    // console.log(response);
  }

  async function updateTaskInProgress(id: number) {
    const response = await updateTaskInProgressFromApi(id);
    setTaskLoaded(false);
    // console.log(response);
  }



  return (
    <>
      <p>{health}</p>

      <div>
        <AddTaskCard />
      </div>
      <div>
        <h4>Tasks To Do</h4>
        <TaskInfoCard taskList={taskInProgress} />
        {/* {
          <>
            {taskInProgress.map((task: Task) => (
              <div key={task.id}>
                <span>Task: {task.taskName} </span>
                <span>Description: {task.description} </span>
                <span>Initial Date: {task.taskCreationDate.toString()} </span>
                <span>Priority: {task.priority} </span>
                <span>State: {task.currentState} </span>
                {
                  task.taskDoneDate && (
                    <span>Done Date: {task.taskDoneDate?.toString()} </span>
                  )
                }
                {
                  task.currentState === "DONE" ? (
                    <button type="button" onClick={() => updateTaskInProgress(task.id)}>In Progress!!</button>
                  ) : (
                    <button type="button" onClick={() => updateTaskDone(task.id)}>Done!!</button>
                  )
                }
                <button type="button" onClick={() => deleteTask(task.id)}>Delete Task</button>
              </div>
            ))
            }
            <br />
          </>
        } */}
      </div>
      <div>
        <h4>Tasks Done</h4>
        <TaskInfoCard taskList={taskDone} />
        {/* {
          <>
            {taskDone.map((task: Task) => (
              <div key={task.id}>
                <span>Task: {task.taskName} </span>
                <span>Description: {task.description} </span>
                <span>Initial Date: {task.taskCreationDate.toString()} </span>
                <span>Priority: {task.priority} </span>
                <span>State: {task.currentState} </span>
                {
                  task.taskDoneDate && (
                    <span>Done Date: {task.taskDoneDate?.toString()} </span>
                  )
                }
                {
                  task.currentState === "DONE" ? (
                    <button type="button" onClick={() => updateTaskInProgress(task.id)}>In Progress!!</button>
                  ) : (
                    <button type="button" onClick={() => updateTaskDone(task.id)}>Done!!</button>
                  )
                }
                <button type="button" onClick={() => deleteTask(task.id)}>Delete Task</button>
              </div>
            ))
            }
            <br />
          </>
        } */}
      </div>

    </>
  )
}


