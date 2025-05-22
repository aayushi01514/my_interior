import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  await connectDB();
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, address, mobileNo, message } = body;

    const newUser = await User.create({ name, email, address, mobileNo, message });

    // Notify Socket.IO server
    await fetch('http://localhost:4000/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    return NextResponse.json({ message: 'Inquiry sent', user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}