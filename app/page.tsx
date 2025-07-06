"use client";
import Image from "next/image";
import FloatingNav from "./components/FloatingNav";
import { BoxesCore } from "./components/ui/BackgroundBox"
import { navItems } from "@/data"
import { BackgroundBoxesDemo } from "./components/Back"
import { LampDemo } from "./components/Welcome"
import { HeroParallaxDemo } from "./components/Grid"
import Footer from "./components/Footer";
import { SidebarDemo } from "./components/SideBar"
import { StickyScrollRevealDemo } from "./components/StickyScroll"
import HeroSection from "./components/HeroSection";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error("Please log in first");
      router.push("/login/");
    }
  }, [router]);

  if (!user) return null;
  return (
    <>
      {/* <SidebarDemo  /> */}
      {/* <BackgroundBoxesDemo /> */}
      {/* <FloatingNav navItems={navItems} /> */}
      <LampDemo />
      <HeroParallaxDemo />
      <div className="container">
        <HeroSection
          title={"Ensuring a safe experience from design to installation"}
          description={"We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."}
          linkname={"Know More"}
          linksrc={"/contactus/"}
          imgsrc={"/P1.jpg"}
          imgalt={"abc"}
        />
      </div>
      {/* <StickyScrollRevealDemo/> */}
    </>
  );
}
