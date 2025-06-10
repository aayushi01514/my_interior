import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const task = await Task.create(data);
  return NextResponse.json(task);
}
