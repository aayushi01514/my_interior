'use client'
import React from 'react';
import Image from 'next/image';
import CommonHeader from '@/app/components/CommonHeader';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
       <CommonHeader
        title="Who We Are: The Creative Minds of 8R Studio"
        imgsrc="01.jpg"
      />
      {/* Story Section */}
      <section className="container mx-auto px-6 py-12 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-lg leading-8">
          Interia began with a simple vision — to transform houses into homes with style, functionality, and warmth. 
          With over a decade of experience in interior design, we’ve completed 1000+ dream spaces, combining modern design with practicality.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">What We Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Creativity</h3>
              <p>Designs that reflect personality, style, and uniqueness in every corner.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p>We use only the best materials and trusted craftsmanship for long-lasting results.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
              <p>Your vision is our blueprint. We listen, plan, and execute accordingly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 px-6 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div>
            <Image
              src="/02.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
            <h4 className="text-lg font-semibold mt-4">Priya Sharma</h4>
            <p className="text-sm text-gray-600">Lead Interior Designer</p>
          </div>
          <div>
            <Image
              src="/01.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
            <h4 className="text-lg font-semibold mt-4">Rahul Mehta</h4>
            <p className="text-sm text-gray-600">Project Manager</p>
          </div>
          <div>
            <Image
              src="/01.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
            <h4 className="text-lg font-semibold mt-4">Aditi Verma</h4>
            <p className="text-sm text-gray-600">Creative Head</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
