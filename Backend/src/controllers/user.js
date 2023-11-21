import User from "../models/User.js";

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user.name);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}