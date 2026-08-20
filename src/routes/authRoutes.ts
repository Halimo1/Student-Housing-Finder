import { Router } from "express"
import { validateAuthInput } from "../middlewares/validationMiddleware"
import { signUp , signIn } from '../controllers/authController'
import { roleMiddleware } from "../middlewares/roleMiddleware"
import { authMiddleware } from "../middlewares/authMiddleware"

export const authRouter = Router();

authRouter.post('/',validateAuthInput,signUp);

authRouter.post('/',validateAuthInput,signIn);