import express from "express"
import authControllers from "../controllers/authControllers.js"

const router = express.Router()
router.post("/login", authControllers.login)
router.post("/signup", authControllers.signup)

export default router