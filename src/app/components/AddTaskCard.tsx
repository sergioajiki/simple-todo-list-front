'use client';

import { useContext, useState } from "react";
import { TaskPayload } from "../types/propsTask";
import { Priority } from "../types/propsTask";
import { createTask } from "../services/api";
import { TaskContext } from "../context/TaskContextProvider";
import "../styles/AddTaskCard.css";

export default function AddTaskCard() {

    const { setTaskLoaded } = useContext(TaskContext) as { setTaskLoaded: React.Dispatch<React.SetStateAction<boolean>> };

    const [taskName, setTaskName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<Priority>("HIGH");

    const taskPaylod = {
        taskName,
        description,
        priority
    }

    async function addTask(taskPayload: TaskPayload) {
        try {
            const response = await createTask(taskPayload);
            setTaskName("");
            setDescription("");
            setPriority("HIGH");
            setTaskLoaded(false)
        } catch (error) {
            console.log("Erro ao adicionar a tarefa", error);
        }
    }
    return (
        <>
            <form>
                <div className="taskInputs">
                    <span className="lineInput1">
                        <label htmlFor="taskName" className="label-taskName" >
                            <input
                                className="input-taskName"
                                id="taskName"
                                type="text"
                                name="taskName"
                                onChange={({ target: { value } }) => setTaskName(value)}
                                placeholder=" "
                                required
                            />
                            <span>Task</span>
                        </label>
                        <label htmlFor="priority" className="label-priority">
                            <select
                                className="input-priority"
                                id="priority"
                                name="priority"
                                onChange={({ target: { value } }) => setPriority(value as Priority)} >
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                            </select>
                            <span>Priority</span>
                        </label>
                    </span>
                    <label htmlFor="description" className="label-description">
                        <input
                            className="input-description"
                            type="text"
                            id="description"
                            name="description"
                            onChange={({ target: { value } }) => setDescription(value)}
                        />
                        <span>Description</span>
                    </label>
                    <p>Só pra controle {taskName} - {description} - {priority}</p>
                </div>
                <button
                    type="button"
                    onClick={() => addTask(taskPaylod)}
                >Add Task</button>
            </form>
        </>
    )
}