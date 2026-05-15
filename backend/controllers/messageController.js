import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { openai } from "../config/openaiConfig.js";

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;
    const userId = req.user._id;

    // Find the chat to ensure it belongs to the user
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found for user" });
    }

    // Call Gemini API to get AI response
    const choices = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };
    res.json({ success: true, reply });

    // Add the new message to the chat's messages array
    chat.messages.push(reply);

    // Save the updated chat document
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check credits
    if (req.user.credits < 2) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You don't have enough credits to use this feature",
        });
    }

    const { chatId, prompt, isPublished } = req.body;

    // Find the chat to ensure it belongs to the user
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found for user" });
    }

    const reply = {
      ...choices[0],
      timestamp: Date.now(),
      isImage: true,
    };
    res.json({ success: true, reply });

    // Add the new message to the chat's messages array
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Save the updated chat document
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
