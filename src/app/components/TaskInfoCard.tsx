'use client';

import { TaskList } from "../types/propsTask";
import { deleteTaskFromApi, updateTaskDoneFromApi, updateTaskInProgressFromApi } from "../services/api";
import { useState } from "react";


export default function TaskInfoCard({ taskList }: TaskList) {

    async function deleteTask(id: number) {
        const response = await deleteTaskFromApi(id);
        // console.log(response);
    }

    async function updateTaskDone(id: number) {
        const response = await updateTaskDoneFromApi(id);
        // setTaskLoaded(false);
        // console.log(response);
    }

    async function updateTaskInProgress(id: number) {
        const response = await updateTaskInProgressFromApi(id);
        // setTaskLoaded(false);
        // console.log(response);
    }

    return (
        <>
            {taskList.map(task => (
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
    )
}
function setTaskLoaded(arg0: boolean) {
    throw new Error("Function not implemented.");
}

