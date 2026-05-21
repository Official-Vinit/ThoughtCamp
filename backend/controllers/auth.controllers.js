import User from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"
import sendMail from "../config/sendMail.js"

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
            sameSite: "Lax",
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
            sameSite: "Lax",
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
        res.clearCookie("token")
        return res.status(200).json({ message: `LogOut successfull` })
    } catch (error) {
        return res.status(500).json({ message: `LogOut error: ${error}` })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                message: "Email required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = await bcrypt.hash(otp, 8)
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false;


        await user.save();
        await sendMail(email, otp)

        return res.status(200).json({ message: "Otp sent successfully" })
    } catch (error) {
        return res.status(500).json({ message: "send otp error" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        if (!user.resetOtp || !user.otpExpires || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid Otp" })
        }
        const isOtpMatch = await bcrypt.compare(
            otp,
            user.resetOtp
        )

        if (!isOtpMatch) {
            return res.status(400).json({ message: "Invalid Otp" })
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save();

        return res.status(200).json({ message: "Otp verified successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Verify otp error" })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(404).json({ message: "OTP verification required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.isOtpVerified = false;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        
        await user.save();
        return res.status(200).json({ message: "Password reset successful" })

    } catch (error) {
        return res.status(500).json({ message: "Reset Password error" })
    }
}