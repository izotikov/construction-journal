import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { assignTask, deleteTask, getTask, getUserTasks, updateTask } from "./tasks.controller";
import { requireTask } from "./middleware/tasks.middleware";
import { requireProjectMember } from "../projects/middleware/projects.middleware";

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

router.patch(
  '/:taskId/assignee',
  authMiddleware,
  requireTask,
  requireProjectMember,
  assignTask
);

export { router as tasksRouter };