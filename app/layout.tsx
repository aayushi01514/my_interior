import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import FloatingNav from "./components/FloatingNav";
import { LampDemo } from "./components/Welcome";
import { navItems } from "@/data";
import Footer from "./components/Footer";
import './globals.css';
import NavWrapper from "./components/NavWrapper";
import FooterWrapper from "./components/FooterWrapper";
import TopProgressBar from "./components/TopProgressBar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "8R Studio",
  description: "3D Visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopProgressBar />
        <NavWrapper />
        <main>{children}</main>
        <Toaster position="top-center" />

        <FooterWrapper />
      </body>
    </html>
  );
}
