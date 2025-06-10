import { NextResponse } from "next/server";
import connectDB from '@/lib/mongoose';
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ email, password: hashed });

    return NextResponse.json({ message: "Admin created", adminId: newAdmin._id });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
