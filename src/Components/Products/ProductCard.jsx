import React from 'react';
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import useCurrentUser from '../../Hooks/useCurrentUser';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaEuroSign } from "react-icons/fa";

export default function ProductCard({ product, myCartRefetch }) {

    const { _id, name, price, description, image, ownerEmail, quantity, measurement } = product || {};

    const axiosPublic = useAxiosPublic();
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const { user } = useAuth();

    // handleAddToCart
    const handleAddToCart = async () => {
        if (!user) {
            navigate("/login");
        } else {
            const addCart = {
                customer_name: currentUser?.name,
                customer_email: currentUser?.email,
                owner_email: ownerEmail,
                product_id: _id,
                unit_price: price,
                total_price: price,
                product_image: image,
                name,
                quantity: 1,
                stock_limit: quantity,
            };

            try {
                const cartResponse = await axiosPublic.post(`/myCarts/${currentUser?.email}`, addCart);
                if (cartResponse.data) {
                    toast.success("Product added to cart successfully!");


                    myCartRefetch();
                }
            } catch (error) {
                toast.error("Product already in cart?");
                console.error("Error adding to cart:", error);
            }
        }
    };

    return (
        <div>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="lg:w-[300px] 2xl:w-[360px] lg:mt-6">
                    <div className="p-2 bg-neutral-800 rounded-xl">
                        <img
                            className="h-[245px] bg-cover mx-auto rounded-xl w-full"
                            src={image}
                            alt={name}
                        />
                    </div>

                    <div className='p-3'>
                        <h5 className="text-xl px-1 pt-2 font-semibold text-gray-300 font-oswald">
                            {name}
                        </h5>
                        <p className="text-gray-300 px-1 text-sm py-3 font-oswald">
                            {description}
                        </p>

                        <div className="">
                            <div className='flex items-center justify-between mb-1'>
                                <span className="text-2xl font-bold text-gray-300 flex items-center"> <FaEuroSign /> {price}</span>
                                <span>{measurement ? measurement : ""} </span>
                            </div>
                            <div className='flex  justify-end'>
                                <button
                                    onClick={handleAddToCart}
                                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-5 right-0 left-4">
                    <button className="text-red-500 text-2xl">
                        <FaRegHeart />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
