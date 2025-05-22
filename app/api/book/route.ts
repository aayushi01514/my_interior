import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, name, email, phone, date, message } = body;

    const newBooking = await Booking.create({ title, name, email, phone, date, message });

    // Notify Socket.IO server with booking details
    await fetch('http://localhost:4000/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        ...newBooking.toObject(),
      }),
    });

    return NextResponse.json({ message: 'Booking created', booking: newBooking }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}