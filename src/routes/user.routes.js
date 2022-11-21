import { Router } from "express";
import authValidation from "../middlewares/auth.middleware.js";
import { signInValidation } from "../middlewares/signInValidation.middleware.js";
import { signUpValidation } from "../middlewares/signUpValidation.middleware.js";
import { signUp, signIn, signOut } from '../controllers/user.controller.js'


const router = Router()

router.post("/sign-up", signUpValidation, signUp)

router.post("/sign-in", signInValidation, signIn)

router.delete("/sign-out", signOut)

export default router