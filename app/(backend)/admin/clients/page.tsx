'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoaderSpinner from '@/app/components/ui/LoaderSpinner';
import ConfirmAlert from '@/app/components/ConfirmAlert';

// Define the User type according to your API response structure
interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  mobileNo: string;
  message: string;
  // Add other fields if needed, e.g. frontimg, etc.
}


const Page = () => {
  const [users, setUser] = useState<User[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/users');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setUser(data);
        setLoading(false); // ✅ END LOADING on success
      } catch (err) {
        console.error('Error loading User:', err);
      }
    }
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/users/${id}`); // Adjust API path as needed

      if (res.status === 200) {
        setUser((prev) => prev.filter((project) => project._id !== id));
      } else {
        console.error('❌ Failed to delete Users:', res.statusText);

      }
    } catch (error) {
      console.error('❌ Error deleting Users:', error);
    }
  };


  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <LoaderSpinner />
        </div>
      ) : (
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>List of Client's Inquiry</h2>
            {/* <Link href="/admin/projects/add-projects" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Add New Project</Link> */}
          </div>

          <h3 className='mb-4 text-gray-600'>Total Users: {users.length}</h3>

          <table className='min-w-full table-auto border-collapse border border-gray-300 mb-10 overflow-x-auto overflow-scroll'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>Address</th>
                <th className='border px-4 py-2'>Mobile No.</th>
                <th className='border px-4 py-2'>Messages</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((p, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='border px-4 py-2'>{p.name}</td>
                  <td className='border px-4 py-2'>{p.email}</td>
                  <td className='border px-4 py-2'>{p.address}</td>
                  <td className='border px-4 py-2'>{p.mobileNo}</td>
                  <td className='border px-4 py-2'>{p.message}</td>

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
                      title="Delete User"
                      message="Are you sure you want to delete this User?"
                      confirmText="Delete"
                      cancelText="Cancel"
                      theme="danger" />
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
