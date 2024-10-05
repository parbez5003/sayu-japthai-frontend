import React from 'react';
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

export default function SocialLogin() {

    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(async (res) => {
                const loggedUser = res.user;
                const name = loggedUser?.displayName;
                const email = loggedUser?.email;
                const profilePhoto = loggedUser?.photoURL;
                const userInfo = { name, email, profilePhoto, role: "user" };
    
                try {
                    // Attempt to get the user by email
                    const response = await axiosPublic.get(`/users/${email}`);
    
                    // If user exists, proceed with login
                    if (response.status === 200 && response.data) {
                        toast.success('Login Successfully !!');
                    } else {
                        // If the user doesn't exist, create a new one
                        await axiosPublic.post("/users", userInfo);
                        toast.success('User created successfully !!');
                    }
    
                    navigate("/");
    
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // If user not found, create a new user
                        await axiosPublic.post("/users", userInfo);
                        toast.success('User created and login successfully !!');
                        navigate("/");
                    } else {
                        console.error('User check or creation error:', error);
                        toast.error('Please Try Again!');
                    }
                }
            })
            .catch((error) => {
                console.error('Google login error:', error);
                toast.error('Please Try Again!');
            });
    };
    

    return (
        <>
            {/* social login buttons */}
            <div className="">
                <motion.button
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.06 }}
                    className="flex justify-center items-center lg:gap-2 gap-1  w-full"
                >
                    <button type="button" className="text-white fonts-normal bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">

                        <FaGoogle size={20} className='lg:mr-3 me-1' />

                        Sign in with Google
                    </button>

                </motion.button>
            </div>

            {/* divider */}
            <div className="flex items-center justify-center gap-5">
                <hr className="bg-[#343A40] max-w-[20%] w-[20%]" />
                <p>Or</p>
                <hr className="bg-[#343A40] max-w-[20%] w-[20%]" />
            </div>
        </>
    )
}
