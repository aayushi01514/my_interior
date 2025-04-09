import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("MONGODB_URI is not defined");

  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");
};

export default connectDB;
