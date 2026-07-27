import { AppError } from "../../errors/AppError";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import type { AuthOrganizationMembershipRequest, AuthProjectMembershipRequest, AuthRequest, AuthUserRequest } from "../../middlewares/types/type";


export function assertAuthenticatedUser(req: AuthRequest): asserts req is AuthUserRequest {
  if (!req.user) {
    throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }
}

export function assertAuthenticatedOrganization(req: AuthRequest): asserts req is AuthOrganizationMembershipRequest {
  if (!req.organizationMembership) {
    throw new AppError(ERROR_MESSAGES.ORGANIZATION.MISSING_ID, 401, ERROR_CODES.ORGANIZATION.MISSING_ID);
  }
}

export function assertAuthenticatedProject(req: AuthRequest): asserts req is AuthProjectMembershipRequest {
  if (!req.projectMembership) {
    throw new AppError(ERROR_MESSAGES.PROJECT.MISSING_ID, 401, ERROR_CODES.PROJECT.MISSING_ID);
  }
}