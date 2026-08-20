import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        next();
    };
};