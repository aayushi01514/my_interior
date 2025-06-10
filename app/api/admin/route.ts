import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from '@/lib/mongoose';
import slugify from 'slugify';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
