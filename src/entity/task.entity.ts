export class Task {
    public id: number | null = null;
    public name: string;
    public priority: number;

    constructor(name: string, priority: number, id: number | null = null) {
        this.name = name;
        this.priority = priority;
        this.id = id;
    }
}