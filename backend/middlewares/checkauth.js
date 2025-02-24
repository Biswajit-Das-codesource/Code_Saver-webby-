import { getuser } from "../utils/generateToken.js";

export async function checkauth(req, res, next) {
    try {
        const token = req.cookies?.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Login first", success: false });
        }

        console.log("Token:", token);

        const user = getuser(token);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        console.log("User:", user);

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
