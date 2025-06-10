"use client";

import CommonHeader from "@/app/components/CommonHeader";
import HeroSection from "@/app/components/HeroSection";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  title: string;
}

// Separate client component for the form
function BookingForm() {
  const searchParams = useSearchParams();
  const [defaultTitle, setDefaultTitle] = useState("");

  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    title: "",
  });

  // Get title from URL search param on mount
  useEffect(() => {
    const titleFromURL = searchParams.get("title") || "";
    setDefaultTitle(titleFromURL);
    setForm((prev) => ({ ...prev, title: titleFromURL }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        alert("Booking submitted successfully!");
        // Optionally reset form
        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          message: "",
          title: defaultTitle,
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>

      {/* Selected Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Selected Package</label>
        <input
          type="text"
          name="title"
          value={form.title}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
      </div>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full p-3 mb-4 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full p-3 mb-4 border rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Your Phone"
        className="w-full p-3 mb-4 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Additional Message"
        className="w-full p-3 mb-4 border rounded"
        rows={4}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        Submit Booking
      </button>
    </form>
  );
}

// Main page component
export default function BookingPage() {
  return (
    <>
      <CommonHeader
        title="READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?"
        imgsrc="/02.jpg"
      />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
      <div className="container flex flex-col mt-20">
        <div className="text-left">
          <h2 className="font-bold text-4xl">Superior interiors</h2>
          <p className="text-lg py-3">With stunning designs and professional on-site services, we make dream homes come alive.</p>
        </div>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center p-5">
        <div className="w-full max-w-[400px] bg-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 overflow-hidden">
          <Link href={`/products/`}>
            <div className="relative w-full h-[550px]">
              <img
                src="/02.jpg"
                alt="abc"
                className="object-cover w-full h-full"
              />
              <h2 className="absolute bottom-0 p-2 mb-4 text-white text-4xl font-bold text-left">
                LIving
              </h2>
            </div>
          </Link>
        </div>
        <div className="w-full max-w-[400px] bg-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 overflow-hidden">
          <Link href={`/products/`}>
            <div className="relative w-full h-[550px]">
              <img
                src="/02.jpg"
                alt="abc"
                className="object-cover w-full h-full"
              />
              <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-white text-4xl font-bold">
                LIving
              </h2>
            </div>
          </Link>
        </div>
        <div className="w-full max-w-[400px] bg-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 overflow-hidden">
          <Link href={`/products/`}>
            <div className="relative w-full h-[550px]">
              <img
                src="/02.jpg"
                alt="abc"
                className="object-cover w-full h-full"
              />
              <h2 className="absolute bottom-0 p-2 mb-4 text-white text-4xl font-bold text-left">
                LIving
              </h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="container mt-20">

        <HeroSection
          title="Ensuring a safe experience from design to installation"
          description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
          linkname="Know More"
          linksrc="/"
          imgsrc="/0104.webp"
          imgalt="abc"
        />
      </div>
    </>
  );
}

// Add viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};