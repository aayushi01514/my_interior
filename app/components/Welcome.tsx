"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";
import logo from "../../public/8R PNG.png"
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
export function LampDemo() {
    return (
        <div className="w-full">
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    <span className="mt-32"> 8R <br /> STUDIO </span>
                    {/* <TextGenerateEffect
                        words="Transforming Concepts into Seamless User Experiences"
                        className="text-center  text-white text-[40px] md:text-5xl lg:text-6xl"
                    /> */}

                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                        Hi! I&apos;m Ayushi, a Next.js Developer based in Croatia.
                    </p> 

                    {/* <Image
                    src={logo}
                    alt="abc"
                    width={500}
                    height={500}></Image> */}
                </motion.h1>
            </LampContainer>
        </div>
    );
}
