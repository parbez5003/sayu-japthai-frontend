import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiTick } from "react-icons/ti";
import useOrderHistory from "../../../../Hooks/useOrderHistory";
import Loading from "../../../Shared/Loading/Loading";
import "./orders.css";
import { Link } from "react-router-dom";
import { FaEuroSign } from "react-icons/fa";

const Orders = () => {
  const { orderData, isLoading } = useOrderHistory();

  // State for sorting option
  const [sortBy, setSortBy] = useState("all");

  // Get the current time and 24-hour threshold
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Filter orders based on the selected sort option
  const filteredOrders = orderData?.filter((order) => {
    if (sortBy === "all") {
      return true;
    } else if (sortBy === "price" && !order.isPaid) {
      return true;
    } else if (sortBy === "payment" && order.isPaid) {
      return true;
    }
    return false;
  });

  // Separate orders into recent (last 24 hours) and older
  const recentOrders = filteredOrders?.filter(
    (order) => new Date(order?.date) >= oneDayAgo
  );
  const olderOrders = filteredOrders?.filter(
    (order) => new Date(order?.date) < oneDayAgo
  );

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
        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen fonts-normal">
            <p className="text-gray-700 my-4 text-2xl">Order not found</p>
            <Link to={"/"}>
              <button
                type="button"
                className="px-5 py-3 text-lg text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Order Now
              </button>
            </Link>
          </div>
        ) : (
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
                  <label
                    htmlFor="sort"
                    className="mr-2 text-gray-800 mx-auto lg:text-xl"
                  >
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

              {/* Recent Orders */}
              {recentOrders?.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium py-2">
                    Recent Orders (Last 24 hours)
                  </h2>
                  <OrderTable orders={recentOrders} />
                </div>
              )}

              {/* Older Orders */}
              {olderOrders?.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium py-2">Older Orders</h2>
                  <OrderTable orders={olderOrders} />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

// Separate OrderTable component to render the table rows
const OrderTable = ({ orders }) => (
  <div className="overflow-x-auto">
    <table className="w-full mt-2">
      <thead>
        <tr className="text-indigo-500 hover:text-indigo-700  ">
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3 pl-1">
            N/A
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Product Name
          </th>

          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
            Image
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Additional Item
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
            Date
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
            Quantity
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Total Amount
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Payment Status
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Status
          </th>
          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Delivered
          </th>

          <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
            Tnx Id
          </th>
        </tr>
      </thead>

      <AnimatePresence>
        <tbody>
          {orders?.map((order, i) => (
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
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {food?.name}
                  </td>
                  
                  <td className="border bg-white border-gray-200 p-2">
                    <img
                      className="w-20 md:h-16 rounded-lg mx-auto"
                      src={food?.product_image[0]}
                      alt={food?.name}
                    />
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {food?.addiotional_food ? food?.addiotional_food : "N/A"}
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {new Date(order?.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    {new Date(order?.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  <td className="border bg-white border-gray-200 p-4 text-sm md:text-md text-center">
                    {food?.quantity}
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FaEuroSign />{" "}
                      {(food?.unit_price * food?.quantity).toFixed(2)}
                    </div>
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {order?.isPaid ? "Paid" : "Unpaid"}
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    <div className="">
                      {order?.isOrderCancel ? (
                        <div className="text-white bg-yellow-600 p-1 rounded opacity-60 cursor-not-allowed">
                          Order Reject
                        </div>
                      ) : order.isDelivered ? (
                        <div className="text-white bg-yellow-600 p-1 rounded ">
                          Confirm
                        </div>
                      ) : (
                        <div className="text-white bg-yellow-600 p-1 rounded ">
                          Pending
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {order?.isDelivered ? (
                      <div className="text-white bg-green-700 p-1 rounded">
                        Delivered
                      </div>
                    ) : (
                      <div className="text-white bg-red-700 p-1 rounded">
                        Processing
                      </div>
                    )}
                  </td>
                  <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                    {order?.transactionId ? order?.transactionId : "N/A"}
                  </td>
                </motion.tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </AnimatePresence>
    </table>
  </div>
);

export default Orders;
