import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongo connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
