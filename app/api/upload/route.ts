import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString('base64');
  const mimeType = file.type;

  const base64Image = `data:${mimeType};base64,${base64String}`;

  return NextResponse.json({ base64: base64Image });
}
