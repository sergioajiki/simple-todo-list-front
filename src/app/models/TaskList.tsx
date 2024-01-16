import Task from "./Task";

class TaskList {
    tasks: Task[];

    constructor() {
      this.tasks = [];
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    getTasks(): Task[] {
        return this.tasks;
    } 
}

export default TaskList;