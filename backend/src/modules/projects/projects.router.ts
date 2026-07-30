import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { addMember, deleteProject, getProject, getProjectMembers, getUserProjects, leaveProject, removeMember, updateMemberRole, updateProject } from "./projects.controller";
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
  requireProjectRole('OWNER', 'MANAGER'),
  updateProject
);
router.delete(
  '/:projectId',
  authMiddleware,
  requireProjectMember,
  requireProjectRole('OWNER', 'MANAGER'),
  deleteProject
);

// ---- Project members ----

router.get(
  "/:projectId/members",
  authMiddleware,
  requireProjectMember,
  getProjectMembers
);

router.post(
  "/:projectId/members",
  authMiddleware,
  requireProjectMember,
  requireProjectRole('OWNER', 'MANAGER'),
  addMember
);

router.patch(
  '/:projectId/members/:userId',
  authMiddleware,
  requireProjectMember,
  requireProjectRole('OWNER', 'MANAGER'),
  updateMemberRole
);

router.delete(
  '/:projectId/members/me',
  authMiddleware,
  requireProjectMember,
  leaveProject
);

router.delete(
  '/:projectId/members/:userId',
  authMiddleware,
  requireProjectMember,
  requireProjectRole('OWNER', 'MANAGER'),
  removeMember
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
  requireProjectRole('OWNER', 'MANAGER'),
  createTask
);

export { router as projectsRouter };