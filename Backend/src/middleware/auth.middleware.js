import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt;
        
        if(!token) {
            return res.status(401).json({message : "Unauthorized - No token provided"})
        }
        //To decode the user id from the jwt token saved in cookie
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message : "Tokon is invalid"})
        }
        //Not sending the pasword back to the client for security
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({ message : "User not found"})
        }
        //After user get authenticated it added to data base
        req.user = user
        //  nesxt function called form auth.controller.js (update profile)
        next()
    } catch (error) {
        console.log("Error in protectRoute Middleware" , error.message);
        return res.status(500).json({message : "Internal server error"})

    }
}