export type Task = {
    id: number;
    taskName: string;
    description: string;
    taskCreationDate: Date;
    priority: string;
    currentState: string;
    taskDoneDate?: Date;
}

export type TaskList = {
    taskList: Task[]
};