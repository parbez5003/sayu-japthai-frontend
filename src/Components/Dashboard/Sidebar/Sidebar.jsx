import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { MdMenu, MdLogout, MdDashboard, MdOutlineAddCircle } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";



import { HiUsers } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useCurrentUser from "../../../Hooks/useCurrentUser";

export default function Sidebar() {


    const { currentUser } = useCurrentUser()
  
    const isAdmin = currentUser?.isAdmin

    const { logOut , user } = useAuth()

    const navigate = useNavigate()

    const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
    const isSmallDevice = useMediaQuery({ query: "(max-width: 640px)" });
    const [open, setOpen] = useState(!isTabletMid);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(!isTabletMid);
    }, [isTabletMid]);

    useEffect(() => {
        isTabletMid && setOpen(false);
    }, [pathname]);

    const Nav_animation = isTabletMid
        ? {
            open: {
                x: 0,
                width: "16rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                x: -250,
                width: 0,
                transition: {
                    damping: 40,
                    delay: 0.15,
                },
            },
        }
        : {
            open: {
                width: "16rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                width: "4rem",
                transition: {
                    damping: 40,
                },
            },
        };

    const navItems = isAdmin ? [
        { path: "/dashboard", name: "Dashboard", icon: <MdDashboard size={23} /> },
        { path: "/dashboard/addProduct", name: "Add Product", icon: <MdOutlineAddCircle size={23} /> },
        { path: "/dashboard/allUsers", name: "All Users", icon: <HiUsers size={23} /> },
        { path: "/dashboard/allProducts", name: "All Products", icon: <FaProductHunt size={23} /> },
        { path: "/dashboard/userprofile", name: "Profile", icon: <ImProfile size={20} /> },
        { path: "/dashboard/allOrdersProducts", name: "All Orders", icon: <BsBuildingsFill size={20} /> },
    ] : [
        { path: "/dashboard/userDashboard", name: "Dashboard", icon: <MdDashboard size={20} /> },
        { path: "/dashboard/userprofile", name: "Profile", icon: <ImProfile size={20} /> },
        { path: "/dashboard/orders", name: "Orders", icon: <FaCartShopping size={25} /> },
    ];

    const handleLogout = async () => {
        await logOut();
        navigate("/"); // Redirect to login page after logout
    }



    return (
        <div>
            <div
                onClick={() => setOpen(false)}
                className={`lg:hidden fixed inset-0 z-[998] bg-black/50 ${open ? "block" : "hidden"}`}
            ></div>

            <motion.div
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className="bg-gray-200 text-gray-700 shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden lg:relative fixed h-screen"
            >
                <div className="flex items-center justify-between gap-2.5 font-medium border-b py-3 border-slate-400 mx-3">

                    <div className=" ">
                        <div className=" flex items-center justify-between gap-16 pb-2">
                            <h4 className=" text-sm fonts-semibold "> {currentUser.name}  </h4>
                            {currentUser?.isAdmin ?
                                (<button className=" gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-green-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50  ">
                                    Admin
                                </button>
                                )
                                : user ? (
                                    <button className=" gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50  ">
                                        User
                                    </button>
                                ) : ""

                            }
                        </div>

                        <Link to="/" className="text-xl fonts-normal">Sayu Japthai</Link>
                    </div>

                    {(isTabletMid || isSmallDevice) && (
                        <motion.div
                            onClick={() => setOpen(!open)}
                            animate={open ? { x: 0, y: 0, rotate: 0 } : { x: -10, y: -200, rotate: 180 }}
                            transition={{ duration: 0 }}
                            className="cursor-pointer"
                        >
                            <IoIosArrowBack size={25} />
                        </motion.div>
                    )}
                </div>

                <div className="flex flex-col h-full ">

                    {/* learge device nav items */}
                    <ul className="px-2.5 py-5 flex flex-col gap-1 font-medium overflow-x-hidden md:h-[68%] h-[70%] ">
                        {navItems?.map((item) => (

                            <li
                                key={item.path}
                                className={`p-1 rounded-xl  cursor-pointer duration-300 
                                ${location.pathname === item.path ?
                                        'bg-indigo-500 flex rounded  items-center cursor-pointer duration-300 text-white'
                                        : ''
                                    }`}
                            >
                                <Link to={item.path} className=' p-2 flex fonts-normal  rounded gap-2 items-center cursor-pointer duration-300 '>
                                    {item.icon}
                                    {item?.name}
                                </Link>
                            </li>

                        ))}
                    </ul>


                    {open && (
                        <div className="flex-1 text-sm z-50 max-h-60 my-auto font-medium border-t border-gray-400 p-4">
                            <ul>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-indigo-500 flex rounded  items-center cursor-pointer duration-300 text-white"
                                                : "p-2.5 flex rounded-md gap-2 items-center cursor-pointer duration-300 font-medium"
                                        }
                                    >
                                        <IoHome size={23} />
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-indigo-500 flex rounded  items-center cursor-pointer duration-300 text-white"
                                                : "p-2.5 flex rounded-md gap-2 items-center cursor-pointer duration-300 font-medium"
                                        }
                                    >
                                        <IoMdSettings size={23} />
                                        Settings
                                    </NavLink>
                                </li>
                                <li onClick={handleLogout} className="p-2.5 flex rounded-md gap-2 items-center cursor-pointer duration-300 font-medium text-[#FFA500]">
                                    <MdLogout size={23} />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Sidebar toggle for small devices */}
            <div className="flex justify-between items-center py-1 gap-6 px-1 md:py-2 md:px-3">
                <div className="p-1 text-gray-800 lg:hidden" onClick={() => setOpen(true)}>
                    <MdMenu size={25} />
                </div>
                <div className="relative w-10 h-10 lg:hidden ">
                    {
                        currentUser?.profilePhoto ? <img src={currentUser?.profilePhoto} alt="" className="className=' cursor-pointer w-10 h-10 border-2  border-white rounded-full dark:border-gray-800'" /> : 
                        <img 
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        alt="Profile" />
                    }
                </div>
            </div>
        </div>
    );
}
