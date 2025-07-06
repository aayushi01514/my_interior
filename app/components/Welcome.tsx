"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";

export function LampDemo() {
    return (
        <section className="w-full relative overflow-hidden">
            {/* Mobile-specific hero */}
            <div className="
            block sm:hidden 
            w-full max-h-[95vh] flex flex-col items-center justify-center text-center 
            bg-gradient-to-br from-[#0b0f1c] via-[#1c1f2b] to-[#0b0f1c]">
                <LampContainer>
                    <motion.div
                        initial={{ opacity: 0.5, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                        className="text-center max-w-full"
                    >
                        <h1 className="
                    bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent 
                    text-5xl md:text-6xl lg:text-7xl 
                    font-bold tracking-tight mb-6 leading-tight"> 8R <br /> STUDIO </h1>

                        <p className="
              text-white/90 max-w-[95%] sm:max-w-xl mx-auto 
              text-lg md:text-xl lg:text-2xl 
              tracking-wide mb-8
            ">
                            Hi! I&apos;m Ayushi, a Next.js Developer based in Croatia.
                        </p>
                    </motion.div>
                </LampContainer>
            </div>

            {/* Original fullscreen hero (tablet & up) */}
            <section className="hidden sm:block w-full h-screen flex items-center justify-center relative overflow-hidden">
                <LampContainer>
                    <motion.div
                        initial={{ opacity: 0.5, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                        className="text-center max-w-full"
                    >

                        <h1 className="
              bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent 
              text-5xl md:text-6xl lg:text-7xl 
              font-bold tracking-tight  leading-tight
            ">
                            <span className="text-black-500 ">8R</span><br /> STUDIO
                        </h1>

                        <p className="
              text-white/90 max-w-[95%] sm:max-w-xl mx-auto 
              text-lg md:text-xl lg:text-2xl 
              tracking-wide mb-15
            ">
                            Hi! I&apos;m Ayushi, a Next.js Developer based in Croatia.
                        </p>
                    </motion.div>
                </LampContainer>
            </section>
        </section>
    );
}
