import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../../middlewares/types/type";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/AppError";
import { ERROR_MESSAGES } from "../../../errors/errorMessages";
import { ERROR_CODES } from "../../../errors/errorRegistry";

export async function requireTask(req: AuthRequest, res: Response, next: NextFunction,) { 
  const taskId = Number(req.params.taskId); 
  const task = await prisma.task.findUnique({ 
    where: { 
      id: taskId
    },
  }); 
  if (!task) { 
    throw new AppError(ERROR_MESSAGES.TASK.NOT_FOUND, 404, ERROR_CODES.TASK.NOT_FOUND); 
  } 
  req.task = task; 
  next(); 
}