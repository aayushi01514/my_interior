// app/products/[slug]/page.tsx

import CommonHeader from '@/app/components/CommonHeader'
import { products } from '@/data/index'
import { notFound } from 'next/navigation'
import product from '@/data/product.json'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)

  if (!product) return notFound()

  return (
    <div>
      <CommonHeader
        title="READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?"
        imgsrc="02.jpg"
      />
      <div className='container mx-auto py-10 px-4 text-center'>
        <p className='text-center font-bold text-2xl'>You never get a second chance to make a first impression. So, your home's first room, the living room, should be spectacular! Browse through our wide range of living room designs to steal some inspiration...</p>
        <h1 className=''>{product.name}</h1>
        <div className='grid grid-cols-3 lg:grid-cols-3 gap-20'>
          <div className='mb-8 text-center items-center shadow-xl rounded-xl px-0 hover:scale-105 transition-transform duration-300 ' id='contact'>
            <img className="object-cover rounded-t-xl"
              width={400} height={300}
              alt={product.imgalt}
              src={product.img} />
            <h2 className='text-2xl font-bold p-3'>{product.name}</h2>
          </div>
          </div>
      </div>
    </div>
  )
}
