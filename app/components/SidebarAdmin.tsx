"use client";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* Mobile Top Navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900 text-white flex items-center justify-between p-4">
                <div className="text-xl font-bold">WelCome Admin</div>
                <button onClick={() => setMobileSidebarOpen(true)} className="text-2xl">
                    ☰
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    onClick={() => setMobileSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`p-5 fixed z-50 top-0 left-0 h-full bg-gray-900 text-white  w-64 transition-transform duration-300 md:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-8">
                    <div className="text-xl font-bold">DesignAdmin</div>
                    <button onClick={() => setMobileSidebarOpen(false)} className="text-2xl">
                        ✕
                    </button>
                </div>
                <nav className="space-y-6">
                    <a href="/admin/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>📊</span>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/projects/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>📁</span>
                        <span>Projects</span>
                    </a>
                    <a href="/admin/clients/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>👥</span>
                        <span>Clients</span>
                    </a>
                    <a href="/admin/schedule/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>🗓️</span>
                        <span>Schedule</span>
                    </a>
                </nav>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="group relative hidden md:block w-16 hover:w-64 transition-all duration-300 bg-gray-900 text-white p-4 overflow-hidden">
                <div className="text-xl font-bold mb-10 hidden group-hover:block">
                    Welcome Admin
                </div>

                <nav className="space-y-6">
                    <a href="/admin/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>📊</span>
                        <span className="hidden group-hover:inline ">Dashboard</span>
                    </a>
                    <Link href="/admin/projects/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>📁</span>
                        <span className="hidden group-hover:inline ">Projects</span>
                    </Link>
                    <a href="/admin/clients/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>👥</span>
                        <span className="hidden group-hover:inline">Clients</span>
                    </a>
                    <a href="/admin/schedule/" className="flex items-center gap-4 hover:text-gray-300 text-xl font-bold">
                        <span>🗓️</span>
                        <span className="hidden group-hover:inline">Schedule</span>
                    </a>
                </nav>
            </aside>
        
        </div>
    );
}