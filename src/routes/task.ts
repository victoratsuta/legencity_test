import express, {Request, Response} from 'express';
import {taskController} from "../controllers";
import asyncHandler from "express-async-handler"


export const router = express.Router({
    strict: true
});

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    await taskController.create(req, res);
}));

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    await taskController.get(req, res);
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    await taskController.delete(req, res);
}));