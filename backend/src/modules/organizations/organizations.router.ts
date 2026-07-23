import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createOrganization, deleteOrganization, getMyOrganizations, getOrganization, updateOrganization } from "./organizations.controller";
import { requireOrganizationMember, requireOrgRole } from "../../middlewares/organizations.middleware";

const router = Router();

router.get('/', authMiddleware, getMyOrganizations);
router.get('/:id', authMiddleware, getOrganization);
router.post('/', authMiddleware, createOrganization);
router.patch(
  '/:id',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER', 'ADMIN'),
  updateOrganization
);
router.delete(
  '/:id',
  authMiddleware,
  requireOrganizationMember,
  requireOrgRole('OWNER'),
  deleteOrganization
);

export { router as organizationsRouter };