import type { DecodedToken } from "../../../middlewares/auth.middleware";
import type { OrganizationMembership } from "../../../middlewares/types/type";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export {};