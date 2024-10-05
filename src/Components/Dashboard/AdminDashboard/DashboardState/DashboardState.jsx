import { FaUsers } from "react-icons/fa";
import useAllUsers from "../../../../Hooks/useAllUser";
import useAllProducts from "../../../../Hooks/useAllProducts";
import useAllOrdersProducts from "../../../../Hooks/useAllOrdersProducts";
import Loading from "../../../Shared/Loading/Loading";
import { useEffect, useRef } from "react";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import { FaEuroSign } from "react-icons/fa";

import ringTong from "../../../../assets/audio/inkyzakehomeringtonexxxtonesmp3160kringtone-63430-63433.mp3"

const DashboardState = () => {

    const { currentUser } = useCurrentUser()
    const isAdmin = currentUser?.isAdmin

    const [allUsers] = useAllUsers();
    const [products] = useAllProducts();
    const { allOrdersProducts, isLoading  , orderRefetch} = useAllOrdersProducts();

    const previousOrdersCount = useRef(allOrdersProducts?.length || 0);


    useEffect(() => {
        orderRefetch()
        // Check if new orders have been added
        if (allOrdersProducts?.length > previousOrdersCount.current) {
            // Create a new Audio object and play the sound
            if (isAdmin) {
                const audio = new Audio(ringTong); // Ensure this URL is correct and directly accessible
                audio.play().catch(error => {
                    console.error("Error playing sound:", error);
                });
            }

            // Update the previousOrdersCount to the current length
            previousOrdersCount.current = allOrdersProducts.length;
        }
    }, [allOrdersProducts , orderRefetch ]);


    // Calculate the total number of food items
    const totalOrders = allOrdersProducts?.reduce((acc, order) => acc + (order.foods?.length || 0), 0);

    // Calculate the number of paid orders
    const totalSellOrdersCount = allOrdersProducts?.filter(order => order.isPaid).length;


    // Check loading states
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6 bg-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                       <FaEuroSign  color="white" size={30}/>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl"> {totalSellOrdersCount} </p>
                        <p>Total Sell Product</p>
                    </div>
                </div>

                <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-white transform transition-transform duration-500 ease-in-out">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{totalOrders}</p>
                        <p>Total Foods Order</p>
                    </div>
                </div>

                <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <FaUsers size={25} color="white" />
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{allUsers?.length}+</p>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-white transform transition-transform duration-500 ease-in-out">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl">{products?.length}+</p>
                        <p>Total Products</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DashboardState;
