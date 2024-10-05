import React from 'react'

export default function SectionTitle({ heading, subHeading }) {
    return (
        <div className="space-y-7 max-w-4xl mx-auto  lg:my-12  md:my-8 my-6 text-center flex flex-col items-center justify-center">
            <h1 className='fonts-medium font-poppins  text-3xl lg:text-5xl font-bold text-white uppercase'>
                {heading}
            </h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="8"
                fill="#FF9D00"
                version="1.1"
                viewBox="0 139.474 290.658 11.711"
                xmlSpace="preserve"
            >
                <path fill="#480bf0" d="M0 139.474H290.658V151.185H0z"></path>
            </svg>
            <p className="text-gray-300">{subHeading}</p>
        </div>
    )
}
