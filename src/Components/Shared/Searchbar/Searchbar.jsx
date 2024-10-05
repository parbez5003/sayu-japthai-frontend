import React from 'react'
import { IoIosSearch } from 'react-icons/io'

export default function Searchbar() {
    return (
        <><div className='relative w-full lg:w-60 '>
            <input
                type='text'
                id='search'
                className='bg-gray-100 border  border-gray-800  text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2  py-2 text-gray-900  '
                placeholder='Search...'
            />
            <p className='absolute inset-y-0 end-0 flex items-center pe-3 '>
                <IoIosSearch size={23} className='min-w-max text-gray-900  ' />
            </p >
        </div >
        </>
    )
}
