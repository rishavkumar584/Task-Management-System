import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  toggleTaskStatusHandler,
  updateTaskHandler,
} from "./task.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", getTasksHandler);
router.post("/", createTaskHandler);
router.get("/:id", getTaskByIdHandler);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);
router.patch("/:id/toggle", toggleTaskStatusHandler);

export default router;