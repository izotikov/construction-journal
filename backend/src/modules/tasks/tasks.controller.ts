import type { NextFunction, Request, Response } from "express";
import * as TasksService from './tasks.service';
import { UpdateTaskSchema, type CreateTaskDto, type UpdateTaskDto } from "./config/type";
import type { AuthRequest } from "../../middlewares/types/type";
import { assertAuthenticatedUser } from "../../utils/assertEntities/assertEntities";
import z from "zod";

export async function createTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      res.status(400).json({ message: 'Project id is required' });
      return;
    }

    const data: CreateTaskDto = req.body;
    
    if (!data?.title || !data?.estimatedDuration) {
      res.status(400).json({message: "Not all required fields provided"});
    }

    const createdById = req.user.id;

    const task = await TasksService.create(data, createdById, projectId);
    res.status(201).json({message: "Task successfully created", task});
  } catch (error) {
    next(error);
  }
}

export async function getTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    assertAuthenticatedUser(req);
    const taskId = Number(req.params.taskId);
    const userId = req.user.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task id is required' });
      return;
    }
    const task = await TasksService.findById(taskId, userId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json({message: "Task found", task});
  } catch (error) {
    next(error);
  }
}

export async function getProjectTasks(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      res.status(400).json({ message: 'Project id is required' });
      return;
    }

    const tasks = await TasksService.findAllForProject(
      projectId,
    );

    res.status(200).json({
      message: `Tasks for project with id ${projectId} found`,
      tasks,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserTasks(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    assertAuthenticatedUser(req);
    
    const userId = req.user.id;

    const tasks = await TasksService.findAllAssignedForUser(
      userId,
    );

    res.status(200).json({
      message: `Tasks for user with id ${userId} found`,
      tasks,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const taskId = Number(req.params.taskId);
    const data: UpdateTaskDto = req.body;

    if (data === null || data === undefined || Object.keys(data).length === 0) {
      res.status(400).json({ message: 'Nothing to update, empty body' });
      return;
    }

    if (!taskId || Number.isNaN(taskId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }

    const parseResult = UpdateTaskSchema.safeParse(data);
    if (!parseResult.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: z.flattenError(parseResult.error),
      });
      return;
    }

    const task = await TasksService.update(taskId, data);
    res.status(200).json({ message: 'Task updated', task });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const taskId = Number(req.params.taskId);
    if (!taskId || Number.isNaN(taskId)) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }
    await TasksService.remove(taskId);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
