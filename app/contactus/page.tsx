import React from 'react'
import CommonHeader from '../components/CommonHeader'
import VisitProducts from '../components/VisitProducts'
import HeroSection from '../components/HeroSection'

const page = () => {
    return (
        <>
            <CommonHeader
                title='READY TO TAKE A TOUR OF OUR EXPERIENCE CENTRE?'
                imgsrc='01.jpg'
            />
            <div className='container'>
                <div className='text-center md:text-center mt-10'>
                    <h1 className='text-4xl font-bold mb-2'> Interia's Experience Centres </h1>
                    <p className='text-2xl mb-9'>Experience the comfort and aesthetics of a #InteriaHome before you get yours! With looks for every room, furniture for each corner, material samples on display, and a dedicated interior designer to take you through it, your quest for the best home interiors ends here. And it is ready and safe for your visit.</p>
                </div>
                <VisitProducts
                    lefttitle='Looks for each room'
                    leftdescription='Take a walkthrough of beautifully designed bedrooms, living rooms, modular kitchens and everything in between.'
                    leftimgalt='sfugd'
                    leftimgsrc='/01.jpg'
                    righttitle='Experience our products'
                    rightdescription='See our wide range of modular products and furniture to make the best choice before  you  make a purchase anything.'
                    rightimgsrc='/01.jpg'
                    rightimgalt='gydgd'

                />
                <HeroSection
                    title={"Ensuring a safe experience from design to installation"}
                    description={"We're following all protocols to ensure your safety and vaccination drives are underway to ensure our employees are ready to meet you safely."}
                    linkname={"Know More"}
                    linksrc={"/"}
                    imgsrc={"/P1.jpg"}
                    imgalt={"abc"}
                />
            </div>
        </>
    )
}

export default page