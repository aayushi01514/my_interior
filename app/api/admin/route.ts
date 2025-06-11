import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongoose";

// POST /api/admin - Admin Login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ✅ Connect to MongoDB Atlas
    await connectDB();

    // 🔍 Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ Return token
    return NextResponse.json({ token }, { status: 200 });

  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
