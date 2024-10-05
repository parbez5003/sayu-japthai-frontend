import React from 'react'
import Header from '../Components/Dashboard/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'


export default function DashboardLayout() {

    return (
        <div className="lg:flex bg-gray-50  h-screen lg:overflow-hidden font-poppins">
            {/* Fixed Dashboard for large devices */}
            <div className="">
                <Sidebar />

            </div>
            <main className="flex-1  lg:overflow-y-auto">
                {/* Dashboard Navbar */}
                <Header />
                <div className='py-2 px-2 lg:mt-20 '>
                    {/* Outlet for rendering nested routes */}
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
