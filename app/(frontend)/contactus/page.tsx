// "use client";
// import React, { useState } from 'react'
// import CommonHeader from '@/app/components/CommonHeader'
// import VisitProducts from '@/app/components/VisitProducts'
// import HeroSection from '@/app/components/HeroSection'
// import toast, { Toaster } from 'react-hot-toast';

// const page = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     mobileNo: "",
//     message: ""
//   });
//   const [status, setStatus] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('');

//     const res = await fetch('/api/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     setStatus(data.message || data.error);
//     if (res.ok) setFormData({ name: '', email: '', address: '', mobileNo: '', message: '' });
//     toast.success('Project saved!');

//   };

//   return (
//     <>
//       <CommonHeader
//         title="Start Your Interior Design Journey With 8R Studio Today!"
//         imgsrc="01.jpg"
//       />

//       <Toaster />

//       <div className="container mx-auto px-4 py-10">
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
//             Interia's Experience Centres
//           </h1>
//           <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed">
//             Experience the comfort and aesthetics of a #InteriaHome before you get yours!
//             With looks for every room, furniture for each corner, material samples on display,
//             and a dedicated interior designer to take you through it, your quest for the best
//             home interiors ends here. And it is ready and safe for your visit.
//           </p>
//         </div>

//         <VisitProducts
//           lefttitle="Looks for each room"
//           leftdescription="Take a walkthrough of beautifully designed bedrooms, living rooms, modular kitchens and everything in between."
//           leftimgalt="room look"
//           leftimgsrc="/01.jpg"
//           righttitle="Experience our products"
//           rightdescription="See our wide range of modular products and furniture to make the best choice before you make a purchase."
//           rightimgsrc="/01.jpg"
//           rightimgalt="products"
//         />
//         <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//             {/* Left Side Content */}
//             <div>
//               <h2 className="text-4xl font-bold mb-4 text-gray-800">Let's Discuss Your Dream Space</h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Whether you have a clear vision or need inspiration, we're here to help.
//                 Fill out the form and our design experts will get in touch with you shortly.
//               </p>
//             </div>

//             {/* Right Side Form */}
//             <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h3>
//               <form onSubmit={handleSubmit} className="space-y-4" method='POST'>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   required
//                   className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   required
//                   className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Address"
//                   className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 />
//                 <input
//                   type="number"
//                   name="mobileNo"
//                   value={formData.mobileNo}
//                   onChange={handleChange}
//                   placeholder="Phone Number"
//                   className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 />

//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   rows={5}
//                   required
//                   className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900 transition"
//                 >
//                   Send Inquiry
//                 </button>
//                 {status && <p className="text-sm mt-2 text-center">{status}</p>}
//               </form>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   )
// }

// export default page
"use client";
import React, { useState } from "react";
import CommonHeader from "@/app/components/CommonHeader";
import VisitProducts from "@/app/components/VisitProducts";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setStatus(data.message || data.error);
    if (res.ok) {
      setFormData({ name: "", email: "", address: "", mobileNo: "", message: "" });
      toast.success("Thank you! We'll get back to you.");
    }
  };

  return (
    <>
      <CommonHeader
        title="Start Your Interior Design Journey With 8R Studio Today!"
        imgsrc="/images/contactus/02.webp"
      />
      <Toaster />

      {/* Experience Section */}
      <section className="container mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Interia's Experience Centres
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore rooms, try out furniture, feel the textures, and get design guidance at our curated experience centers.
            Your perfect home begins with the right inspiration—and we’ve got it ready for you.
          </p>
        </motion.div>

        <VisitProducts
          lefttitle="Looks for each room"
          leftdescription="Take a walkthrough of beautifully designed bedrooms, living rooms, modular kitchens and everything in between."
          leftimgalt="room look"
          leftimgsrc="/images/contactus/03.webp"
          righttitle="Experience our products"
          rightdescription="See our wide range of modular products and furniture to make the best choice before you make a purchase."
          rightimgsrc="/images/contactus/01.webp"
          rightimgalt="products"
        />
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Let's Discuss Your Dream Space</h2>
            <p className="text-lg text-gray-700">
              Whether you have a clear vision or need help visualizing your dream space,
              our expert designers are ready to assist you. Fill out the form and we’ll contact you shortly.
            </p>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Inquiry
              </button>
              {status && <p className="text-sm mt-2 text-center text-green-700">{status}</p>}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
