import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { addMember, createOrganization, deleteOrganization, getMyOrganizations, getOrganization, getOrganizationMembers, leaveOrganization, removeMember, updateMemberRole, updateOrganization } from "./organizations.controller";
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

// ---- Organization members ----

router.get(
  "/:organizationId/members",
  authMiddleware,
  requireOrganizationMember,
  getOrganizationMembers
);

router.post(
  "/:organizationId/members",
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole("OWNER", "ADMIN"),
  addMember
);

router.patch(
  '/:organizationId/members/:userId',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER', 'ADMIN'),
  updateMemberRole
);

router.delete(
  '/:organizationId/members/me',
  authMiddleware,
  requireOrganizationMember,
  leaveOrganization
);

router.delete(
  '/:organizationId/members/:userId',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER', 'ADMIN'),
  removeMember
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