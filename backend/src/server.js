import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRouter.js"
import transactionRouter from "./routes/transactionRouter.js"

dotenv.config()
const app = express()
const port = process.env.PORT

app.set("trust proxy", true)
// Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/transaction", transactionRouter)

// Test route
app.get("/", (req, res) => {
    res.send("API is running :)")
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port: ${port}`)
})