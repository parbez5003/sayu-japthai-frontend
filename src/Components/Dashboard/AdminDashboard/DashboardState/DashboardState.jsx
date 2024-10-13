import { FaUsers, FaEuroSign } from "react-icons/fa";
import useAllUsers from "../../../../Hooks/useAllUser";
import useAllProducts from "../../../../Hooks/useAllProducts";
import useTotalOrders from "../../../../Hooks/useTotalOrders";
import Loading from "../../../Shared/Loading/Loading";
import { useEffect, useRef } from "react";

import ringTong from "../../../../assets/audio/inkyzakehomeringtonexxxtonesmp3160kringtone-63430-63433.mp3";
import useCurrentUser from "../../../../Hooks/useCurrentUser";

const DashboardState = () => {
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.isAdmin;

  const [allUsers] = useAllUsers();
  const [products] = useAllProducts();
  const { totalOrders, isLoading, totalOrderRefetch } = useTotalOrders();
  console.log(totalOrders);

  const previousOrdersCount = useRef(totalOrders?.length || 0);

  useEffect(() => {
    totalOrderRefetch();
    if (totalOrders?.length > previousOrdersCount.current) {
      if (isAdmin) {
        const audio = new Audio(ringTong);
        audio.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
      previousOrdersCount.current = totalOrders.length;
    }
  }, [totalOrders, totalOrderRefetch, isAdmin]);

  // Calculate total sell amount

  const totalSellAmount = totalOrders
    ?.reduce((acc, order) => acc + (order?.total_amount || 0), 0)
    ?.toFixed(2);

  const totalPaidOrder =
    totalOrders?.filter((order) => order?.isPaid)?.length || 0;
  const totalUnPaidOrder =
    totalOrders?.filter((order) => !order?.isPaid)?.length || 0;

  const totalPendingOrder =
    totalOrders?.filter((order) => !order?.isDelivered)?.length || 0;
  const totalDeliveredOrder =
    totalOrders?.filter((order) => order?.isDelivered)?.length || 0;
  const totalCancelOrder =
    totalOrders?.filter((order) => order?.isOrderCancel)?.length || 0;

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
        {/* Total Sell Card */}
        <Card
          title="Total Sell"
          value={totalSellAmount}
          icon={<FaEuroSign size={30} />}
        />

        {/* Total Foods Order Card */}
        <Card
          title="Total Foods Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalOrders?.length}
        />

        {/* Total Paid Order Card */}
        <Card
          title="Total Paid Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalPaidOrder}
        />

        {/* Total Un Paid Order Card */}
        <Card
          title="Total Un Paid Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalUnPaidOrder}
        />

        {/* Total Pending Order Card */}
        <Card
          title="Total Pending Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalPendingOrder}
        />

        {/* Total Delivered Order Card */}
        <Card
          title="Total Delivered Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalDeliveredOrder}
        />

        {/* Total cancl Delivered Order Card */}
        <Card
          title="Total Cancel Order"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          }
          value={totalCancelOrder}
        />

        {/* Total Users Card */}
        <Card
          title="Total Users"
          icon={<FaUsers size={25} />}
          value={`${allUsers?.length}+`}
        />

        {/* Total Products Card */}
        <Card
          title="Total Products"
          icon={
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          }
          value={`${products?.length}+`}
        />
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, icon, value }) => (
  <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group transition-transform duration-300 hover:shadow-xl hover:scale-105">
    <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
      {icon}
    </div>
    <div className="text-right">
      <p className="text-2xl">{value}</p>
      <p>{title}</p>
    </div>
  </div>
);

export default DashboardState;
