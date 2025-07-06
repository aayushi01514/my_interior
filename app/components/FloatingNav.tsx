// "use client";
// import React, { useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import Link from "next/link";
// import { cn } from "@/utils/cn";
// import { JSX } from "react/jsx-runtime";

// export const FloatingNav = ({
//   navItems,
//   className,
// }: {
//   navItems: {
//     name: string;
//     link: string;
//     icon?: JSX.Element;
//   }[];
//   className?: string;
// }) => {
//   const { scrollYProgress } = useScroll();

//   // set true for the initial state so that nav bar is visible in the hero section
//   const [visible, setVisible] = useState(true);

//   useMotionValueEvent(scrollYProgress, "change", (current) => {
//     // Check if current is not undefined and is a number
//     if (typeof current === "number") {
//       let direction = current! - scrollYProgress.getPrevious()!;

//       if (scrollYProgress.get() < 0.05) {
//         // also set true for the initial state
//         setVisible(true);
//       } else {
//         if (direction < 0) {
//           setVisible(true);
//         } else {
//           setVisible(false);
//         }
//       }
//     }
//   });

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         initial={{
//           opacity: 1,
//           y: -100,
//         }}
//         animate={{
//           y: visible ? 0 : -100,
//           opacity: visible ? 1 : 0,
//         }}
//         transition={{
//           duration: 0.2,
//         }}
//         className={cn(
//           // change rounded-full to rounded-lg
//           // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
//           // change  pr-2 pl-8 py-2 to px-10 py-5
//           "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
//           className
//         )}
//         style={{
//           backdropFilter: "blur(16px) saturate(180%)",
//           backgroundColor: "rgba(17, 25, 40, 0.75)",
//           borderRadius: "12px",
//           border: "1px solid rgba(255, 255, 255, 0.125)",
//         }}
//       >
//         {navItems.map((navItem: any, idx: number) => (
//           <Link
//             key={`link=${idx}`}
//             href={navItem.link}
//             className={cn(
//               "relative items-center  flex space-x-1 text-white-200 dark:hover:text-white-200 hover:text-white-200"
//             )}
//           >
//             <span className="block sm:hidden">{navItem.icon}</span>
//             {/* add !cursor-pointer */}
//             {/* remove hidden sm:block for the mobile responsive */}
//             <span className=" text-sm !cursor-pointer">{navItem.name}</span>
//           </Link>
//         ))}
//         {/* remove this login btn */}
//         {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
//           <span>Login</span>
//           <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
//         </button> */}
//       </motion.div>
//     </AnimatePresence>
//   );
// };
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";

const navLinks = [
  { name: "HOME", link: "/" },
  { name: "PORTFOLIO", link: "/" },
  { name: "CONTACT US", link: "/contactus/" },
  { name: "DESIGN IDEAS", link: "/products/" }, // new design ideas section
  { name: "ABOUT US", link: "/about/" }, // new about section
  { name: "BLOG", link: "/blog/" }, // new blog section
  { name: "REGISTER", link: "/register/" }, // ✅ added register
  { name: "LOGIN", link: "/login/" },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-5 inset-x-4 z-[1000] flex items-center justify-between rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-md px-6 py-4 md:px-10 md:py-5 max-w-[95%] md:max-w-[85%] lg:max-w-[70%] mx-auto"
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
      }}
    >
      {/* Brand / Logo */}
      <Link href="/" className="text-white text-2xl font-bold tracking-wide">
        8R STUDIO
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            // className="text-white text-base hover:text-gray-200 transition-colors duration-200"
            className={cn(
              "relative items-center  flex space-x-1 text-white-200 dark:hover:text-white-200 hover:text-white-200"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button
        className="flex md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full bg-black/70 backdrop-blur-md flex flex-col items-center space-y-6 py-6 rounded-b-xl md:hidden"
            style={{ backgroundColor: "rgba(17, 25, 40, 0.75)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.125)" }}
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
