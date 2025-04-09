import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
interface VisitProductsProps {
    leftimgsrc?: string;
    leftimgalt?: string;
    lefttitle?: string;
    leftdescription?: string;
    rightimgsrc?: string;
    rightimgalt?: string;
    righttitle?: string;
    rightdescription?: string;
}

const VisitProducts: React.FC<VisitProductsProps> = ({ leftimgsrc, leftimgalt, lefttitle, leftdescription, righttitle, rightdescription, rightimgsrc, rightimgalt }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:gap-28 mt-0 p-5">
                <div className="flex-col items-start justify-start py-10 md:py-20 rounded-2xl inline-block ">
                    {
                        lefttitle && (
                            <h1 className="font-bold text-3xl md:text-5xl mb-6">
                                {lefttitle}
                            </h1>
                        )
                    }
                    {
                        leftdescription && (
                            <p className="text-lg md:text-2xl text-justify">
                                {leftdescription}
                            </p>
                        )
                    }
                </div>
                <div className='flex flex-col items-start justify-center w-full rounded-2xl overflow-hidden bg-black'>
                    {leftimgsrc && leftimgalt && (
                        <Image
                            src={leftimgsrc}
                            alt={leftimgalt}
                            width={400}
                            height={400}
                            className="object-cover h-fit w-full md:w-[700px] md:h-[360px] transform transition duration-1000 hover:scale-125"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-28 mt-0 p-5">
                <div className='flex flex-col items-start justify-center w-full rounded-2xl overflow-hidden'>
                    {rightimgsrc && rightimgalt && (
                        <Image
                            src={rightimgsrc}
                            alt={rightimgalt}
                            width={400}
                            height={400}
                            className="object-cover h-fit w-full md:w-[700px] md:h-[360px] transform transition duration-1000 hover:scale-125"
                        />
                    )}
                </div>
                <div className="flex-col items-start justify-start py-10 md:py-20 rounded-2xl inline-block ">
                    {
                        righttitle && (
                            <h1 className="font-bold text-3xl md:text-5xl mb-6">
                                {righttitle}
                            </h1>
                        )
                    }
                    {
                        rightdescription && (
                            <p className="text-lg md:text-2xl text-justify">
                                {rightdescription}
                            </p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default VisitProducts