'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/tasks');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setTasks(data);
      } catch (err) {
        console.error('Error loading Tasks:', err);
      }
    }
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Task?');

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/tasks/${id}`); // Adjust API path as needed

      if (res.status === 200) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
        alert('✅ Task deleted successfully');
      } else {
        console.error('❌ Failed to delete Tasks:', res.statusText);
        alert('❌ Failed to delete tasks');
      }
    } catch (error) {
      console.error('❌ Error deleting Tasks:', error);
      alert('❌ An error occurred while deleting the Tasks');
    }
  };


  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Manage Schedule</h2>
        {/* <Link href="/admin/projects/add-projects" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Add New Project</Link> */}
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
                {/* <Link href={`/admin/projects/update/${p._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link> */}
                <button
                  onClick={() => handleDelete(p._id)}
                  className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
