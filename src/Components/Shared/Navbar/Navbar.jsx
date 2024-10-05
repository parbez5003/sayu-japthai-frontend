import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// react icons 
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
// images 
import logo from "../../../assets/images/logo.png"
import ProfileDropdown from './Profile/ProfileDropdown';
import CartsAndOrders from './CartsAndOrders/CartsAndOrders';



export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

 


  // Toggle function to handle the navbar's display
  const handleMenuItems = () => {
    setMenuOpen(!menuOpen);
  };

  // Array containing navigation items
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/contact', name: 'Contact' },
    { path: '/about', name: 'About' },

  ];

  // Get the current location
  const location = useLocation();

  // Reference for the navbar to detect clicks outside
  const navbarRef = useRef();

  // Effect to handle clicks outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle navigation item click
  const handleNavItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className='fixed top-0 right-0 left-0 bg-black flex justify-between items-center h-16 lg:h-20 w-full mx-auto px-4 lg:px-10 text-white z-[999] font-poppins' ref={navbarRef}>
        {/* Logo */}
        <div className='w-16 h-16 lg:block hidden'>
          <img src={logo} alt="" />
        </div>

        <div className=' lg:hidden flex items-center gap-4'>
          <ProfileDropdown />

          <CartsAndOrders />

        </div>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex items-center'>
          {navItems?.map(item => (
            <li
              key={item.path}
              className={`p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-indigo-600 ${location.pathname === item.path ? 'text-indigo-500 fonts-semibold underline ' : ''
                }`}
            >
              <Link to={item.path} className='text-lg fonts-normal'>
                {item?.name}
              </Link>
            </li>
          ))}

          <CartsAndOrders />

          <li className='p-4'>
            <ProfileDropdown />
          </li>
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleMenuItems} className='block lg:hidden'>
          {menuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            menuOpen
              ? 'fixed lg:hidden left-0 top-0 w-[60%] h-full bg-black ease-in-out duration-500 z-[999] '
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Navigation Items */}
          <h1 className='w-full lg:text-3xl text-2xl fonts-medium text-white lg:hidden mt-6 px-2  border-b pb-2'>Sayu Japthai</h1>

          {navItems?.map(item => (
            <li
              key={item.path}
              className={` p-4 border-b  border-gray-500  duration-300 hover:text-indigo-600 cursor-pointer ${location.pathname === item.path ? 'text-indigo-500 fonts-semibold underline' : ''
                }`}
              onClick={handleNavItemClick}
            >
              <Link to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
