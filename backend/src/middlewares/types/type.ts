import type { Request } from "express";
import type { $Enums, OrganizationMember, ProjectMember } from "../../../generated/prisma";

export type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export interface DecodedToken { 
  id: number; 
  email: string; 
  name: string;
}

export interface Task {
  createdAt: Date;
  id: number;
  title: string;
  description: string | null;
  status: string;
  estimatedDuration: number;
  projectId: number;
  assigneeId: number | null;
  createdById: number;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
  token?: string;
  organizationMembership?: OrganizationMember | null;
  projectMembership?: ProjectMember | null;
}

export type AuthUserRequest = WithRequired<AuthRequest, 'user'>;
export type AuthOrganizationMembershipRequest = WithRequired<AuthRequest, 'organizationMembership'>;
export type AuthProjectMembershipRequest = WithRequired<AuthRequest, 'projectMembership'>;