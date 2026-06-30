export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}