'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ViewProjectPage() {
  const { id } = useParams() as { id: string };
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!project) return <p className="text-center mt-10 text-red-600">Project not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      <p><strong>Slug:</strong> {project.slug}</p>
      <p><strong>Style:</strong> {project.style}</p>
      <p><strong>Budget:</strong> ₹{project.budget}</p>
      <p><strong>Location:</strong> {project.location}</p>
      <div className="mt-4">
        <img src={project.frontimg} alt={project.frontimgalt} className="w-full max-h-96 object-cover rounded" />
      </div>
    </div>
  );
}
