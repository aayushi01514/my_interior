// "use client";

// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import toast, { Toaster } from "react-hot-toast";
// import NotificationClient from "@/app/components/NotificationClient";
// import TaskForm from "@/app/components/TaskForm";
// import CalendarView from "@/app/components/CalendarView";
// import { format, parseISO } from "date-fns";
// import ConfirmAlert from "@/app/components/ConfirmAlert";

// interface Project {
//   location: ReactNode;
//   frontimgalt: string;
//   frontimg: string;
//   _id: string;
//   title: string;
//   slug: string;
//   style: string;
//   budget: number;
// }

// export default function Dashboard() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [imageCount, setImageCount] = useState<number>(0);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [showLogout, setShowLogout] = useState(false);

//   // 🔐 Auth Check
//   useEffect(() => {
//     const token = localStorage.getItem("admin_token");
//     if (!token) {
//       router.push("/admin/login");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // ✅ Fetch data only if authenticated
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     fetch("/api/design-project")
//       .then((res) => res.json())
//       .then((data) => setProjects(data));

//     fetch("/api/images/count")
//       .then((res) => res.json())
//       .then((data) => setImageCount(data.count));

//     const interval = setInterval(() => {
//       fetch("/api/design-project")
//         .then((res) => res.json())
//         .then((data) => setProjects(data));
//     }, 10000);

//     fetch("api/tasks")
//       .then((res) => res.json())
//       .then((data) => setTasks(data));

//     return () => clearInterval(interval);
//   }, [isAuthenticated]);

//   // 🔔 Live Notifications
//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:4000/events");

//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setNotifications((prev) => [data, ...prev]);
//     };

//     return () => eventSource.close();
//   }, []);

//   // 🔘 Logout
//   const handleLogout = () => {
//     localStorage.removeItem("admin_token");
//     router.push("/admin/login");
//   };

//   if (!isAuthenticated) return null;

//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           // onClick={handleLogout}
//           onClick={() => setShowLogout(true)}

//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//         <ConfirmAlert
//           show={showLogout}
//           onClose={() => setShowLogout(false)}
//           onConfirm={handleLogout}
//           title="Logout?"
//           message="You will be logged out of the admin panel."
//           confirmText="Logout"
//           cancelText="Stay"
//           theme="logout"
//         />

//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//         <div className="bg-white p-4 rounded shadow text-lg font-bold">
//           🖼 Total Projects: {projects.length}
//         </div>

//         <div className="bg-white p-4 rounded shadow text-lg font-semibold">
//           <Toaster position="top-right" />
//           <h2>Welcome, Admin</h2>
//           {/* Add any more summary content here */}
//         </div>

//         <div className="bg-white p-4 rounded shadow text-lg font-bold">
//           📷 Images Uploaded: {imageCount}
//         </div>
//       </div>
//       <div>
//         <h1 className="text-2xl">Welcome to your dashboard</h1>
//         {/* <AlertBox message="Project created successfully!" type="success" /> */}
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
//         {/* 📁 Recent Uploads */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-6 text-center sm:text-left">Recent Uploads</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {projects.slice(0, 4).map((project, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
//               >
//                 <Link href={`/products/${project.slug}/`}>
//                   <div className="cursor-pointer group">
//                     <div className="relative w-full h-[180px] overflow-hidden rounded-md">
//                       <Image
//                         src={project.frontimg || "/default-image.jpg"}
//                         alt={project.frontimgalt || "Project Image"}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-md transform transition-transform duration-300 group-hover:scale-105"
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 📆 Project Timeline */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
//           <ul className="space-y-2 text-sm text-gray-700">
//             {tasks.map((task) => (
//               <li key={task._id}>
//                 • {task.title} – Due: {format(parseISO(task.dueDate), "MMMM d")}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* 🔔 Admin Notifications */}
//         <div className="p-4 bg-white rounded-xl shadow-md">
//           <h1 className="text-xl font-bold mb-4">Admin Notifications</h1>
//           <NotificationClient />
//         </div>
//       </div>
//       <div className="p-8">
//         <h1 className="text-4xl font-bold mb-6">Admin Scheduling</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <TaskForm />
//           <CalendarView />
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Bell, LogOut } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TaskForm from "@/app/components/TaskForm";
import CalendarView from "@/app/components/CalendarView";
import ConfirmAlert from "@/app/components/ConfirmAlert";
import CountUp from 'react-countup';

interface Project {
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
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/admin/login");
    else setIsAuthenticated(true);
  }, []);

  // useEffect(() => {
  //   if (!isAuthenticated) return;
  //   fetch("/api/design-project").then(res => res.json()).then(setProjects);
  //   fetch("/api/images/count").then(res => res.json()).then(data => setImageCount(data.count));
  //   fetch("/api/tasks").then(res => res.json()).then(setTasks);
  // }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchData() {
      try {
        const [projectsRes, imagesRes, tasksRes] = await Promise.all([
          fetch("/api/design-project"),
          fetch("/api/images/count"),
          fetch("/api/tasks")
        ]);

        const [projectsData, imagesData, tasksData] = await Promise.all([
          projectsRes.json(),
          imagesRes.json(),
          tasksRes.json()
        ]);

        setProjects(projectsData);
        setImageCount(imagesData.count);
        setTasks(tasksData);
      } catch (err) {
        toast.error("Error fetching dashboard data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const chartData = [
    { day: "Mon", projects: 4 },
    { day: "Tue", projects: 6 },
    { day: "Wed", projects: 2 },
    { day: "Thu", projects: 8 },
    { day: "Fri", projects: 5 },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">📊 Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, let's crush today's tasks!</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-3 bg-yellow-400 rounded-full shadow hover:scale-105 transition">
            <Bell className="w-6 h-6 text-white" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
          <ConfirmAlert show={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} title="Logout?" message="Are you sure you want to logout?" confirmText="Logout" cancelText="Cancel" theme="logout" />
        </div>
      </div>

      {/* KPI Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {isLoading ? (
          <>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white shadow rounded-xl p-6 border animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-4 w-1/3"></div>
                <div className="h-10 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="bg-white shadow rounded-xl p-6 border hover:shadow-lg transition">
              <h4 className="text-gray-500 mb-1">Total Projects</h4>
              <CountUp end={projects.length} duration={1.5} separator="," className="text-4xl font-bold text-blue-700" />
            </div>

            <div className="bg-white shadow rounded-xl p-6 border hover:shadow-lg transition">
              <h4 className="text-gray-500 mb-1">Uploaded Images</h4>
              <CountUp end={imageCount} duration={1.5} separator="," className="text-4xl font-bold text-green-600" />
            </div>

            <div className="bg-white shadow rounded-xl p-6 border hover:shadow-lg transition">
              <h4 className="text-gray-500 mb-1">Pending Tasks</h4>
              <CountUp end={tasks.length} duration={1.5} separator="," className="text-4xl font-bold text-purple-600" />
            </div>
          </>
        )}
      </motion.div>


      {/* Chart Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="projects" stroke="#2563EB" fillOpacity={1} fill="url(#colorArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Recent Projects</h3>
          <div className="grid grid-cols-2 gap-4">
            {projects.slice(0, 4).map((project) => (
              <Link key={project._id} href={`/products/${project.slug}/`}>
                <div className="rounded-lg overflow-hidden border shadow hover:shadow-lg transition">
                  <Image
                    src={project.frontimg || "/default-image.jpg"}
                    alt={project.frontimgalt}
                    width={300}
                    height={200}
                    className="object-cover w-full h-[140px]"
                  />
                  <div className="p-2 text-center font-semibold text-gray-700">{project.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Upcoming Tasks</h3>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task._id} className="flex justify-between items-center">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-400">Due: {format(parseISO(task.dueDate), "MMM d")}</div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Task Scheduling */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-6">Manage Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaskForm />
          <CalendarView />
        </div>
      </motion.div>

      <Toaster position="top-right" />
    </div>
  );
}
