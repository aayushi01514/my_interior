"use client";
import React from "react";
import { HeroParallax } from "../components/ui/HeroParallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Moonbeam",
    link: "#",
    thumbnail:
      "/0107.jpg",
  },
  {
    title: "Cursor",
    link: "#",
    thumbnail:
      "/0102.webp",
  },
  {
    title: "Rogue",
    link: "#",
    thumbnail:"/0103.webp",
  },

  {
    title: "Editorially",
    link: "#",
    thumbnail:
      "/0104.webp",
  },
  {
    title: "Editrix AI",
    link: "#",
    thumbnail:
      "/0105.webp",
  },
  {
    title: "Pixel Perfect",
    link: "#",
    thumbnail:
      "/0106.webp",
  },

  {
    title: "Living Room",
    link: "/products/",
    thumbnail:
      "/02.webp",
  },
  {
    title: "Modular Kitchen",
    link: "/products/",
    thumbnail:
      "/0102.webp",
  },
  {
    title: "Bedroom",
    link: "/products/",
    thumbnail:
      "/0103.webp",
  },
  {
    title: "Office Space",
    link: "/products/",
    thumbnail:
      "/images/contactus/04.webp",
  },
  {
    title: "Renderwork",
    link: "/products/",
    thumbnail:
      "/images/contactus/01.webp",
  },

  {
    title: "Creme Digital",
    link: "/products/",
    thumbnail:
      "/images/contactus/02.webp",
  },
  {
    title: "Golden Bells Academy",
    link: "/products/",
    thumbnail:
      "/images/contactus/03.webp",
  },
  {
    title: "Invoker Labs",
    link: "/products/",
    thumbnail:
      "/04.webp",
  },
  {
    title: "E Free Invoice",
    link: "/products/",
    thumbnail:
      "/03.webp",
  },
];
