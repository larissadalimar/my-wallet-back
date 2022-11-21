import { Router } from 'express'
import authValidation from '../middlewares/auth.middleware.js'
import { registerSchemaValidation } from '../middlewares/registerSchemaValidation.middleware.js'
import { createRegister, getRegisters } from '../controllers/register.controller.js'

const router = Router()
router.use(authValidation)

router.post("/register", registerSchemaValidation, createRegister)

router.get("/register", getRegisters)

export default router