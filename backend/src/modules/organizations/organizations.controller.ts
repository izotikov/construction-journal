import type { Request, Response, NextFunction } from 'express';
import * as OrganizationsService from './organizations.service';
import { UpdateOrganizationSchema, type CreateOrganizationDto } from './config/type';
import { AppError } from '../../errors/AppError';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';
import type { AuthRequest } from '../../middlewares/types/type';
import z from 'zod';


export async function createOrganization(req: AuthRequest, res: Response, next: NextFunction) {
  try {

    if (!req.user) {
      throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
    }

    const data: CreateOrganizationDto = req.body;
    const userId = req.user.id;
    if (!data.name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }
    const organization = await OrganizationsService.create(data, userId);
    res.status(201).json({message: "Organization successfully created", organization});
  } catch (error) {
    next(error);
  }
}

export async function getOrganization(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
    }
    const organizationId = Number(req.params.id);
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
    if (!req.user) {
      throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
    }
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
    const id = Number(req.params.id);
    const { name }: {name: string} = req.body;
    if (!id || Number.isNaN(id)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }

    const parseResult = UpdateOrganizationSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const organization = await OrganizationsService.update(id, { name });
    res.status(200).json({ message: 'Organization updated', organization });
  } catch (error) {
    next(error);
  }
}

export async function deleteOrganization(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }
    await OrganizationsService.remove(id);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}