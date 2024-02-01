export type Priority = "HIGH" | "MEDIUM" | "LOW";

export type TaskStyles = {
    "HIGH": { backgroundColor: string },
    "MEDIUM": { backgroundColor: string },
    "LOW": { backgroundColor: string }
}

export type Task = {
    id: number;
    taskName: string;
    description: string;
    taskCreationDate: Date;
    priority: string;
    currentState: string;
    taskDoneDate?: Date;
}

export type TaskPayload = {
    taskName: string;
    description: string;
    priority: Priority;
}

export type TaskList = {
    taskList: Task[]
};