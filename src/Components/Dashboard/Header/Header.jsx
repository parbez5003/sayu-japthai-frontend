import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import AllArchivedOrders from "../AdminDashboard/AllOrdersProduct/AllArchivedOrders";

export default function Header() {
    
  const { currentUser } = useCurrentUser();

  return (
    <div className="bg-gray-200 rounded-md hidden lg:block px-2 fixed right-0 left-0 z-[998]">
      <div className="flex items-center justify-between py-4 shadow-sm  ">
        <h1 className="md:font-medium lg:text-xl text-md mr-2 text-gray-800 px-2 ">
          {" "}
        </h1>
        <div className="flex items-center md:gap-3 lg:gap-4 gap-3 ">
          {/* search bar components  */}
          <AllArchivedOrders />
          {currentUser?.profilePhoto ? (
            <img
              src={currentUser?.profilePhoto}
              alt=""
              className="className=' cursor-pointer w-12 h-12 border-2  border-white rounded-full dark:border-gray-800'"
            />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
              alt=""
              className="className=' cursor-pointer w-12 h-12 border-2  border-white rounded-full dark:border-gray-800'"
            />
          )}
        </div>
      </div>
    </div>
  );
}
