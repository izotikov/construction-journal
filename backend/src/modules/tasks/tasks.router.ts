import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { deleteTask, getTask, getUserTasks, updateTask } from "./tasks.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getUserTasks
);

router.get(
  '/:taskId',
  authMiddleware,
  getTask
);

router.patch(
  '/:taskId',
  authMiddleware,
  updateTask
);

router.delete(
  '/:taskId',
  authMiddleware,
  deleteTask
);

export { router as tasksRouter };