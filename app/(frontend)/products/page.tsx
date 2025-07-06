// "use client";
// import React, { ReactNode, useEffect, useState } from "react";
// import Link from "next/link";
// import CommonHeader from "../../components/CommonHeader";
// import HeroSection from "../../components/HeroSection";
// import LoaderSpinner from "@/app/components/ui/LoaderSpinner";

// interface Project {
//   frontimgalt: string;
//   frontimg: ReactNode;
//   _id: string;
//   title: string;
//   slug: string;
//   style: string;
//   budget: number;
// }

// const Page = () => {
//   const [loading, setLoading] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     fetch("/api/design-project")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setProjects(data);
//         setLoading(false); // ✅ END LOADING on success
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setLoading(false); // ✅ END LOADING even on error
//       });
//   }, []);

//   return (
//     <>
//       <CommonHeader
//         title="READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?"
//         imgsrc="/02.jpg"
//       />

//       <div className="container px-4 mx-auto">
//         <div className="flex flex-col items-center justify-center mt-20 mb-20">
//           <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
//             Our Products
//           </h1>
//           <p className="text-base md:text-lg text-center mb-10 max-w-3xl">
//             Check out how your dream home can look like. Get inspiration from
//             Interia's vast design catalog spanning across modular kitchens,
//             living rooms, bedrooms, modular wardrobes and more...
//           </p>
//           {/* Responsive Grid */}
//           {loading ? (
//             <LoaderSpinner />
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
//               {projects.map((product, index) => (
//                 <div
//                   key={index}
//                   className="w-full max-w-[400px] bg-white text-center shadow-xl rounded-xl hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link href={`/products/${product.slug}/`}>
//                     <img
//                       src={typeof product.frontimg === "string" ? product.frontimg : ""}
//                       alt={product.frontimgalt}
//                       className="object-cover rounded-t-xl w-full h-[250px]"
//                     />
//                     <h2 className="text-xl font-bold p-3">{product.title}</h2>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* Example Button Hover Box */}
//           {/* <div className="mt-10">
//             <div className="outer">
//               <div className="buttonhover">
//                 <div className="text">button</div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         <HeroSection
//           title="Ensuring a safe experience from design to installation"
//           description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
//           linkname="Know More"
//           linksrc="/"
//           imgsrc="/02.jpg"
//           imgalt="abc"
//         />
//       </div>
//     </>
//   );
// };

// export default Page;
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import CommonHeader from "../../components/CommonHeader";
import HeroSection from "../../components/HeroSection";
import LoaderSpinner from "@/app/components/ui/LoaderSpinner";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

interface Project {
  frontimgalt: string;
  frontimg: ReactNode;
  _id: string;
  title: string;
  slug: string;
  style: string;
  budget: number;
}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const availableStyles = ["Modern", "Classic", "Minimal"];

  useEffect(() => {
    fetch("/api/design-project")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((p) => {
  const normalizedStyle = p.style?.toLowerCase().trim();
  const matchesFilter =
    filter === "all" || normalizedStyle === filter.toLowerCase();
  const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
  return matchesFilter && matchesSearch;
});


  return (
    <>
      <CommonHeader
        title="READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?"
        imgsrc="/02.jpg"
      />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center mt-20 mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-2"
          >
            Explore Our Interior Design Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base md:text-lg text-center mb-10 max-w-3xl"
          >
            Discover uniquely styled living spaces tailored for every lifestyle. Browse modular kitchens, cozy bedrooms, and luxurious wardrobes.
          </motion.p>

          {/* Search Bar */}
          <div className="mb-6 w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search by project title..."
              className="w-full py-2 px-4 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full border ${filter === "all" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              All Styles
            </button>
            {availableStyles.map((style) => (
              <button
                key={style}
                onClick={() => setFilter(style)}
                className={`px-4 py-2 rounded-full border ${filter === style ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {style}
              </button>
            ))}
          </div>

          {loading ? (
            <LoaderSpinner />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center"
            >
              {filteredProjects.slice(0, visibleCount).map((product, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  className="group w-full max-w-[400px] bg-white text-center shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                >
                  <Link href={`/products/${product.slug}/`}>
                    <img
                      src={typeof product.frontimg === "string" ? product.frontimg : ""}
                      alt={product.frontimgalt}
                      className="object-cover rounded-t-xl w-full h-[250px] transition-transform group-hover:scale-110"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
                      <p className="text-sm text-gray-600">Style: {product.style}</p>
                      <p className="text-sm text-gray-600">Budget: ₹{product.budget.toLocaleString()}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-medium">View Details</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {!loading && visibleCount < filteredProjects.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="mt-8 px-6 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition"
            >
              Load More
            </button>
          )}
        </div>

        <HeroSection
          title="Ensuring a safe experience from design to installation"
          description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
          linkname="Know More"
          linksrc="/"
          imgsrc="/02.jpg"
          imgalt="abc"
        />
      </div>
    </>
  );
};

export default Page;
