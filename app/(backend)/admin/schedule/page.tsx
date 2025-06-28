'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ConfirmAlert from '@/app/components/ConfirmAlert';
import LoaderSpinner from '@/app/components/ui/LoaderSpinner';

// Define the User type according to your API response structure
interface Tasks {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  assignee: string;
  // Add other fields if needed, e.g. frontimg, etc.
}


const Page = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/tasks');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setTasks(data);
        setLoading(false); // ✅ END LOADING on success
      } catch (err) {
        console.error('Error loading Tasks:', err);
      }
    }
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`); // Adjust API path as needed

      if (res.status === 200) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
        setShowDelete(false);
      } else {
        console.error('❌ Failed to delete Tasks:', res.statusText);
      }
    } catch (error) {
      console.error('❌ Error deleting Tasks:', error);
    }
  };


  return (
    <>
      {
        loading ? (
          <LoaderSpinner />
        ) : (
          <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold'>Manage Schedule</h2>
            </div>

            <h3 className='mb-4 text-gray-600'>Total Tasks: {tasks.length}</h3>

            <table className='min-w-full table-auto border-collapse border border-gray-300 mb-10 overflow-x-auto overflow-scroll'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='border px-4 py-2'>Title</th>
                  <th className='border px-4 py-2'>Description</th>
                  <th className='border px-4 py-2'>Due Date</th>
                  <th className='border px-4 py-2'>Type</th>
                  <th className='border px-4 py-2'>Assignee</th>
                  <th className='border px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((p, index) => (
                  <tr key={index} className='hover:bg-gray-100'>
                    <td className='border px-4 py-2'>{p.title}</td>
                    <td className='border px-4 py-2'>{p.description}</td>
                    <td className='border px-4 py-2'>{p.dueDate}</td>
                    <td className='border px-4 py-2'>{p.type}</td>
                    <td className='border px-4 py-2'>{p.assignee}</td>

                    <td className='border px-4 py-2 space-x-2'>
                      <Link href={`/admin/clients/view/${p._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</Link>
                      <button
                        onClick={() => setShowDelete(true)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                      >
                        Delete
                      </button>
                      <ConfirmAlert
                        show={showDelete}
                        onClose={() => setShowDelete(false)}
                        onConfirm={() => handleDelete(p._id)}
                        title="Delete Task?"
                        message="Are you sure you want to delete this Task?"
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
        )
      }
    </>
  );
};

export default Page;
