'use client';

import { useState } from "react";
import { TaskPayload } from "../types/propsTask";
import { Priority } from "../types/propsTask";
import { createTask } from "../services/api";

export default function AddTaskCard() {

    const [taskName, setTaskName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<Priority>("HIGH");

    const taskPaylod = {
        taskName,
        description,
        priority
    }

    async function addTask(taskPayload: TaskPayload) {
        const response = await createTask(taskPayload);
    }
    return (
        <>
            <form>
                <div>
                    <label htmlFor="taskName">Task:
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            onChange={({ target: { value } }) => setTaskName(value)} />
                    </label>
                    <label htmlFor="description">Task:
                        <input
                            type="text"
                            id="description"
                            name="description"
                            onChange={({ target: { value } }) => setDescription(value)} />
                    </label>
                    <label htmlFor="priority">Task:
                        <select
                            id="priority"
                            name="priority"
                            onChange={({ target: { value } }) => setPriority(value as Priority)} >
                            <option value="HIGH">HIGH</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="LOW">LOW</option>
                        </select>
                    </label>

                    <p>Só pra controle {taskName} - {description} - {priority}</p>
                </div>
                <button type="button" onClick={() => addTask(taskPaylod)}>Add Task</button>
            </form>
        </>
    )
}