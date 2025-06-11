import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, name, email, phone, date, message } = await req.json();

    // 🔍 Basic validation
    if (!name || !email || !phone || !date || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Create new booking
    const newBooking = await Booking.create({ title, name, email, phone, date, message });

    // 🔔 Notify external server (e.g., Socket.IO)
    try {
      await fetch(`${process.env.NOTIFY_URL || 'http://localhost:4000'}/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          ...newBooking.toObject(),
        }),
      });
    } catch (notifyErr) {
      console.error("❗ Failed to notify socket server:", notifyErr);
      // Still proceed, don't block booking
    }

    return NextResponse.json(
      { message: 'Booking created', booking: newBooking },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Booking creation failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
