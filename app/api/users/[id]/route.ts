import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import slugify from 'slugify';

// GET project by ID
export async function GET(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id } = params;

  await connectDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const project = await User.findById(id);
  if (!project) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

// DELETE project by ID
export async function DELETE(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id } = params;

  await connectDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'User deleted' }, { status: 200 });
}