import User from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if (!["student", "educator"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role"
            })
        }
        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(400).json({ message: "Email already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter valid email" })
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Please type password of atleast 8 characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword
        })

        const token = genToken(user._id);

        res.cookie(
            "token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        )

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        return res.status(500).json({ message: `SignUp error: ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ "message": "Please input all fields" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        const token = genToken(user._id);

        res.cookie(
            "token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        )

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        return res.status(500).json({ message: `SignUp error: ${error}` })
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({ message: `LogOut successfull` })
    } catch (error) {
        return res.status(500).json({ message: `LogOut error: ${error}` })
    }
}