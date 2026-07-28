import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { deleteProject, getProject, getUserProjects, updateProject } from "./projects.controller";
import { requireProjectMember, requireProjectRole } from "./middleware/projects.middleware";
import { createTask, getProjectTasks } from "../tasks/tasks.controller";


const router = Router();

router.get(
  "/",
  authMiddleware,
  getUserProjects
);

router.get(
  "/:projectId",
  authMiddleware,
  requireProjectMember,
  getProject
);

router.patch(
  '/:projectId',
  authMiddleware,
  requireProjectMember,
  requireProjectRole('MANAGER'),
  updateProject
);
router.delete(
  '/:projectId',
  authMiddleware,
  requireProjectMember,
  requireProjectRole('MANAGER'),
  deleteProject
);

// ---------- Tasks ----------

router.get(
  "/:projectId/tasks",
  authMiddleware,
  requireProjectMember,
  getProjectTasks
);

router.post(
  "/:projectId/tasks",
  authMiddleware,
  requireProjectMember,
  requireProjectRole("MANAGER"),
  createTask
);

export { router as projectsRouter };