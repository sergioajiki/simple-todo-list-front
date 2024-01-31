'use client';
import { Priority, TaskList, TaskStyles } from "../types/propsTask";
import { deleteTaskFromApi, updateTaskDoneFromApi, updateTaskInProgressFromApi } from "../services/api";
import { TaskContext } from "../context/TaskContextProvider";
import { useContext } from "react";
import "../styles/TaskInfoCard.css";

export default function TaskInfoCard({ taskList }: TaskList) {
    const { setTaskLoaded } = useContext(TaskContext) as { setTaskLoaded: React.Dispatch<React.SetStateAction<boolean>> };

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
    
    const getBackgroundColor = (priority: Priority) => {
        const taskStyles: TaskStyles = {
            "HIGH": {
                backgroundColor: "rgb(252, 75, 75)"
            },
            "MEDIUM": {
                backgroundColor: "rgb(252, 163, 90)"
            },
            "LOW": {
                backgroundColor: "rgb(231, 245, 111)"
            }
        }
        return taskStyles[priority] ? taskStyles[priority].backgroundColor : "white";
    }

    return (
        <>
            {taskList.map(task => (
                <div key={task.id} className="card" style={{ backgroundColor: getBackgroundColor(task.priority as Priority) }}>
                    <span className="lineOne">
                        <span className="taskName">{task.taskName}</span>
                        <span className="cardR">
                            <span className="cDate">
                                {task.taskCreationDate.toString()}
                            </span>
                            <span className="buttons">
                                {
                                    task.currentState === "DONE" ? (
                                        <button className="buttonInCard" type="button" onClick={() => updateTaskInProgress(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5" />
                                            <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z" />
                                        </svg></button>
                                    ) : (
                                        <button className="buttonInCard" type="button" onClick={() => updateTaskDone(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                        </svg></button>
                                    )
                                }
                                <button className="buttonInCard" type="button" onClick={() => deleteTask(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg></button>
                            </span>
                        </span>
                    </span>
                    <span className="descDateDone"></span>
                    <span>{task.description}</span>
                    {
                        task.taskDoneDate && (
                            <span className="dDate">Done in: {task.taskDoneDate?.toString()} </span>
                        )
                    }
                </div>
            ))
            }
        </>
    )
}
