import { Router } from "express";
import { validateAuthInput } from "../middlewares/validationMiddleware";
import { signUp, signIn, signOut } from "../controllers/authController";

export const authRouter = Router();

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or email already exists
 *       500:
 *         description: Error registering user
 */
authRouter.post("/signUp", validateAuthInput, signUp);

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
authRouter.post("/signIn", validateAuthInput, signIn);

/**
 * @swagger
 * /auth/signOut:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
authRouter.post("/signOut", signOut);