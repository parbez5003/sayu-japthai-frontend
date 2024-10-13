import { FaUsers } from "react-icons/fa";
import useOrderHistory from "../../../../Hooks/useOrderHistory";
import Loading from "../../../Shared/Loading/Loading";
import { FaEuroSign } from "react-icons/fa";

const UserDashboardState = () => {
  const { orderData, isLoading } = useOrderHistory();


  // Calculate the number of paid orders
  const totalPaidOrders = orderData?.filter((order) => order.isPaid).length;

  const totalUnPaidOrders = orderData?.filter((order) => !order.isPaid).length;

  // Calculate the total amount from all orders
  const totalBuyAmount = orderData
    ?.reduce((acc, order) => acc + order.total_amount, 0)
    ?.toFixed(2);

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
            <FaEuroSign color="white" size={30} />
          </div>
          <div className="text-right">
            <p className="text-2xl flex items-center gap-1">
              {" "}
              {totalBuyAmount || 0} <FaEuroSign />{" "}
            </p>
            <p>Total Buy </p>
          </div>
        </div>

        <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">{orderData?.length}</p>
            <p>Total Foods Order</p>
          </div>
        </div>

        <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FaUsers size={25} color="white" />
          </div>
          <div className="text-right">
            <p className="text-2xl"> {totalPaidOrders} </p>
            <p>Paid Orders</p>
          </div>
        </div>

        <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between py-6 px-3 text-gray-700 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl"> {totalUnPaidOrders} </p>
            <p>Un Paid Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardState;
