import React from 'react'
import Image from 'next/image'
import { ThreeDCardDemo } from "../components/3DCard"
import HeroSectionRight from '../components/HeroSectionRight'
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect'
import HeroSection from '../components/HeroSection'
import Link from 'next/link'
import { products } from '@/data/index'
import CommonHeader from '../components/CommonHeader'
const page = ({}) => {
  return (
    <>
      {/* <ThreeDCardDemo/> */}
      <CommonHeader
        title='READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?'
        imgsrc='02.jpg'
      />
      <div className='container'>
        <div className='flex flex-col  items-center justify-center mt-20 mb-20'>
          <h1 className='text-4xl font-bold text-center mb-2'>Our Products</h1>
          {/* <p className='text-lg text-center mb-10'>We offer a wide range of products to meet your needs.</p> */}
          <p className='text-lg text-center  mb-10'>Check out how your dream home can look like. Get inspiration from Interia's vast design catalog spanning across modular kitchens, living rooms, bedrooms, modular wardrobes and more...</p>
          <div className='grid grid-cols-3 lg:grid-cols-3 gap-20'>
            {
              products.map((product, index) => (
                <div key={index} className='mb-8 text-center items-center shadow-xl rounded-xl px-0 hover:scale-105 transition-transform duration-300 ' id='contact'>
                  <Link href={`/products/${product.slug}`}>
                    <Image className="object-cover rounded-t-xl"
                      width={400} height={300}
                      alt={product.imgalt}
                      src={product.img} />

                    <h2 className='text-2xl font-bold p-3'>{product.name}</h2>
                  </Link>
                </div>

              ))
            }
          </div>
          <div className="outer">
            <div className="buttonhover">
              <div className="text">button</div>
            </div>
          </div>
        </div>
        <HeroSection
          title='Ensuring a safe experience from design to installation'
          description="We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."
          linkname='Know More'
          linksrc='/'
          imgsrc='/02.jpg'
          imgalt='abc'
        />
      </div>
    </>
  )
}

export default page




// import Link from 'next/link'

// // Dummy product list – replace with real data fetching
// const products = [
//   { slug: 'laptop', name: 'Laptop' },
//   { slug: 'phone', name: 'Phone' },
//   { slug: 'headphones', name: 'Headphones' },
// ]

// export default function ProductListPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">All Products</h1>
//       <ul className="space-y-2">
//         {products.map((product) => (
//           <li key={product.slug}>
//             <Link
//               href={`/products/${product.slug}`}
//               className="text-blue-600 hover:underline"
//             >
//               {product.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
