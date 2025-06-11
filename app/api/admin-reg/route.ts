import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ✅ Input validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    // 🔍 Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create new admin
    const newAdmin = await Admin.create({ email, password: hashed });

    // 🚀 Respond with success
    return NextResponse.json(
      { message: "Admin created successfully", adminId: newAdmin._id },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Admin registration error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
