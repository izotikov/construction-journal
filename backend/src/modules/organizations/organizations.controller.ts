import type { Request, Response, NextFunction } from 'express';
import * as OrganizationsService from './organizations.service';
import { addMemberSchema, UpdateOrganizationMemberRoleSchema, UpdateOrganizationSchema, type AddMemberDto, type CreateOrganizationDto, type UpdateOrganizationDto, type UpdateOrganizationMemberRoleDto } from './config/type';
import type { AuthRequest } from '../../middlewares/types/type';
import z from 'zod';
import { assertAuthenticatedOrganization, assertAuthenticatedUser } from '../../utils/assertEntities/assertEntities';

export async function createOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);

    const data: CreateOrganizationDto = req.body;
    const userId = req.user.id;

    const organization = await OrganizationsService.create(data, userId);
    res.status(201).json({message: "Organization successfully created", organization});
  } catch (error) {
    next(error);
  }
}

export async function getOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    if (!organizationId) {
      res.status(400).json({ message: 'Organization id is required' });
      return;
    }
    const organization = await OrganizationsService.findById(organizationId);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.status(200).json({message: "Organization found", organization});
  } catch (error) {
    next(error);
  }
}

export async function getMyOrganizations(req: AuthRequest, res: Response, next: NextFunction) {
  assertAuthenticatedUser(req);
  try {
    const organizations = await OrganizationsService.findAllForUser(req.user.id);

    if (!organizations) {
      res.status(404).json({ message: 'No organizations found' });
      return;
    }
    res.status(200).json({message: `Organizations for user with id ${req.user.id} found`, organizations});
  } catch (error) {
    next(error);
  }
}

export async function updateOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    const data: UpdateOrganizationDto = req.body;

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'Nothing to update, empty body' });
      return;
    }

    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }

    const parseResult = UpdateOrganizationSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const organization = await OrganizationsService.update(organizationId, data);
    res.status(200).json({ message: 'Organization updated', organization });
  } catch (error) {
    next(error);
  }
}



export async function deleteOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }
    await OrganizationsService.remove(organizationId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// Members

export async function getOrganizationMembers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);

    if (!organizationId) {
      res.status(400).json({ message: 'Organization id is required' });
      return;
    }

    const organizationMembers = await OrganizationsService.findAllMembers(organizationId);
    res.status(200).json({message: `Members for organization with id ${organizationId} found`, organizationMembers});
  } catch (error) {
    next(error);
  }
}

export async function updateMemberRole(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    assertAuthenticatedOrganization(req);
    const organizationId = Number(req.params.organizationId);
    const targetUserId = Number(req.params.userId);
    const actor = req.organizationMembership;

    const data: UpdateOrganizationMemberRoleDto = req.body;

    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'Organization ID is required' });
      return;
    }

    if (!targetUserId || Number.isNaN(targetUserId)) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'Nothing to update, empty body' });
      return;
    }

    const parseResult = UpdateOrganizationMemberRoleSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const member = await OrganizationsService.updateMemberRole(organizationId, actor, targetUserId, data.role);
    res.status(200).json({ message: 'Role updated', member });
  } catch (error) {
    next(error);
  }
}

export async function addMember(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    const data: AddMemberDto = req.body;

    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'Organization ID is required' });
      return;
    }

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'No enough data, empty body' });
      return;
    }

    const parseResult = addMemberSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const newMember = await OrganizationsService.addMember(organizationId, data.userId);
    res.status(200).json({ message: `User added to organization with id ${organizationId}`, newMember });
  } catch (error) {
    next(error);
  }
}

export async function removeMember(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    assertAuthenticatedOrganization(req);
    const organizationId = Number(req.params.organizationId);
    const targetUserId = Number(req.params.userId);
    const actor = req.organizationMembership;

    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'Organization ID is required' });
      return;
    }

    if (!targetUserId || Number.isNaN(targetUserId)) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await OrganizationsService.removeMember(organizationId, actor, targetUserId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function leaveOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    const organizationId = Number(req.params.organizationId);
    const userId = req.user.id;

    if (!organizationId || Number.isNaN(organizationId)) {
      res.status(400).json({ message: 'Organization ID is required' });
      return;
    }

    if (!userId || Number.isNaN(userId)) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await OrganizationsService.leaveOrganization(organizationId, userId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}