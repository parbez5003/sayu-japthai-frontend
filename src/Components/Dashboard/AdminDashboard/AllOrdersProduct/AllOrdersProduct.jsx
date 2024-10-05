import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAllOrdersProducts from "../../../../Hooks/useAllOrdersProducts";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import ringTong from "../../../../assets/audio/inkyzakehomeringtonexxxtonesmp3160kringtone-63430-63433.mp3"
import { useLocation } from "react-router-dom";
import { FaEuroSign } from "react-icons/fa";



const AllOrdersProduct = () => {


    const axiosSecure = useAxiosSecure();

    const { allOrdersProducts, isLoading, orderRefetch } = useAllOrdersProducts();



    // State for sorting option
    const [sortBy, setSortBy] = useState("all");

    // Filter orders based on the selected sort option
    const filteredOrders = allOrdersProducts?.filter((order) => {
        if (sortBy === "all") {
            return true;
        } else if (sortBy === "price" && !order.isPaid) {
            return true;
        } else if (sortBy === "payment" && order.isPaid) {
            return true;
        }
        return false;
    });

    // Order update 
    const handleOrderUpdate = async (_id, actionType) => {
        try {
            let updateData = {};
            if (actionType === "cancel") {
                updateData = { isOrderCancel: true };
            } else if (actionType === "processing") {
                updateData = { isDelivered: true };
            } else if (actionType === "reject") {
                updateData = { isOrderCancel: false };
            }

            // Make a PUT request to update the order
            const res = await axiosSecure.put(`/updateOrder/${_id}`, updateData);

            if (res?.data) {
                // Show success notification
                toast.success("Order updated successfully");
                orderRefetch();
                // Optionally, you can refetch orders or update the state to reflect the change
            }
        } catch (error) {
            // Handle errors
            toast.error("Failed to update order");
            console.error('Error updating order:', error);
        }
    };

    // Check loading states
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="px-2 md:py-3 text-gray-800 bg-gray-200 ">
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="rounded-lg"
                    >
                        <div className="md:flex items-center justify-between px-2">
                            <h1 className="text-2xl font-medium py-4">All Order List</h1>
                            <div className="md:flex flex-col sm:flex-row items-center">
                                <label htmlFor="sort" className="mr-2 text-gray-00 mx-auto lg:text-xl">
                                    Sort by Payment:
                                </label>
                                <select
                                    id="sort"
                                    name="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="md:w-60 md:p-2 p-1 border border-gray-500 rounded bg-gray-200 text-gray-700"
                                >
                                    <option value="all">All Orders</option>
                                    <option value="payment">Payment Success</option>
                                    <option value="price">Cash On Delivery</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full mt-2">
                                <thead>
                                    <tr className="text-indigo-500 hover:text-indigo-700  ">
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3 pl-1">N/A</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Product Name</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">Image</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">Date</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">Quantity</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Total Amount</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Payment Status</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Status</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Delivered</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Address</th>
                                        <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">Tnx Id</th>
                                    </tr>
                                </thead>
                                <AnimatePresence>
                                    <tbody>
                                        {filteredOrders?.map((order, i) => (
                                            <React.Fragment key={order._id}>
                                                {order?.foods?.map((food, index) => (
                                                    <motion.tr
                                                        key={`${order._id}-${index}`}
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                    >
                                                        <td className="border bg-white border-gray-200 p-2 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="border bg-white border-gray-200 md:p-2 p-1 text-sm w-60">{food?.name}</td>
                                                        <td className="border bg-white border-gray-200 p-2">
                                                            <img className="w-20 md:h-16 rounded-lg mx-auto" src={food?.product_image[0]} alt={food?.name} />
                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                                                            {new Date(order?.date).toLocaleDateString()} - {new Date(order?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-4 text-sm md:text-md text-center">{food?.quantity}</td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                                                            <div className="flex items-center justify-center gap-1">
                                                                <FaEuroSign /> {food?.unit_price * food?.quantity}
                                                            </div>

                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                                                            {order?.isPaid ? "Paid" : "Unpaid"}
                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center cursor-pointer">

                                                            <div>
                                                                {order?.isOrderCancel
                                                                    ? <div onClick={() => handleOrderUpdate(order?._id, "reject")} className="text-white  bg-red-600 p-1 rounded">
                                                                        Re Order
                                                                    </div> : <div onClick={() => handleOrderUpdate(order?._id, "cancel")} className="text-white bg-green-500  p-1 rounded">
                                                                        Cancel
                                                                    </div>}
                                                            </div>

                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center cursor-pointer">

                                                            <div>
                                                                {
                                                                    order?.isOrderCancel ? (
                                                                        <div className="opacity-60 cursor-not-allowed">
                                                                            {order?.isDelivered
                                                                                ? <div className="text-white bg-green-500 p-1 rounded">
                                                                                    Delivered
                                                                                </div>
                                                                                : <div className="text-white bg-yellow-600 p-1 rounded">
                                                                                    Processing
                                                                                </div>}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="">
                                                                            {order?.isDelivered
                                                                                ? <div className="text-white bg-green-500 p-1 rounded">
                                                                                    Delivered
                                                                                </div>
                                                                                : <div
                                                                                    onClick={() => handleOrderUpdate(order?._id, "processing")} className="text-white bg-yellow-600 p-1 rounded">
                                                                                    Processing
                                                                                </div>}
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>

                                                        </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                                                            {order?.road_number} , {order?.address} , {order?.complement_address} , {order?.post_code} , {order?.district} </td>
                                                        <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">{order?.transactionId ? order?.transactionId : "N/A"}</td>
                                                    </motion.tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </AnimatePresence>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AllOrdersProduct;
