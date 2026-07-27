import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { deleteProject, getProject, updateProject } from "./projects.controller";
import { requireProjectMember, requireProjectRole } from "./middleware/projects.middleware";


const router = Router();

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

export { router as projectsRouter };