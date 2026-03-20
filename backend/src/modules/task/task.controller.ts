import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  toggleTaskStatus,
  updateTask,
} from "./task.service.js";
import {
  createTaskSchema,
  taskIdParamSchema,
  taskQuerySchema,
  updateTaskSchema,
} from "./task.validation.js";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const parsedBody = createTaskSchema.parse(req.body);
    const userId = req.user!.userId;

    const task = await createTask({
      ...parsedBody,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create task";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const getTasksHandler = async (req: Request, res: Response) => {
  try {
    const parsedQuery = taskQuerySchema.parse(req.query);
    const userId = req.user!.userId;

    const result = await getTasks({
      userId,
      ...parsedQuery,
    });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch tasks";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdParamSchema.parse(req.params);
    const userId = req.user!.userId;

    const task = await getTaskById(id, userId);

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch task";

    return res.status(message === "Task not found" ? 404 : 400).json({
      success: false,
      message,
    });
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdParamSchema.parse(req.params);
    const parsedBody = updateTaskSchema.parse(req.body);
    const userId = req.user!.userId;

    const task = await updateTask(id, userId, parsedBody);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update task";

    return res.status(message === "Task not found" ? 404 : 400).json({
      success: false,
      message,
    });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdParamSchema.parse(req.params);
    const userId = req.user!.userId;

    const result = await deleteTask(id, userId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete task";

    return res.status(message === "Task not found" ? 404 : 400).json({
      success: false,
      message,
    });
  }
};

export const toggleTaskStatusHandler = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdParamSchema.parse(req.params);
    const userId = req.user!.userId;

    const task = await toggleTaskStatus(id, userId);

    return res.status(200).json({
      success: true,
      message: "Task status toggled successfully",
      data: task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to toggle task status";

    return res.status(message === "Task not found" ? 404 : 400).json({
      success: false,
      message,
    });
  }
};