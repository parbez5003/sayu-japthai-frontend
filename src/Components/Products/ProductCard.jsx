import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaRegHeart, FaEuroSign } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import useCurrentUser from '../../Hooks/useCurrentUser';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

export default function ProductCard({ product, myCartRefetch }) {
    const { _id, name, price, description, image, ownerEmail, quantity: stockLimit, measurement } = product || {};
    const axiosPublic = useAxiosPublic();
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Modal state management
    const [isModalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1); // Set default quantity to 1


    // Manage description toggle
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false); 

    // Toggle Description
    const toggleDescription = () => setDescriptionExpanded(!isDescriptionExpanded);

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
                total_price: price * quantity, // Adjust total price based on quantity
                product_image: image,
                name,
                quantity,
                stock_limit: stockLimit,
            };

            try {
                const cartResponse = await axiosPublic.post(`/myCarts/${currentUser?.email}`, addCart);
                if (cartResponse.data) {
                    toast.success("Product added to cart successfully!");
                    myCartRefetch();
                    setModalOpen(false); // Close the modal after adding to cart
                }
            } catch (error) {
                toast.error("Product already in cart?");
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Function to open and close modal
    const toggleModal = () => setModalOpen(prev => !prev);

    // Function to increase quantity
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
        // if (quantity < stockLimit) {
        // }
    };

    // Function to decrease quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
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
                
                <div className="lg:w-[300px] 2xl:w-[360px] lg:mt-6 ">
                    <div className="p-2 bg-neutral-800 rounded-xl">
                        <img
                            className="h-[245px] bg-cover mx-auto rounded-xl w-full  transition-all duration-300 hover:scale-110"
                            src={image}
                            alt={name}
                        />
                    </div>

                    <div className='p-3'>
                        <h5 className="text-xl px-1 pt-2 font-semibold text-gray-300 font-oswald">
                            {name}
                        </h5>

                        {/* description */}
                        <p className="text-gray-300 px-1 text-sm py-3 font-oswald">
                            {isDescriptionExpanded ? description : description.slice(0, 100)}.....

                            <span onClick={toggleDescription} className=' cursor-pointer text-indigo-700 ml-2 font-semibold px-1 '>{isDescriptionExpanded ? 'See Less' : 'See More'}</span>
                        </p>

                    

                        <div className="">
                            <div className='flex items-center justify-between mb-1'>
                                <span className="text-2xl font-bold text-gray-300 flex items-center">
                                    <FaEuroSign /> {price}
                                </span>
                                <span>{measurement ? measurement : ""} </span>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    onClick={toggleModal} // Open the modal when clicked
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

            {/* Modal */}
         {/* Modal */}
{isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 md:px-0">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex flex-col md:flex-row items-center">
                {/* Product Image */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                        className="w-full h-auto rounded-lg"
                        src={image}
                        alt={name}
                    />
                </div>
                {/* Product Details */}
                <div className="w-full md:w-2/3 md:pl-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{name}</h3>
                    <div className="flex items-center mb-2">
                        <FaEuroSign className="text-gray-500 mr-1" />
                        <span className="text-2xl font-bold text-gray-700">
                        {(price * quantity).toFixed(2)}
                        </span>
                    </div>
                    
                    {/* Quantity Control */}
                    <div className="flex items-center mb-4">
                        <button
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l-lg"
                            onClick={decreaseQuantity}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 bg-gray-200 text-gray-900">{quantity}</span>
                        <button
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r-lg"
                            onClick={increaseQuantity}
                            // disabled={quantity === stockLimit}
                        >
                            +
                        </button>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            onClick={handleAddToCart}
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
}
