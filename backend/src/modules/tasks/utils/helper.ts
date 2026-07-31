import type { ProjectMember } from "../../../../generated/prisma";
import { AppError } from "../../../errors/AppError";
import { ERROR_MESSAGES } from "../../../errors/errorMessages";
import { ERROR_CODES } from "../../../errors/errorRegistry";

export function ensureActorCanAssignTask(
  actor: ProjectMember,
  currentAssigneeId: number | null,
  newAssigneeId: number | null,
) {
  // Назначить себе
  if (newAssigneeId === actor.userId) {
    return;
  }

  // Снять себя
  if (
    newAssigneeId === null &&
    currentAssigneeId === actor.userId
  ) {
    return;
  }

  // Любые остальные изменения — только MANAGER и OWNER
  if (
    actor.role !== "MANAGER" &&
    actor.role !== "OWNER"
  ) {
    throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);

  }
}