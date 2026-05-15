import Chat from "../models/Chat.js";

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

    // Add the new message to the chat's messages array
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Save the updated chat document
    await chat.save();

    return res.json({ success: true, message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
