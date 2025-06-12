'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ConfirmAlert from '@/app/components/ConfirmAlert';
import LoaderSpinner from '@/app/components/ui/LoaderSpinner';

interface Project {
  _id: string;
  title: string;
  slug: string;
  style: string;
  budget: number;
  frontimg: string;
  frontimgalt: string;
  location: string;
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/design-project');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setProjects(data);
        setLoading(false); // ✅ END LOADING on success
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    }
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/design-project/${id}`); // Adjust API path as needed

      if (res.status === 200) {
        setProjects((prev) => prev.filter((project) => project._id !== id));
      } else {
        console.error('❌ Failed to delete project:', res.statusText);
        // alert('❌ Failed to delete project');
      }
    } catch (error) {
      console.error('❌ Error deleting project:', error);
      // alert('❌ An error occurred while deleting the project');
    }
  };


  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>List of Uploaded Projects</h2>
            <Link href="/admin/projects/add-projects" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Add New Project</Link>
          </div>

          <h3 className='mb-4 text-gray-600'>Total Projects: {projects.length}</h3>

          <table className='min-w-full table-auto border-collapse border border-gray-300 mb-10 overflow-x-auto overflow-scroll'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border px-4 py-2'>Title</th>
                <th className='border px-4 py-2'>Slug</th>
                <th className='border px-4 py-2'>Style</th>
                <th className='border px-4 py-2'>Budget</th>
                <th className='border px-4 py-2'>Image</th>
                <th className='border px-4 py-2'>Location</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>{p.title}</td>
                  <td className='border px-4 py-2'>{p.slug}</td>
                  <td className='border px-4 py-2'>{p.style}</td>
                  <td className='border px-4 py-2'>₹{p.budget.toLocaleString()}</td>
                  <td className='border px-4 py-2'>
                    {p.frontimg && (
                      <img
                        src={p.frontimg}
                        alt={p.frontimgalt || p.title}
                        width={60}
                        height={40}
                        className='object-cover rounded'
                      />
                    )}
                  </td>
                  <td className='border px-4 py-2'>{p.location}</td>
                  <td className='border px-4 py-2 space-x-2'>
                    <Link onClick={() => setShowUpdateSuccess(true)} href={`/admin/projects/view/${p._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</Link>
                    <Link href={`/admin/projects/update/${p._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
                    <button
                      // onClick={() => setShowAlert(true)} 
                      onClick={() => setShowDelete(true)}
                      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                      Delete
                    </button>
                    <ConfirmAlert
                      show={showDelete}
                      onClose={() => setShowDelete(false)}
                      onConfirm={() => handleDelete(p._id)}
                      title="Delete Product?"
                      message="Are you sure you want to delete this product? This action cannot be undone."
                      confirmText="Delete"
                      cancelText="Cancel"
                      theme="danger"
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Page;
