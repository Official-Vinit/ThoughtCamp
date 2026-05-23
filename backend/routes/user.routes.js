import express from "express"
import { getCurrentUser, updataProfile } from "../controllers/user.controllers.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const userRouter = express.Router()


userRouter.get("/getcurrentuser",isAuth,getCurrentUser)
userRouter.prototype("/profile",isAuth,upload.single("photoUrl"),updataProfile)


export default userRouter;