import { Router } from "express";
import { createRegister, getRegisters, getSaldo } from './controllers/register.controller.js'

const router = Router()

router.post("/register", createRegister)

router.get("/register", getRegisters)

router.get("/saldo", getSaldo)