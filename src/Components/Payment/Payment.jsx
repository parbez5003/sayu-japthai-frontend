import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_Geteway_PK);
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';

export default function Payment() {
    const { register, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState(null);

    const onSubmit = (data) => {
        setFormData(data);
        toast.success(" Address Fill Up successfully ");
        reset() // Store form data and pass it to CheckoutForm
    };

    // console.log(formData);

    return (
        <div className='lg:flex items-center bg-gray-100  '>

            <div className='lg:w-1/2 w-full mx-auto  text-gray-600 lg:my-12  rounded-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className='lg:px-6 md:px-4 px-2 
                 max-w-[500px] mx-auto bg-gray-50 shadow-lg'>
                    {/* road_number field */}
                    <div>
                        <h1 className='lg:text-3xl md:text-2xl fonts-semibold py-4'> Orders Address </h1>
                    </div>
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de rue</label>
                        <input
                            type="text"
                            name="road_number"
                            placeholder="Numéro de rue"
                            required
                            {...register("road_number")}
                            className="shadow-sm text-sm rounded-sm block w-full p-2.5 border border-gray-400 "
                        />
                    </div>
                    {/* address field */}
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Your Address"
                            required
                            {...register("address")}
                            className="shadow-sm text-sm rounded-sm block w-full p-2.5 border border-gray-400"
                        />
                    </div>
                    {/* complement_address field */}
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complément d'adresse</label>
                        <input
                            type="text"
                            name="complement_address"
                            placeholder="Complément d'adresse"
                            // required
                            {...register("complement_address")}
                            className="shadow-sm text-sm rounded-sm block w-full p-2.5 border border-gray-400"
                        />
                    </div>
                    {/* post_code field */}
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code Postale</label>
                        <input
                            type="number"
                            name="post_code"
                            placeholder="Code Postale"
                            required
                            {...register("post_code")}
                            className="shadow-sm text-sm rounded-sm block w-full p-2.5 border border-gray-400"
                        />
                    </div>
                    {/* district field */}
                    <div className="float-label-input pb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville</label>
                        <input
                            type="text"
                            name="district"
                            placeholder="Ville"
                            required
                            {...register("district")}
                            className="shadow-sm text-sm rounded-sm block w-full p-2.5 border border-gray-400"
                        />
                    </div>

                    {/* Submit button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="bg-[#62AB00] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                    >
                        Submit
                    </motion.button>
                </form>
            </div>

            <div className='lg:w-1/2 w-full mt-6'>
                {/* Pass formData to CheckoutForm */}
                <Elements stripe={stripePromise}>
                    <CheckoutForm formData={formData} />
                </Elements>
            </div>
        </div>
    );
}
