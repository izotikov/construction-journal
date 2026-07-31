import type { AuthRequest } from "../../../middlewares/types/type";

export function getProjectId(req: AuthRequest): number {
    if (req.params.projectId) {
        return Number(req.params.projectId);
    }

    if (req.task) {
        return req.task.projectId;
    }

    throw new Error(
        "Project id is unavailable."
    );
}