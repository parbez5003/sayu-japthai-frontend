import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
    return (
        <div className='lg:mt-20'>
            <div className='bg-gray-800 lg:w-1/3 w-full mx-auto h-[300px]   flex items-center justify-center '>
                <div className='text-gray-600'>
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <svg aria-hidden="true" className="w-8 h-8 text-green-600 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Success</span>
                    </div>
                    <p className="mb-4 text-center  text-lg fonts-semibold text-gray-300 dark:text-white">
                        Payment Successfully </p>

                    <div className=' flex items-center lg:gap-6 md:gap-4  gap-2'>
                        <Link to={'/dashboard/orders'}>
                            <button type="button" class=" lg:text-[16px] px-5 py-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "> Order History</button>
                        </Link>
                        <Link to={'/'}>
                            <button type="button" class="lg:text-[16px] px-5 py-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "> Continue Order </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
