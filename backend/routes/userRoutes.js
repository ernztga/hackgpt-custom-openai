import express from "express";

const userRouter = express.Router();

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

// User registration
userRouter.post("/register", registerUser);

// User login
userRouter.post("/login", loginUser);

// Get user data
userRouter.get("/data", protect, getUser);

export default userRouter;
