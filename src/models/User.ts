import mongoose from "mongoose";

export enum UserRole {
    LISTER = "Lister",
    SEEKER = "Seeker",
};

/**
 * @swagger
 * components:
 *   schemas:
 *     userSchema:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of user
 *         email:
 *           type: string
 *           description: The email
 *         password:
 *           type: string
 *           format: password
 *           description: The password
 *         role:
 *           type: string
 *           enum: [Lister, Seeker]
 *           description: The role of user
 *       example:
 *         fullName: "Youseef Ezzat Mohamed Ahmed"
 *         email: "user@example.com"
 *         password: "12345678"
 *         role: "Seeker"
 */

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
    }
});

export const User = mongoose.model("User", userSchema);