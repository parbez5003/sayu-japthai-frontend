import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Shared/Navbar/Navbar'
import Footer from '../Components/Shared/Footer/Footer'

export default function MainLayout() {





    return (
        <div className='px-2 font-poppins bg-black text-white'>
            <Navbar />

            <div className='lg:mt-20 mt-[65px] px-1 container mx-auto font-poppins'>
                <Outlet />
            </div>
            {/* footer section */}
            <Footer />
        </div>
    )
}
