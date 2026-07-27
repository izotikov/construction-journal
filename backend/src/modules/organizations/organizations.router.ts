import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createOrganization, deleteOrganization, getMyOrganizations, getOrganization, updateOrganization } from "./organizations.controller";
import { requireOrganizationMember, requireOrgRole } from "./middleware/organizations.middleware";
import { createProject, getOrganizationProjects } from "../projects/projects.controller";


const router = Router();

router.get('/', authMiddleware, getMyOrganizations);
router.get(
  "/:organizationId",
  authMiddleware,
  requireOrganizationMember,
  getOrganization
);
router.post('/', authMiddleware, createOrganization);
router.patch(
  '/:organizationId',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER', 'ADMIN'),
  updateOrganization
);
router.delete(
  '/:organizationId',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER'),
  deleteOrganization
);

// ---------- Projects ----------

router.get(
  "/:organizationId/projects",
  authMiddleware,
  requireOrganizationMember,
  getOrganizationProjects
);

router.post(
  "/:organizationId/projects",
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole("OWNER", "ADMIN"),
  createProject
);

export { router as organizationsRouter };