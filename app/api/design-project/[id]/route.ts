import connectDB from '@/lib/mongoose';
import DesignProject from '@/models/Product';
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

  const project = await DesignProject.findById(id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
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

  const deleted = await DesignProject.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
}

// PUT update project by ID
export async function PUT(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id } = params;

  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      frontimg,
      frontimgalt,
      style,
      location,
      budget,
      variations,
    } = body;

    if (!title || !budget || budget <= 0) {
      return NextResponse.json({ error: 'Invalid title or budget' }, { status: 400 });
    }

    if (variations && variations.length > 0) {
      for (const variation of variations) {
        const { image, price, variationtitle } = variation;
        if (!image || !price || !variationtitle ) {
          return NextResponse.json(
            { error: 'Variation missing required fields' },
            { status: 400 }
          );
        }
      }
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingWithSameSlug = await DesignProject.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingWithSameSlug) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }

    const updated = await DesignProject.findByIdAndUpdate(
      id,
      {
        title,
        description,
        frontimg,
        frontimgalt,
        style,
        location,
        budget,
        slug,
        variations,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error('Error updating project:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

