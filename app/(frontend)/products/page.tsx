// "use client"
// import React, { ReactNode, useEffect, useState } from 'react'
// import Image from 'next/image'
// import { ThreeDCardDemo } from "../../components/3DCard"
// import HeroSectionRight from '../../components/HeroSectionRight'
// import { TextGenerateEffect } from '../../components/ui/TextGenerateEffect'
// import HeroSection from '../../components/HeroSection'
// import Link from 'next/link'
// import { products } from '@/data/index'
// import CommonHeader from '../../components/CommonHeader'
// interface Project {
//   frontimgalt: string
//   frontimg: ReactNode
//   _id: string;
//   title: string;
//   slug: string;
//   style: string;
//   budget: number;
// }
// const page = ({ }) => {
//   const [projects, setProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     fetch('/api/design-project')
//       .then(res => res.json())
//       .then(data => setProjects(data));
//   }, []);
//   return (
//     <>
//       {/* <ThreeDCardDemo/> */}
//       <CommonHeader
//         title='READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?'
//         imgsrc='/02.jpg'
//       />
//       <div className='container'>
//         <div className='flex flex-col  items-center justify-center mt-20 mb-20'>
//           <h1 className='text-4xl font-bold text-center mb-2'>Our Products</h1>
//           <p className='text-lg text-center  mb-10'>Check out how your dream home can look like. Get inspiration from Interia's vast design catalog spanning across modular kitchens, living rooms, bedrooms, modular wardrobes and more...</p>
//           <div className='grid grid-cols-3 lg:grid-cols-3 gap-20'>
//             {
//               projects.map((product, index) => (
//                 <div 
//                 style={{maxWidth:"600px"}}
//                 key={index} className=' mb-8 text-center items-center shadow-xl rounded-xl px-0 hover:scale-105 transition-transform duration-300 ' id='contact'>
//                   <Link href={`/products/${product.slug}`}>
//                     <img className="object-cover rounded-t-xl"
//                       // width={400} height={300}
//                       style={{maxWidth:"400px" , maxHeight:"300px"}}
//                       alt={product.frontimgalt}
//                       src={typeof product.frontimg === 'string' ? product.frontimg : ''} />
//                     <h2 className='text-2xl font-bold p-3'>{product.title}</h2>
//                   </Link>
//                 </div>

//               ))
//             }
//           </div>
//           <div className="outer">
//             <div className="buttonhover">
//               <div className="text">button</div>
//             </div>
//           </div>
//         </div>
//         <HeroSection
//           title='Ensuring a safe experience from design to installation'
//           description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
//           linkname='Know More'
//           linksrc='/'
//           imgsrc='/02.jpg'
//           imgalt='abc'
//         />
//       </div>
//       {/* <div className='container'>
//         <div className='flex flex-col  items-center justify-center mt-20 mb-20'>
//           <h1 className='text-4xl font-bold text-center mb-2'>Our Products</h1>
//           <p className='text-lg text-center  mb-10'>Check out how your dream home can look like. Get inspiration from Interia's vast design catalog spanning across modular kitchens, living rooms, bedrooms, modular wardrobes and more...</p>
//           <div className='grid grid-cols-3 lg:grid-cols-3 gap-20'>
//             {
//               products.map((product, index) => (
//                 <div key={index} className='mb-8 text-center items-center shadow-xl rounded-xl px-0 hover:scale-105 transition-transform duration-300 ' id='contact'>
//                   <Link href={`/products/${product.slug}`}>
//                     <Image className="object-cover rounded-t-xl"
//                       width={400} height={300}
//                       alt={product.imgalt}
//                       src={product.img} />

//                     <h2 className='text-2xl font-bold p-3'>{product.name}</h2>
//                   </Link>
//                 </div>

//               ))
//             }
//           </div>
//           <div className="outer">
//             <div className="buttonhover">
//               <div className="text">button</div>
//             </div>
//           </div>
//         </div>
//         <HeroSection
//           title='Ensuring a safe experience from design to installation'
//           description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
//           linkname='Know More'
//           linksrc='/'
//           imgsrc='/02.jpg'
//           imgalt='abc'
//         />
//       </div> */}

//     </>
//   )
// }

// export default page



"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import CommonHeader from "../../components/CommonHeader";
import HeroSection from "../../components/HeroSection";

interface Project {
  frontimgalt: string;
  frontimg: ReactNode;
  _id: string;
  title: string;
  slug: string;
  style: string;
  budget: number;
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/design-project")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <>
      <CommonHeader
        title="READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?"
        imgsrc="/02.jpg"
      />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center mt-20 mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Our Products
          </h1>
          <p className="text-base md:text-lg text-center mb-10 max-w-3xl">
            Check out how your dream home can look like. Get inspiration from
            Interia's vast design catalog spanning across modular kitchens,
            living rooms, bedrooms, modular wardrobes and more...
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
            {projects.map((product, index) => (
              <div
                key={index}
                className="w-full max-w-[400px] bg-white text-center shadow-xl rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/products/${product.slug}`}>
                  <img
                    src={typeof product.frontimg === "string" ? product.frontimg : ""}
                    alt={product.frontimgalt}
                    className="object-cover rounded-t-xl w-full h-[250px]"
                  />
                  <h2 className="text-xl font-bold p-3">{product.title}</h2>
                </Link>
              </div>
            ))}
          </div>

          {/* Example Button Hover Box */}
          <div className="mt-10">
            <div className="outer">
              <div className="buttonhover">
                <div className="text">button</div>
              </div>
            </div>
          </div>
        </div>
        <HeroSection
          title="Ensuring a safe experience from design to installation"
          description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
          linkname="Know More"
          linksrc="/"
          imgsrc="/02.jpg"
          imgalt="abc"
        />
      </div>
    </>
  );
};

export default Page;
