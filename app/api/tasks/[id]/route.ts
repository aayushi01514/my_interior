import connectDB from '@/lib/mongoose';
import Task from '@/models/Task';
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

  const task = await Task.findById(id);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
}

// DELETE task by ID
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

  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}