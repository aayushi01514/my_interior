import Image from "next/image";
import { FloatingNav } from "./components/FloatingNav";
import { BoxesCore } from "./components/ui/BackgroundBox"
import { navItems } from "@/data"
import { BackgroundBoxesDemo } from "./components/Back"
import { LampDemo } from "./components/Welcome"
import { HeroParallaxDemo } from "./components/Grid"
import Footer from "./components/Footer";
import { SidebarDemo } from "./components/SideBar"
import { StickyScrollRevealDemo } from "./components/StickyScroll"
import HeroSection from "./components/HeroSection";
export default function Home() {
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
