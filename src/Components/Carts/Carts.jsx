import React from 'react'
import useGetMyCarts from '../../Hooks/useGetMyCarts';
import Loading from '../Shared/Loading/Loading';
import CartsDetails from './CartsDetails';
import { motion } from "framer-motion";
import { FaEuroSign } from "react-icons/fa";

import { Link } from 'react-router-dom';


// todo 
export default function Carts() {


    const { myCarts, price, quantity, isLoading, myCartRefetch } = useGetMyCarts();

    // console.log(myCarts);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <>

            <div className="px-2 md:py-3 text-gray-300 ">
                {
                    myCarts.length === 0 ? (
                        <div className=' h-[500px] flex flex-col items-center justify-center '>
                            <h2 className='my-4 text-2xl text-gray-200'> Food Not Found</h2>
                            <Link to={'/'}>
                                <button type="button" className="px-5 py-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Add To Cart</button></Link>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="rounded-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-medium py-4"> Add To Cart Product List</h1>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full mt-2">
                                        <thead>
                                            <tr className="text-indigo-500 hover:text-indigo-700">
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    N/A
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Product Name
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Image
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Unit Price
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Quantity
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Total Price
                                                </th>
                                                <th className="border bg-black border-gray-600 text-center text-xs md:text-md lg:text-lg py-2 md:py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <motion.tbody
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                        >
                                            {myCarts?.map((cart, i) => (
                                                <CartsDetails key={cart._id} i={i} cart={cart} myCartRefetch={myCartRefetch} />
                                            ))}
                                        </motion.tbody>
                                    </table>


                                    {/* out information */}

                                </div>

                                <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 my-4  p-4 ">
                                    <p className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm  lg:text-lg">
                                        Total Quantity: <span className="text-[#FFA500]">{quantity}</span>
                                    </p>
                                    <p className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm lg:text-lg">
                                        <div className='flex items-center gap-3'>

                                            Total Price:
                                            <div className='flex items-center gap-1'> 
                                                <FaEuroSign /> <span className="text-[#FFA500]">{price?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </p>
                                    <Link to={"/payment"}>

                                        <button
                                            // onClick={handleCheckout}
                                            className="bg-black text-[#FFA500] hover:bg-gray-800 px-4 py-2 rounded-full text-2xl md:text-lg lg:text-xl flex items-center gap-1"
                                        >
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    )
                }



            </div>
        </>
    )
}
