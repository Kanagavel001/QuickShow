import { clerkClient } from '@clerk/express'
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
    
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);

        if(user.privateMetadata.role !== "admin"){
            return res.json({ success: false, message: "not authorized" });
        }

        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const protectUser = async (req, res, next) => {

    try {
        const {userId} = req.auth();
        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

