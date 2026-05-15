import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized, token failed" });
  }
};
