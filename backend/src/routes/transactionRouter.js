import express from "express"
import transactionControllers from "../controllers/transactionControllers.js"

const router = express.Router()

router.get("/list", transactionControllers.getList)
router.patch("/", transactionControllers.editTransaction)

export default router