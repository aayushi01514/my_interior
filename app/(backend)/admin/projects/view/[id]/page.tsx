'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LoaderSpinner from '@/app/components/ui/LoaderSpinner';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, Star } from 'lucide-react';

export default function ViewProjectPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/design-project/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id]);

  const handleDownload = () => {
    // Replace with actual file URL
    const brochureUrl = `/files/${id}-brochure.pdf`;
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = `${project?.title}-Brochure.pdf`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: `Check out this interior project from 8R Studio!`,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <LoaderSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-red-600">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-black">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Project Overview</h1>
        <div />
      </header>

      {/* Main Content */}
      <motion.main
        className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <img
            src={project.frontimg}
            alt={project.frontimgalt}
            className="w-full h-80 object-cover sm:h-96"
          />

          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{project.title}</h2>

            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                <strong>Slug:</strong> {project.slug}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <strong>Style:</strong> {project.style}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <strong>Budget:</strong> ₹{project.budget}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <strong>Location:</strong> {project.location}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"
              >
                <Download className="h-4 w-4" />
                Download Brochure
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Share2 className="h-4 w-4" />
                Share Project
              </button>
            </div>

            {/* Testimonials / Reviews */}
            <div className="mt-8 border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">What Our Client Says</h3>
              <div className="bg-gray-100 p-4 rounded-xl shadow-sm space-y-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">
                  “Working with 8R Studio was a seamless experience. The design outcome exceeded our expectations.
                  Highly professional and creative team!”
                </p>
                <p className="text-xs text-right text-gray-500">— Riya Mehta, Surat</p>
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} 8R Studio. All rights reserved.
      </footer>
    </div>
  );
}
