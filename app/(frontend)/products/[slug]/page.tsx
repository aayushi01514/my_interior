import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CommonHeader from '@/app/components/CommonHeader';
import type { Metadata } from 'next';
import Link from 'next/link';
interface Variation {
  variationtitle: string;
  price: number;
  image: string;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  frontimg: string;
  style: string;
  location: string;
  budget: number;
  variations: Variation[];
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  await connectDB();
  const project = await DesignProject.findOne({ slug: params.slug }).lean() as Project | null;

  if (!project) return notFound();

  return (
    <>
      <CommonHeader title={project.title} imgsrc={project.frontimg} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="mb-2">{project.description}</p>
        <p><strong>Style:</strong> {project.style}</p>
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Total Budget:</strong> ₹{project.budget}</p>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
            {project.variations.map((variant, index) => (
              <div
                key={index}
                className="w-full max-w-[800px] bg-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 p-5"
              >
                <div className="flex flex-col items-start justify-center w-full rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={variant.image}
                    alt={`${variant.variationtitle} image ${index + 1}`}
                    width={500}
                    height={400}
                    className="object-cover h-fit w-full md:w-[700px] md:h-[360px] transform transition duration-1000 hover:scale-125"
                  />
                </div>
                <h2 className="text-2xl font-semibold mb-2">{variant.variationtitle} Package</h2>
                <p className="mb-2"><strong>Price:</strong> ₹{variant.price}</p>
                <a
                  href={`/book?title=${encodeURIComponent(variant.variationtitle)}`}
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Book {variant.variationtitle}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import connectDB from '@/lib/mongoose';
import DesignProject from '@/models/Product';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB();
  const dbProject = await DesignProject.findOne({ slug: params.slug }).lean();

  if (!dbProject) {
    return {
      title: 'Project Not Found',
    };
  }
  const project = dbProject as unknown as Project;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [project.frontimg],
    },
  };
}
