import type { Request, Response, NextFunction } from 'express';
import * as OrganizationsService from './organizations.service';
import { UpdateOrganizationSchema, type CreateOrganizationDto, type UpdateOrganizationDto } from './config/type';
import type { AuthRequest } from '../../middlewares/types/type';
import z from 'zod';
import { assertAuthenticatedUser } from '../../utils/assertEntities/assertEntities';

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

export async function getOrganization(req: Request, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    if (!organizationId) {
      res.status(400).json({ message: 'Organization id is required' });
      return;
    }
    const organization = await OrganizationsService.findByIdForUser(organizationId, req.user.id);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.status(200).json({message: "Organization found", organization});
  } catch (error) {
    next(error);
  }
}

export async function getMyOrganizations(req: Request, res: Response, next: NextFunction) {
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

export async function updateOrganization(req: Request, res: Response, next: NextFunction) {
  try {
    const organizationId = Number(req.params.organizationId);
    const data: UpdateOrganizationDto = req.body;

    if (Object.keys(data).length === 0 || data === null || data === undefined) {
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

export async function deleteOrganization(req: Request, res: Response, next: NextFunction) {
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