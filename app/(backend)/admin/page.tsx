// "use client";
// import { useRouter } from "next/navigation"; // ⬅️ Add this
// import Link from "next/link";
// import { ReactNode, useEffect, useState } from "react";
// import Image from "next/image";
// import toast, { Toaster } from "react-hot-toast";
// import NotificationClient from "@/app/components/NotificationClient";
// interface Project {
//   location: ReactNode
//   frontimgalt: string
//   frontimg: string
//   _id: string;
//   title: string;
//   slug: string;
//   style: string;
//   budget: number;
// }
// export default function Dashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("admin_token");
//     if (!token) {
//       router.push("/admin/login"); // Redirect if not logged in
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("admin_token");

//     if (!token) {
//       router.push("/admin/login/");
//       return;
//     }

//     fetch("/api/admin", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => {
//       if (!res.ok) {
//         localStorage.removeItem("admin_token");
//         router.push("/admin/login/");
//       }
//     });
//   }, []);


//   const [notifications, setNotifications] = useState<any[]>([]);

//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:4000/events");

//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setNotifications((prev) => [data, ...prev]);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);
//   const fetchProjects = async () => {
//     const res = await fetch('/api/design-project');
//     const data = await res.json();
//   };

//   useEffect(() => {
//     fetchProjects(); // initial fetch
//     const interval = setInterval(fetchProjects, 10000); // every 10 sec
//     return () => clearInterval(interval);
//   }, []);

//   const [projects, setProjects] = useState<Project[]>([]);
//   const [imageCount, setImageCount] = useState<number>(0);

//   useEffect(() => {
//     fetch('/api/design-project')
//       .then(res => res.json())
//       .then(data => setProjects(data));

//     fetch("/api/images/count")
//       .then((res) => res.json())
//       .then((data) => setImageCount(data.count));
//   }, []);



//   return (
//     <>
//       <div>
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded shadow text-lg font-bold">
//             🖼 Total Projects: {projects.length}
//           </div>

//           <div className="bg-white p-4 rounded shadow text-lg font-semibold">
//             <div>
//               <Toaster position="top-right" />
//               <h1>Admin Dashboard</h1>
//               {/* Render inquiry data or stats here */}
//             </div>

//           </div>

//           <div className="bg-white p-4 rounded shadow text-lg font-bold">
//             📷 Images Uploaded: {imageCount}
//           </div>
//         </div>
//       </div>

//       <div className="grid  grid-cols-1 lg:grid-cols-3 gap-2 mt-10">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-6 text-center sm:text-left">Recent Uploads</h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             {projects.slice(0, 4).map((project, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
//               >
//                 <Link href={`/products/${project.slug}`}>
//                   <div className="cursor-pointer group">
//                     <div className="relative w-full h-[180px] overflow-hidden rounded-md">
//                       <Image
//                         src={project.frontimg || '/default-image.jpg'}
//                         alt={project.frontimgalt || 'Project Image'}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-md transform transition-transform duration-300 group-hover:scale-105"
//                       />
//                     </div>

//                     {/* Optional project details */}
//                     {/* <h2 className="text-lg font-bold mt-3">{project.title}</h2>
//             <p className="text-sm text-gray-500">{project.style}</p>
//             <p className="text-sm text-gray-500">{project.budget}</p>
//             <p className="text-sm text-gray-500">{project.location}</p> */}
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 ">
//           {/* Timeline Section */}
//           <div>
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
//               <ul className="space-y-2 text-sm text-gray-700">
//                 <li>• Kitchen Remodel - Due: April 15</li>
//                 <li>• Living Room Concept - Due: April 22</li>
//                 <li>• Office Setup - Due: May 01</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="p-4">
//           <h1 className="text-xl font-bold mb-4">Admin Notifications</h1>

//           <NotificationClient />
//         </div>
//         <button
//           onClick={() => {
//             localStorage.removeItem("admin_token");
//             router.push("/admin/login/");
//           }}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>

//       </div>
//     </>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import NotificationClient from "@/app/components/NotificationClient";
import TaskForm from "@/app/components/TaskForm";
import CalendarView from "@/app/components/CalendarView";
import { format, parseISO } from "date-fns";

interface Project {
  location: ReactNode;
  frontimgalt: string;
  frontimg: string;
  _id: string;
  title: string;
  slug: string;
  style: string;
  budget: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  // 🔐 Auth Check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Fetch data only if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch("/api/design-project")
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch("/api/images/count")
      .then((res) => res.json())
      .then((data) => setImageCount(data.count));

    const interval = setInterval(() => {
      fetch("/api/design-project")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }, 10000);

    fetch("api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // 🔔 Live Notifications
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
    };

    return () => eventSource.close();
  }, []);

  // 🔘 Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-4 rounded shadow text-lg font-bold">
          🖼 Total Projects: {projects.length}
        </div>

        <div className="bg-white p-4 rounded shadow text-lg font-semibold">
          <Toaster position="top-right" />
          <h2>Welcome, Admin</h2>
          {/* Add any more summary content here */}
        </div>

        <div className="bg-white p-4 rounded shadow text-lg font-bold">
          📷 Images Uploaded: {imageCount}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* 📁 Recent Uploads */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6 text-center sm:text-left">Recent Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/products/${project.slug}/`}>
                  <div className="cursor-pointer group">
                    <div className="relative w-full h-[180px] overflow-hidden rounded-md">
                      <Image
                        src={project.frontimg || "/default-image.jpg"}
                        alt={project.frontimgalt || "Project Image"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 📆 Project Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {tasks.map((task) => (
              <li key={task._id}>
                • {task.title} – Due: {format(parseISO(task.dueDate), "MMMM d")}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔔 Admin Notifications */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h1 className="text-xl font-bold mb-4">Admin Notifications</h1>
          <NotificationClient />
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">Admin Scheduling</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskForm />
          <CalendarView />
        </div>
      </div>
    </>
  );
}
