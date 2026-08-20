import jwt from "jsonwebtoken";

export function generateToken(user:{_id : string, email:string}) {
    
    const payload = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });
};

export const verifyToken = (token: string) => {
    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error){
        throw new Error("Invalid or expired token");
    }
};