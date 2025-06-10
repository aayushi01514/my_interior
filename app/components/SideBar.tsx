"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { ImGift } from "react-icons/im";
import { div } from "motion/react-client";

export function SidebarDemo() {

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden mt-0",
        "h-screen w-full" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-10 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Ayushi Patel",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const dash = [
    { id: 1, title: 'Total Projects', icon: <ImGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { id: 2, title: 'Active Client', icon: <ImGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { id: 3, title: 'Design Uploaded', icon: <ImGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { id: 4, title: 'Tasks', icon: <ImGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },

  ]
  return (
    <>

      <div className="flex flex-1">

        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <h1 className="text-5xl mb-5">Dashboard Overview </h1>
          <div className="flex gap-2 h-40 overflow-auto scroll-m-0 mb-10">
            {dash.map((i) => (
              <div
                key={i.id}
                className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 text-center flex items-center justify-center"
              >
                {/* <ImGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> */}
                <h1 className="text-2xl font-bold">{i.title}</h1>
              </div>
            ))}
          </div>
          <div className="flex gap-6 flex-1">
            {/* {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 "
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptas pariatur repellat, laboriosam sint corrupti minus aliquam nam voluptates velit quidem sunt nihil est nobis aliquid officia maiores voluptate hic!
            </div>
          ))} */}
            <div key={"second-array1"} className="h-full w-full rounded-lg   dark:bg-neutral-800 ">
              <h2 className="text-2xl font-bold mb-3">Project Timeline</h2>
              <div className="bg-gray-100">
              </div>
            </div>
            <div key={"second-array2"} className="h-full w-full rounded-lg   dark:bg-neutral-800 ">
              <h2 className="text-2xl font-bold mb-3">Recent Uploads</h2>
              <div className="grid grid-cols-2 gap-5">
                {[...new Array(4)].map((i) => (
                  <div key={"second-array" + i} className=" rounded-lg  bg-gray-100 dark:bg-neutral-800 h-56">
                    <Image
                      src="/02.jpg"
                      alt=""
                      width={300}
                      height={100}
                      className="rounded-lg text-center h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
