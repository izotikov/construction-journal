import type { Request } from "express";
import type { $Enums } from "../../../generated/prisma";

export interface AuthRequest extends Request {
  user?: DecodedToken;
  token?: string;
  organizationMembership?: OrganizationMembership | null;
}

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