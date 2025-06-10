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
    title: "Algochurn",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
