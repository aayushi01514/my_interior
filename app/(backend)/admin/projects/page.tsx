// "use client"
// import React, { ReactNode, useEffect, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { products } from '@/data/index'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// interface Project {
//   location: ReactNode
//   frontimgalt: string
//   frontimg: ReactNode
//   _id: string;
//   title: string;
//   slug: string;
//   style: string;
//   budget: number;
// }
// const page = ({ }) => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [posts, setPost] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetch('/api/design-project')
//       .then(res => res.json())
//       .then(data => setProjects(data));
//   }, []);

//   const handledelete = async (id: string) => {
//     console.log("Deleting post with ID:", id); // ✅ Debugging line
//     try {
//       await axios.delete(`http://localhost:5000/posts/${id}`);
//       setPost([]);
//       router.push('/posts/'); // Redirect after deletion
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };
//   return (
//     <>

//       <div className='container'>
//         <div className='flex flex-col  items-center justify-center mt-20 mb-20'>
//           {/* <h1 className='text-4xl font-bold text-center mb-2'>Our Products</h1> */}
//           <div className='p-10 text-lg text-center border-2 border-gray-300 rounded-lg shadow-lg w-full' >
//             <h2 className='text-left text-2xl'>List of Uploaded Products</h2>
//             <h3 className='text-xl text-left py-2'>Total Projects : {projects.length}</h3>
//             <div className='grid grid-cols-2'>
//               <div className='text-left text-sm text-gray-700 py-2'>A list of all the products in your page including their name, title, price , etc..</div>
//               <div className='text-right text-lg'>
//                 <Link href="/admin/projects/add-projects" className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'>Add New Projects</Link>
//               </div>
//               {/* <div className='text-left text-lg'>Total Products:</div>
//               <div className='text-right text-lg'>{projects.length}</div> */}
//             </div>
//             <br />
//             <table className='table-auto w-full text-left p-10 border-collapse border border-gray-300'>
//               <thead className='p-10 mb-10'>
//                 <tr className=' border-2 bg-gray-300' >
//                   <th className='p-4 '>Title</th>
//                   <th >Slug</th>
//                   <th >Style</th>
//                   <th >Budget</th>
//                   <th >Image</th>
//                   <th >location</th>
//                   <th>Actions</th>

//                 </tr>
//               </thead>
//               {projects.map((product, index) => (
//                 <tbody key={index} className='p-10 mb-10'>
//                   <tr>
//                     <td className='p-4'>{product.title}</td>
//                     <td>{product.slug}</td>
//                     <td>{product.style}</td>
//                     <td>{product.budget}</td>
//                     <td><Image src={typeof product.frontimg === 'string' ? product.frontimg : ''} alt={product.frontimgalt} width={50} height={20} /></td>
//                     <td>{product.location}</td>
//                     <td>
//                       <Link className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-5' href={`/`}>Delete</Link>
//                       <Link className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300' href={`/`}>Update</Link>
//                     </td>
//                   </tr>
//                 </tbody>

//               ))
//               }
//             </table>
//           </div>

//           {/* <div className='grid grid-cols-3 lg:grid-cols-3 gap-20'>
//             {
//               projects.map((product, index) => (
//                 <div key={index} className='mb-8 text-center items-center shadow-xl rounded-xl px-0 hover:scale-105 transition-transform duration-300 ' id='contact'>
//                   <Link href={`/products/${product.slug}`}>
//                     <Image className="object-cover rounded-t-xl"
//                       width={400} height={300}
//                       alt={product.frontimgalt}
//                       src={typeof product.frontimg === 'string' ? product.frontimg : ''} />
//                     <h2 className='text-2xl font-bold p-3'>{product.title}</h2>
//                   </Link>
//                 </div>

//               ))
//             }
//           </div> */}
//           <div className="outer">
//             <div className="buttonhover">
//               <div className="text">button</div>
//             </div>
//           </div>
//           <div>
//             <h1 className="text-center text-4xl p-8 ">POSTS</h1>

//             <Link href="/admin/projects/add-projects" className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create new post</Link>
//             <br />
//             <br />
//             <table className="min-w-full border border-gray-300">
//               <thead className="bg-gray-200 text-gray-600 uppercase">
//                 <tr>
//                   <th className="px-6 py-3 text-left">#</th>
//                   <th className="px-6 py-3 text-left">Title</th>
//                   <th className="px-6 py-3 text-left">Content</th>
//                   <th className="px-6 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {
//                   projects.map((post) => (

//                     <tr className="bg-gray-50 border-b hover:bg-gray-100" key={post._id}>
//                       <td className="px-6 py-3">{post._id}</td>
//                       <td className="px-6 py-3">{post.title}</td>
//                       <td className="px-6 py-3">{post.slug}</td>
//                       <td className="px-6 py-3">
//                         <Link className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href={`/posts/${post._id}`}>Read</Link> ||
//                         <Link className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href={`/posts/${post._id}?mode=edit`}>Edit</Link> ||
//                         <button type="button" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handledelete(post._id)}>Delete</button>
//                       </td>
//                     </ tr>

//                   ))}


//               </tbody>
//             </table>
//           </div >
//         </div>
//       </div>
//     </>
//   )
// }

// export default page



'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/design-project');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setProjects(data);
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
        alert('✅ Project deleted successfully');
      } else {
        console.error('❌ Failed to delete project:', res.statusText);
        alert('❌ Failed to delete project');
      }
    } catch (error) {
      console.error('❌ Error deleting project:', error);
      alert('❌ An error occurred while deleting the project');
    }
  };


  return (
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
                <Link href={`/admin/projects/view/${p._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</Link>
                <Link href={`/admin/projects/update/${p._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
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
