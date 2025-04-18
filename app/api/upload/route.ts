// import { NextRequest, NextResponse } from 'next/server';
// import path from 'path';
// import { writeFile } from 'fs/promises';
// import { mkdirSync, existsSync } from 'fs';

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get('file') as File;

//   if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);
//   const uploadDir = path.join(process.cwd(), 'public/uploads');

//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir, { recursive: true });
//   }

//   const filename = `${Date.now()}-${file.name}`;
//   const filepath = path.join(uploadDir, filename);
//   await writeFile(filepath, buffer);

//   const fileUrl = `/uploads/${filename}`;
//   return NextResponse.json({ url: fileUrl });
// }
// app/api/upload/route.ts
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
