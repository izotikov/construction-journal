import type { Request } from "express";
import type { $Enums } from "../../../generated/prisma";

export type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export interface DecodedToken { 
  id: number; 
  email: string; 
  name: string;
}

export interface OrganizationMembership {
  createdAt: Date;
  id: number;
  userId: number;
  organizationId: number;
  role: $Enums.OrganizationRole;
}

export interface ProjectMembership {
  createdAt: Date;
  id: number;
  userId: number;
  projectId: number;
  role: $Enums.ProjectRole;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
  token?: string;
  organizationMembership?: OrganizationMembership | null;
  projectMembership?: ProjectMembership | null;
}

export type AuthUserRequest = WithRequired<AuthRequest, 'user'>;
export type AuthOrganizationMembershipRequest = WithRequired<AuthRequest, 'organizationMembership'>;
export type AuthProjectMembershipRequest = WithRequired<AuthRequest, 'projectMembership'>;