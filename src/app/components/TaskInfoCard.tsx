'use client';

import { TaskList } from "../types/propsTask";

export default function TaskInfoCard({ taskList }: TaskList) {
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
                </div>
            ))
            }
            <br />
        </>
    )
}
