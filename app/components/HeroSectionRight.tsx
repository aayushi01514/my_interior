import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
interface HeroSectionRightProps {
    title?: string;
    description?: string;
    linkname?: string;
    linksrc?: string;
    imgsrc?: string;
    imgalt?: string;
}

const HeroSectionRight: React.FC<HeroSectionRightProps> = ({ title, description, linkname, linksrc, imgsrc, imgalt }) => {
    return (
        <main>
            <section className=''>
                <div className="flex flex-col md:flex-row gap-20 md:gap-10 mt-0 p-5">
                    <div className=' flex-col items-start justify-start rounded-2xl w-full inline-block'>
                        {imgsrc && imgalt && (
                            <div className="w-full md:w-auto flex justify-center">
                                <Image
                                    src={imgsrc}
                                    alt={imgalt}
                                    width={500}
                                    height={600}
                                    className="rounded-lg object-cover w-full md:w-[800px]"
                                />
                            </div>
                        )}
                    </div>
                    {/* Text Content Section */}
                    <div className=" flex-col items-start justify-start p-5 md:p-10 rounded-2xl inline-block">
                        {
                            title && (
                                <h1 className="font-bold text-4xl md:text-6xl mb-6">
                                    {title}
                                </h1>
                            )
                        }
                        {
                            description && (
                                <p className="text-lg md:text-2xl mb-6">
                                    {description}
                                </p>
                            )
                        }
                        {
                            linkname && linksrc && (
                                <Link href={linksrc} className="text-blue-600 hover:scale-105 transform transition duration-300 ease-in-out text-xl">
                                    {linkname}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block size-6 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HeroSectionRight