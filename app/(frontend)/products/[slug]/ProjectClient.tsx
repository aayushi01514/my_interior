"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface Variation {
  variationtitle: string;
  price: number;
  image: string;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  frontimg: string;
  style: string;
  location: string;
  budget: number;
  variations: Variation[];
}

export default function ProjectClient({ project }: { project: Project }) {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [compare, setCompare] = useState<Set<number>>(new Set());
  const [quickView, setQuickView] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://yourdomain.com/products/${project.slug}`);
    toast.success("Project link copied!");
  };

  const toggleWishlist = (index: number) => {
    const newSet = new Set(wishlist);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    setWishlist(newSet);
  };

  const toggleCompare = (index: number) => {
    const newSet = new Set(compare);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    setCompare(newSet);
  };

  const styleTag = `#${project.style}`;
  const budgetTag = project.budget <= 150000 ? "#BudgetFriendly" : "#PremiumStyle";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-2 text-center"
      >
        {project.title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-4 text-center text-gray-700"
      >
        {project.description}
      </motion.p>

      <div className="text-center space-y-1 mb-10">
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{styleTag}</span>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">{budgetTag}</span>
        </div>
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Total Budget:</strong> ₹{project.budget.toLocaleString()}</p>
        <button
          onClick={handleCopy}
          className="mt-2 px-4 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded hover:bg-gray-200 transition"
        >
          📤 Share This Project
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center">Explore Our Custom Interior Packages</h2>

      <div className="text-center mb-6">
        <button className="px-6 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          🔍 Compare Selected Packages ({compare.size})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {project.variations.map((variant, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative bg-gradient-to-tr from-gray-50 to-white border border-gray-200 shadow-lg rounded-3xl p-6 group"
            onMouseEnter={() => setQuickView(index)}
            onMouseLeave={() => setQuickView(null)}
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => toggleWishlist(index)}
                className={`text-lg ${wishlist.has(index) ? "text-red-500" : "text-gray-400"}`}
              >
                ❤️
              </button>
              <button
                onClick={() => toggleCompare(index)}
                className={`text-sm px-2 py-1 rounded border ${compare.has(index) ? "bg-blue-100 border-blue-500" : "border-gray-300"}`}
              >
                Compare
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={variant.image}
                alt={variant.variationtitle}
                width={500}
                height={400}
                className="object-cover w-full h-[300px] transition-transform duration-700 group-hover:scale-110 rounded-xl"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white w-full py-2 px-4 text-sm font-medium">
                {variant.variationtitle} Package
              </div>
              {quickView === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center text-sm px-4">
                  Quick View: Get a glimpse of {variant.variationtitle} design aesthetics.
                </div>
              )}
            </div>
            <p className="mt-4 text-xl font-semibold text-gray-800">₹{variant.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-4">Perfect for {variant.variationtitle.toLowerCase()} interiors</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>🚚 Free Consultation</span>
              <span>📦 Customizable</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
