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
                const res = await fetch(`/api/users/${id}`);
                const data = await res.json();
                setProject(data);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchProject();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!project) return <p className="text-center mt-10 text-red-600">Project not found</p>;

    return (
        <main className="bg-gray-100 flex items-center justify-center">
            <div className="max-w-3xl mx-auto p-6 ">
                <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
                <p><strong>Email:</strong> {project.email}</p>
                <p><strong>Address:</strong> {project.address}</p>
                <p><strong>Mobile No.:</strong> {project.mobileNo}</p>
                <p><strong>Message :</strong> {project.message}</p>
            </div>
        </main>
    );
}
