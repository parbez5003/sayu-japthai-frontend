import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-hot-toast';


export default function Login() {

    const navigate = useNavigate()
    const { signin } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit =async (data) => {

        try {
            const user = await signin(data.email, data.password);

            if (user.emailVerified) {
                toast.success("Logged in successfully!");
                navigate("/");
            } else {
                toast.error("Please verify your email before logging in.");
            }
        } catch (error) {
            console.error("Login error:", error);
            
        }


    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex justify-center items-center font-poppins min-h-screen bg-[url('https://i.ibb.co/M56D6xg/intro-section-pattern.png')]">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className="bg-white m-5 p-8 space-y-5 border rounded-md shadow-md w-[400px] max-w-[400px]"
            >
                <h2 className="text-center text-3xl font-semibold pb-3">Login</h2>

                {/* social Login */}
                <SocialLogin />

                {/* register form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* email field */}
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white fonts-normal ">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder=" Your Email "
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="shadow-sm text-sm rounded-sm  block w-full p-2.5 border-2 "
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* password field */}
                    <div className="float-label-input pb-4 relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white fonts-normal ">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="shadow-sm text-sm rounded-sm  block w-full p-2.5 border-2 "
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 mt-2 right-0 flex items-center px-4 text-gray-600"
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* error message */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                    )}

                    {/* register button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="bg-[#62AB00] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline fonts-normal"
                    >
                        Login
                    </motion.button>

                    {/* redirect login page */}
                    <p className="text-gray-400 text-center mt-3">
                        <span className='text-lg fonts-normal'>
                            New Account Create Now?{" "}
                            <Link
                                className="underline font-semibold text-red-500 hover:text-red-600"
                                to={"/register"}
                            >
                                Register
                            </Link>
                        </span>
                    </p>
                </form>
            </motion.div>

        </div>
    );
}
