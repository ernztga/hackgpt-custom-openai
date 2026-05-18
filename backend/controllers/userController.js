import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// API to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password - Note: You should implement password comparison using bcrypt here
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token - Note: You should implement JWT token generation here
    const token = generateToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to get user profile
export const getUser = async (req, res) => {
  try {
    const user = req.user; // Assuming you have middleware to set req.user

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to get published images
export const getPublishedImages = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch published images for the user
    const publishedImageMessages = await Chat.aggregate([
      { $match: { userId } },
      { $unwind: "$messages" },
      { $match: { "messages.isImage": true, "messages.isPublished": true } },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName",
        },
      },
    ]);

    return res.json({
      success: true,
      images: publishedImageMessages.reverse(),
    });
  } catch (error) {
    console.error("Error fetching published images:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
