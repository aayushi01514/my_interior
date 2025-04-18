// app/api/design-project/route.ts
import connectDB from '@/lib/mongoose';
import DesignProject from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET() {
  await connectDB();
  const projects = await DesignProject.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    // console.log('Received body:', body);  // This will help you see what data is coming to the server

    const {
      title,
      description,
      frontimg,
      frontimgalt,
      // images,
      style,
      location,
      budget,
      variations,
    } = body;

    if (budget <= 0) {
      return NextResponse.json({ error: 'Invalid budget' }, { status: 400 });
    }

    if (variations && variations.length > 0) {
      for (const variation of variations) {
        const { image, price, buttonLabel, buttonLink } = variation;
        if (!image || !price || !buttonLabel || !buttonLink) {
          return NextResponse.json(
            { error: 'Variation missing required fields' },
            { status: 400 }
          );
        }
      }
    }

    const slug = slugify(title, { lower: true, strict: true });
    const existing = await DesignProject.findOne({ slug });

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const newProject = await DesignProject.create({
      title,
      description,
      frontimg,
      frontimgalt,
      // images,
      style,
      location,
      budget,
      slug,
      variations,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
