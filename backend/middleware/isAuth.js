import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid token" })
        }

        req.userId = verifyToken.userId

        next()

    } catch (error) {
        return res.status(401).json({ message: `Invalid or expired token: ${error.message}` })
    }
}

export default isAuth;