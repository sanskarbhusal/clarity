import express from "express"
import transactionControllers from "../controllers/transactionControllers.js"

const router = express.Router()

router.get("/list", transactionControllers.getList)

export default router