import React from 'react'
import CommonHeader from '../components/CommonHeader'

const page = () => {
    return (
        <main>
            <CommonHeader
                title='ADMIN PANEL'
                imgsrc='02.jpg'
            />
            <div className='container'>
                <div className='flex flex-col items-center justify-center mt-20 mb-20'>
                    <h1 className='text-4xl font-bold text-center mb-2'>Admin Panel</h1>
                    <p className='text-lg text-center mb-10'>This is the admin panel.</p>
                </div>
            </div>
        </main>
    )
}

export default page