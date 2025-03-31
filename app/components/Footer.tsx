import React from 'react'
import Image from 'next/image'
// import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { socialMedia } from '@/data'
import { footers } from "@/data"
import Link from 'next/link'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
const Footer = () => {
    return (
        <>
            {/* <footer className='w-full pt-10 pb-10 px-10 bg-black-100' id='contact'>
                <div className="grid grid-cols-6 gap-28">
                    <div className="col-start-1 col-end-3 text-white-100">
                        <h1 className="font-bold text-2xl md:text-4xl mb-10">
                            8R STUDIO
                        </h1>
                    </div>
                    <div className="flex justify-center md:justify-end md:col-span-4 sm:col-span-2 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 448 512">
                            <path fill="#f0f2f4" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 448 512">
                            <path fill="#f0f2f4" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 512 512">
                            <path fill="#f0f4f9" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 576 512">
                            <path fill="#f0f7fa" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                        </svg>

                    </div>
                </div>
                <hr className='my-5' />
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-4 md:px-20 text-white text-center md:text-left'>
                    <div className=''>
                        <h1 className='text-2xl mb-3'>Design Ideas</h1>
                        {
                            ["Living Room", "Kitchen", "Kids BedRooms", "Master BedRooms"].map((ar) => (
                                <>
                                    <ul className='list-disc'>
                                        <li>{ar}</li>
                                    </ul>
                                </>
                            ))
                        }
                        <ul>

                        </ul>
                    </div>
                    <div><h1>Design Ideas</h1>
                        {
                            ["Living Room", "Kitchen", "Kids BedRooms", "Master BedRooms"].map((ar) => (
                                <>
                                    <ul>
                                        <li>{ar}</li>
                                    </ul>
                                </>
                            ))
                        }</div>
                    <div><h1>Design Ideas</h1>
                        {
                            ["Living Room", "Kitchen", "Kids BedRooms", "Master BedRooms"].map((ar) => (
                                <>
                                    <ul>
                                        <li>{ar}</li>
                                    </ul>
                                </>
                            ))
                        }</div>
                    <div><h1>Design Ideas</h1>
                        {
                            ["Living Room", "Kitchen", "Kids BedRooms", "Master BedRooms"].map((ar) => (
                                <>
                                    <ul>
                                        <li>{ar}</li>
                                    </ul>
                                </>
                            ))
                        }</div>
                </div>

                <hr />

                <div className='flex mt-1 md:flex-row flex-col justify-center items-center text-white-100'>
                    <p className='md:text-base text-sm md:font-normal font-light'>CopyRight © 2025 Keyur </p>
                </div>
            </footer> */}
            <div className='container bg-[url(/Footer-back2.jpg)] bg-cover  bg-center h-fit  mb-8 text-center items-center shadow-xl rounded-lg px-0' id='contact'>
                <div className='bg-black bg-opacity-50 py-12 rounded-lg'>
                    <h2 className='bg-gradient-to-r bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent py-8'> Your Dream Home is Click Away </h2>
                    <Link href='/contact' className='bg-white-100 text-black-100 py-3 px-5 rounded-lg   hover:text-white-100 hover:bg-black transform-gpu'>
                        Get Start
                    </Link>
                </div>
            </div>
            
            <footer className='w-full pt-10 pb-10 px-6 md:px-10 bg-black-100' id='contact'>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-28 text-white">
                    <div className="md:col-span-2 text-center md:text-left">
                        <h1 className="font-bold text-2xl md:text-4xl mb-6 md:mb-10">8R STUDIO</h1>
                    </div>
                    <div className="flex justify-center col-start-5 md:justify-end md:col-start-6 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 448 512">
                            <path fill="#f0f2f4" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 448 512">
                            <path fill="#f0f2f4" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 512 512">
                            <path fill="#f0f4f9" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 576 512">
                            <path fill="#f0f7fa" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                        </svg>

                    </div>
                </div>
                <hr className='my-5 border-gray-600' />
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-4 md:px-20 text-white text-center md:text-left'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <h1 className='text-xl md:text-2xl mb-3'>Design Ideas</h1>
                            <ul className='list-disc list-inside text-sm md:text-base'>
                                <li>Living Room</li>
                                <li>Kitchen</li>
                                <li>Kids Bedrooms</li>
                                <li>Master Bedrooms</li>
                            </ul>
                        </div>
                    ))}
                </div>
                <hr className='my-5 border-gray-600' />
                <div className='flex flex-col md:flex-row justify-center items-center text-white text-sm md:text-base'>
                    <p className='font-light'>Copyright © 2025 Keyur</p>
                </div>
            </footer>

        </>
    )
}
export default Footer