import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/connectDB.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
const port = process.env.PORT



const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user", userRouter)

app.get("/",(req,res)=>{
    res.send("Hello from server")
})

app.get((req,res)=>{
    res.status(404).send("Page Not Found (404)")
})

const startServer = async()=>{
    try{
        await connectDB();

        app.listen(port,()=>{
            console.log(`Server Started at port: ${port}`)
        })

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

startServer();