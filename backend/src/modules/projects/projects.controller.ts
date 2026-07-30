import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../middlewares/types/type";
import { addProjectMemberSchema, UpdateProjectMemberRoleSchema, UpdateProjectSchema, type AddProjectMemberDto, type CreateProjectDto, type UpdateProjectDto, type UpdateProjectMemberRoleDto } from "./config/type";
import * as ProjectsService from './projects.service';
import { assertAuthenticatedProject, assertAuthenticatedUser } from "../../utils/assertEntities/assertEntities";
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

// MEMBERS

export async function getProjectMembers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      res.status(400).json({ message: 'Project id is required' });
      return;
    }

    const projectMembers = await ProjectsService.findAllMembers(projectId);
    res.status(200).json({message: `Members for project with id ${projectId} found`, projectMembers});
  } catch (error) {
    next(error);
  }
}

export async function updateMemberRole(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    assertAuthenticatedProject(req);
    const projectId = Number(req.params.projectId);
    const targetUserId = Number(req.params.userId);
    const actor = req.projectMembership;

    const data: UpdateProjectMemberRoleDto = req.body;

    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'Project ID is required' });
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

    const parseResult = UpdateProjectMemberRoleSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const member = await ProjectsService.updateMemberRole(projectId, actor, targetUserId, data.role);
    res.status(200).json({ message: 'Role updated', member });
  } catch (error) {
    next(error);
  }
}

export async function addMember(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const projectId = Number(req.params.projectId);
    const data: AddProjectMemberDto = req.body;

    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'Project ID is required' });
      return;
    }

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'No enough data, empty body' });
      return;
    }

    const parseResult = addProjectMemberSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const newMember = await ProjectsService.addMember(projectId, data.userId);
    res.status(200).json({ message: `User added to project with id ${projectId}`, newMember });
  } catch (error) {
    next(error);
  }
}

export async function removeMember(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    assertAuthenticatedProject(req);
    const projectId = Number(req.params.projectId);
    const targetUserId = Number(req.params.userId);
    const actor = req.projectMembership;

    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'Project ID is required' });
      return;
    }

    if (!targetUserId || Number.isNaN(targetUserId)) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await ProjectsService.removeMember(projectId, actor, targetUserId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function leaveProject(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    const projectId = Number(req.params.projectId);
    const userId = req.user.id;

    if (!projectId || Number.isNaN(projectId)) {
      res.status(400).json({ message: 'Project ID is required' });
      return;
    }

    if (!userId || Number.isNaN(userId)) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await ProjectsService.leaveProject(projectId, userId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}