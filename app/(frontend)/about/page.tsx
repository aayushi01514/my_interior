'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CommonHeader from '@/app/components/CommonHeader';
import { User } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <CommonHeader
        title="Who We Are: The Creative Minds of 8R Studio"
        imgsrc="/images/aboutus/03.webp"
      />

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 md:px-10 py-16 text-center md:text-left"
      >
        <h2 className="text-4xl leading-8 text-gray-700 max-w-4xl mx-auto font-bold mb-6 text-gray-900">Our Story</h2>
        <p className="text-lg leading-8 text-gray-700 max-w-4xl mx-auto">
          Interia began with a simple vision — to transform   houses into homes with style, functionality, and warmth.
          With over a decade of experience in interior design, we’ve completed 1000+ dream spaces,
          blending modern aesthetics with real-life comfort.
        </p>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-100 py-16 px-4 md:px-10"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What We Value</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
            {[
              {
                title: 'Creativity',
                desc: 'Designs that reflect personality, style, and uniqueness in every corner.',
              },
              {
                title: 'Quality',
                desc: 'We use only the best materials and trusted craftsmanship for long-lasting results.',
              },
              {
                title: 'Customer-Centric',
                desc: 'Your vision is our blueprint. We listen, plan, and execute accordingly.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold mb-3 text-green-700">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-16 px-4 md:px-10 container mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[
            {
              name: 'Priya Sharma',
              role: 'Lead Interior Designer',
              img: '/02.jpg',
            },
            {
              name: 'Rahul Mehta',
              role: 'Project Manager',
              icon: 'User',
            },
            {
              name: 'Aditi Verma',
              role: 'Creative Head',
              img: '/01.jpg',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col items-center space-y-4"
            >
              <div>
                <User className="h-24 w-24 rounded-full text-gray-600 bg-gray-200 p-4" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>


              {/* <User className="object-cover h-24 w-24 rounded-full text-gray-600 bg-gray-200 p-4" />

              <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p> */}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-green-600 text-white py-14 px-4 text-center"
      >
        <h3 className="text-3xl font-bold mb-4">Let’s Design Your Dream Space</h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Collaborate with our expert team to turn your ideas into reality. Reach out today to schedule a consultation.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Get in Touch
        </a>
      </motion.section> */}
    </div>
  );
};

export default AboutUs;
