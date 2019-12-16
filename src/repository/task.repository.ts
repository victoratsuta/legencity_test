import {Pool} from "pg";
import {Task} from "../entity/task.entity";
import {db} from "../config";

export class TaskRepository {
    private client: Pool;

    constructor() {
        this.client = new Pool(db);
    }

    public async create(task: Task): Promise<Task | null> {

        const text: string = "INSERT INTO tasks (name, priority) VALUES($1, $2) RETURNING *";
        const values = [task.name, task.priority];
        const rows = await this.execute(text, values);

        // @ts-ignore
        return rows[0] ? new Task(rows[0].name, rows[0].priority, rows[0].id) : null

    }

    public async getMostPriority(): Promise<Task | null> {

        const text: string = "SELECT * FROM tasks ORDER BY priority DESC LIMIT 1";
        const rows = await this.execute(text)

        // @ts-ignore
        return rows[0] ? new Task(rows[0].name, rows[0].priority, rows[0].id) : null
    }

    public async delete(id: number): Promise<any> {
        const text: string = "DELETE FROM tasks WHERE id = $1";
        const values = [id];
        await this.execute(text, values)
    }

    private async execute(text: string, values: any = null) {
        const client: any = await this.client.connect();
        const result = await client.query(text, values);
        client.release()
        return result.rows;
    }
}