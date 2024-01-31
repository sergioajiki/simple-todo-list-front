'use client';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Task from "../models/Task";
import { deleteTaskFromApi, getAllTasksFromApi, getHealthBack, updateTaskDoneFromApi, updateTaskInProgressFromApi } from "../services/api";
import TaskInfoCard from "./TaskInfoCard";
import AddTaskCard from "./AddTaskCard";
import { TaskList } from "../types/propsTask";
import TaskContextProvider, { TaskContext } from "../context/TaskContextProvider";
import "../styles/TodoList.css";

export default function TodoList() {

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
      <div className="todoList">
        <AddTaskCard />
        <div className="tasks">

          <span className="inProgress">
            <h4>Tasks To Do</h4>
            <TaskInfoCard taskList={taskInProgress} />
          </span>

          <span className="done">
            <h4>Tasks Done</h4>
            <TaskInfoCard taskList={taskDone} />
          </span>

        </div>

      </div>
    </>
  )
}


