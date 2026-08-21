import { Router } from "express"
import { validateAuthInput } from "../middlewares/validationMiddleware"
import { signUp , signIn, signOut } from '../controllers/authController'
import { roleMiddleware } from "../middlewares/roleMiddleware"
import { authMiddleware } from "../middlewares/authMiddleware"

export const authRouter = Router();


/**
 *@swagger
 *paths:
 *  /auth/signup:
 *    post:
 *      summary: Create a new user account
 *      tags:
 *        - Authentication
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *                - role
 *              properties:
 *                name:
 *                  type: string
 *                  example: Ahmed Mohamed
 *                email:
 *                  type: string
 *                  format: email
 *                  example: ahmed@example.com
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  example: Password@123
 *                role:
 *                  type: string
 *                  enum: [Lister, Seeker]
 *                  example: Seeker
 *
 *      responses:
 *        '201':
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User registered successfully
 *
 *        '400':
 *          description: Invalid input
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Validation error
 *
 *        '409':
 *          description: Email already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Email already registered
 *        '500':
 *           description: Some server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Some server error
 */

authRouter.post('/signUp',validateAuthInput,signUp);



/**
 * @swagger
 * /auth/signin:
 * post:
 *   summary: Sign in user
 *   tags:
 *     - Authentication
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: ahmed@example.com
 *             password:
 *               type: string
 *               format: password
 *               example: Password@123
 *
 *   responses:
 *     '200':
 *       description: User signed in successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Login successful
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64f123abc456"
 *                   name:
 *                     type: string
 *                     example: Ahmed Mohamed
 *                   email:
 *                     type: string
 *                     example: ahmed@example.com
 *
 *     '400':
 *       description: Invalid request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Email and password are required
 *
 *     '401':
 *       description: Invalid credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                  example: Invalid email or password
 */

authRouter.post('/signIn',validateAuthInput,signIn);


/**
 * @swagger
 * /auth/signout:
 * post:
 *   summary: Sign out user
 *   tags:
 *     - Authentication
 *   security:
 *     - bearerAuth: []
 *
 *   responses:
 *     '200':
 *       description: User signed out successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Logout successful
 * 
 *     '401':
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Unauthorized
 */

authRouter.post('/signOut',signOut)