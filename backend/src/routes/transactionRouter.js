import express from "express"
import transactionControllers from "../controllers/transactionControllers.js"

const router = express.Router()

router.get("/list", transactionControllers.getList)
router.patch("/edit", transactionControllers.editTransaction)
router.delete("/:transaction_id", transactionControllers.deleteTransaction)
router.get("/getOverview/:email", transactionControllers.getOverview)
router.post("/add", transactionControllers.addTransaction)

export default router