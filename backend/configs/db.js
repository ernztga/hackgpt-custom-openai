import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose database connected.");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/hackgpt`);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
