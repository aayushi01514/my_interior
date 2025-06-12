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
import AlertBox from "@/app/components/AlertBox";
import ConfirmAlert from "@/app/components/ConfirmAlert";

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
  const [showLogout, setShowLogout] = useState(false);

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
          // onClick={handleLogout}
          onClick={() => setShowLogout(true)}

          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
        <ConfirmAlert
          show={showLogout}
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
          title="Logout?"
          message="You will be logged out of the admin panel."
          confirmText="Logout"
          cancelText="Stay"
          theme="logout"
        />

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
      <div>
        <h1 className="text-2xl">Welcome to your dashboard</h1>
        {/* <AlertBox message="Project created successfully!" type="success" /> */}
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
