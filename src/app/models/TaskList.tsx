import Task from "./Task";

class TaskList {
    tasks: Task[];

    constructor(
        tasks: Task[]
        ) {
        this.tasks = tasks;
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }
}