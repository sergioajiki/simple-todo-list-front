class Task {
    id: number;
    taskName: string;
    description: string;
    taskCreationDate: Date;
    priority: string;
    currentState: string;
    taskDoneDate?: Date;

    constructor(
        id: number,
        taskName: string, 
        description: string, 
        taskCreationDate: Date,
        priority: string, 
        currentState: string,
        taskDoneDate?: Date,

        ) {
        this.id = id;    
        this.taskName = taskName;
        this.description = description;
        this.priority = priority;
        this.taskCreationDate = new Date();
        this.currentState = currentState;
        this.taskDoneDate = taskDoneDate;
    }
}

export default Task;