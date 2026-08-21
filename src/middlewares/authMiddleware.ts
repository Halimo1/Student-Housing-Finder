import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "Not authenticated. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if(!decoded){
            return res.status(401).json({ message: "Not authenticated. No token provided." });
        }

        req.user = { id: decoded.id, role: decoded.role , email: decoded.email};
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authenticated. Invalid or expired token." });
    }
};
