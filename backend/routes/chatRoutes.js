import express from "express";

const chatRouter = express.Router();

import { protect } from "../middlewares/auth.js";
import {
  createChat,
  getChats,
  deleteChat,
} from "../controllers/chatController.js";

// Chat endpoint
chatRouter.get("/create", protect, createChat);
chatRouter.get("/get", protect, getChats);
chatRouter.post("/delete", protect, deleteChat);

export default chatRouter;
