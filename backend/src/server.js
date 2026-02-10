import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRouter.js"

dotenv.config()
const app = express()
const port = process.env.PORT

// Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRouter)

// Test route
app.get("/", (req, res) => {
    res.send("API is running :)")
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})