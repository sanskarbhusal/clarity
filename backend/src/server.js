import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import crudRouter from "./routes/crud"

dotenv.config()
const app = express()
const port = process.env.PORT

// Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/crud", crudRouter)

// Test route
app.get("/", (req, res) => {
    res.send("API is running :)")
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})

