import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/types/type";
import { UpdateProjectSchema, type CreateProjectDto, type UpdateProjectDto } from "./config/type";
import * as ProjectsService from './projects.service';
import { assertAuthenticatedUser } from "../../utils/assertEntities/assertEntities";
import z from "zod";

export async function createProject(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);

    const organizationId = Number(req.params.organizationId);

    if (!organizationId) {
      res.status(400).json({ message: 'Organization id is required' });
      return;
    }

    const data: CreateProjectDto = req.body;

    if (!data?.name) {
      res.status(400).json({message: "Name is required"});
    }

    const userId = req.user.id;

    const project = await ProjectsService.create(data, userId, organizationId);
    res.status(201).json({message: "Project successfully created", project});
  } catch (error) {
    next(error);
  }
}

export async function getProject(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const projectId = Number(req.params.projectId);
    if (!projectId) {
      res.status(400).json({ message: 'Project id is required' });
      return;
    }
    const project = await ProjectsService.findById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({message: "Project found", project});
  } catch (error) {
    next(error);
  }
}

export async function getOrganizationProjects(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(req.params.organizationId);

    if (!organizationId) {
      res.status(400).json({ message: 'Organization id is required' });
      return;
    }

    const projects = await ProjectsService.findAllForOrganization(
      organizationId,
    );

    res.status(200).json({
      message: `Projects for organization with id ${organizationId} found`,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserProjects(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    assertAuthenticatedUser(req);
    
    const userId = req.user.id;

    if (!userId) {
      res.status(400).json({ message: 'User id is required' });
      return;
    }

    const projects = await ProjectsService.findAllForUser(
      userId,
    );

    res.status(200).json({
      message: `Projects for user with id ${userId} found`,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const projectId = Number(req.params.projectId);

    const data: UpdateProjectDto = req.body;

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'Nothing to update, empty body' });
      return;
    }

    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }

    const parseResult = UpdateProjectSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const project = await ProjectsService.update(projectId, data);
    res.status(200).json({ message: 'Project updated', project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const projectId = Number(req.params.projectId);
    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }
    await ProjectsService.remove(projectId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}