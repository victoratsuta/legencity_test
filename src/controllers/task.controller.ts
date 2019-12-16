import {Validator} from "../services/Validator";
import {TaskRepository} from "../repository/task.repository";
import {Task} from "../entity/task.entity";
import {Request, Response} from 'express';
import {ValidationException} from "../exceptions/validation.exception";

export class TaskController {

    private validator: Validator = new Validator();
    private taskRepository: TaskRepository = new TaskRepository();

    public async create(req: Request, res: Response) {

        const validationSchema = {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "priority": {
                    "type": "number",
                },
            },
            "required": ["name", "priority"]
        };
        const data = req.body;

        this.validator.validate(validationSchema, data);
        let task = new Task(data['name'], data['priority']);

        return res.status(201).json(await this.taskRepository.create(task));
    };

    public async get(req: Request, res: Response) {

        const task = await this.taskRepository.getMostPriority();

        return res.json(task);
    };

    public async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!Number.isInteger(parseInt(id))) {
            throw new ValidationException('id should be number')
        }

        await this.taskRepository.delete(req.params.id);

        return res.json({});
    };
}