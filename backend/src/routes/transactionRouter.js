import express from "express"
import transactionControllers from "../controllers/transactionControllers.js"

const router = express.Router()

router.get("/list", transactionControllers.getList)
router.patch("/", transactionControllers.editTransaction)
router.delete("/:transaction_id", transactionControllers.deleteTransaction)

export default router