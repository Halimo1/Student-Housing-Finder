import { Request, Response, NextFunction } from "express";

function isStrongPassword(password: string): boolean {
    if (password.length < 8) return false;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLowerCase && hasUpperCase && hasNumber;
}

function isValidEmail(email: string): boolean {
    const hasAtSymbol = email.includes("@");
    if (!hasAtSymbol) return false;
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const domain = parts[1];
    const hasDot = domain?.includes(".");
    return hasDot as boolean && (parts[0] as string).length > 0 && (domain as string).length > 3;
}

export const validateAuthInput = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Required fields are missing: email and password are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isStrongPassword(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, and a number",
        });
    }

    next();
};

export const validateListingInput = (req: Request, res: Response, next: NextFunction) => {
    const { location, price } = req.body;

    if (!location || price === undefined) {
        return res.status(400).json({ message: "Required fields are missing: location and price are required" });
    }

    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    next();
};