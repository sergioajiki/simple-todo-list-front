class Task {
    id: number;
    taskName: string;
    descrisption: string;
    taskCreationDate: Date;
    priority: string;
    currentStatus: string;
    taskDoneDate?: Date;

    constructor(
        id: number,
        taskName: string, 
        descrisption: string, 
        taskCreationDate: Date,
        priority: string, 
        currentStatus: string,
        taskDoneDate?: Date,

        ) {
        this.id = id;    
        this.taskName = taskName;
        this.descrisption = descrisption;
        this.priority = priority;
        this.currentStatus = currentStatus;
        this.taskCreationDate = new Date();
        this.taskDoneDate = taskDoneDate;
    }
}

export default Task;