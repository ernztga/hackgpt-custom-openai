import Chat from "../models/Chat.js";

// API Controller for creating a new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };
    // Create new chat document
    await Chat.create(chatData);

    return res
      .status(201)
      .json({ success: true, message: "Chat created successfully", chatData });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API Controller for fetching all chats of a user
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch chats for the user
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    return res.json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API Controller for deleting a chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;

    // Find the chat to ensure it belongs to the user
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found for user" });
    }

    // Delete the chat
    await Chat.deleteOne({ _id: chatId });

    return res.json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
