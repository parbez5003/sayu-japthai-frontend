import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useGetMyCarts from '../../Hooks/useGetMyCarts';
import { FaCreditCard, FaCalendarAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

import { FaEuroSign } from "react-icons/fa";




export default function CheckoutForm({ formData }) {

    const { road_number, address, complement_address, post_code, district } = formData || {}



    const { myCarts, price, quantity, myCartRefetch } = useGetMyCarts();


    // console.log("my carts", myCarts);

    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const email = myCarts?.[0]?.customer_email;

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (formData === null) {
            toast.error("Please fill out the form before Address with payment.");
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardNumberElement);

        const email = myCarts?.[0]?.customer_email;

        try {
            // Fetch payment intent client secret from your backend
            const { data } = await axiosSecure.post('/order', { email });

            if (!data.success) {
                console.error('Error creating payment intent');
                setIsProcessing(false);
                return;
            }

            const { clientSecret } = data;



            // Confirm card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: email,
                    },
                },
            });

            // console.log(paymentIntent);


            if (error) {
                console.error('[error]', error);
                setIsProcessing(false);
            } else if (paymentIntent.status === 'succeeded') {

                let paymentInformation = {
                    customer_email: email,
                    email: paymentIntent?.receipt_email,
                    // total_amount: paymentIntent.amount.toFixed(2),
                    total_amount: (paymentIntent.amount / 100).toFixed(2),
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    foods: myCarts,
                    status: "success",
                    road_number, address, complement_address, post_code, district

                }

                // console.log(paymentInformation);

                const res = await axiosSecure.post('/orderSuccess', paymentInformation)
                if (res?.data) {
                    toast.success("  Payment successfully ");

                }


                const response = await axiosSecure.delete(`/deleteCarts/${email}`)
                    .then((response) => {
                        if (response.status === 200) {
                            myCartRefetch();
                        } else {
                            toast.error(`An error while deleting the product.`)
                        }
                    })

                // Payment was successful
                navigate('/orderSuccess');
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            setIsProcessing(false);
        }
    };



    const handleCashOnDelivery = async () => {
        try {
            // Verify the structure of myCarts


            if (formData === null) {
                toast.error("Please fill out the form before Address with payment.");
                return;
            }

            if (!Array.isArray(myCarts) || myCarts.length === 0) {
                throw new Error("Cart data is invalid. It should be a non-empty array.");
            }

            // Calculate the total amount from the myCarts array
            const total_amount = myCarts.reduce((sum, item) => sum + item.total_price, 0);
            // console.log(total_amount);
            // Make sure myCarts is correctly formatted for the backend
            const orderInfomation = {
                foods: myCarts,
                total_amount: total_amount,
                customer_email: email,
                isDelivered: false,
                isOrderCancel: false,
                isPaid: false,
                status: "pending",
                date: new Date(),
                road_number, address, complement_address, post_code, district
            };

            // console.log(orderInfomation);

            // Send POST request to the backend
            const res = await axiosSecure.post('/orderSuccess', orderInfomation);

            if (res?.data) {
                toast.success(` ${total_amount} $ Cash on Delivery order placed successfully.`);
            }

            // Delete the cart items after order placement
            const response = await axiosSecure.delete(`/deleteCarts/${email}`);
            if (response.status === 200) {
                myCartRefetch();
            } else {
                toast.error(`An error occurred while deleting the product.`);
            }

            navigate('/orderSuccess');

        } catch (error) {
            toast.error(`Error: ${error.message}`); // Show error to user
        }
    };




    return (
        <>

            <div className="md:flex items-center lg:gap-6 md:gap-6 justify-center lg:h-screen bg-gray-100  mb-10 lg:px-0 md:px-4 px-0 ">
                <form onSubmit={handleSubmit} className=" lg:w-6/12 w-full  p-6 bg-gray-50 rounded-md shadow-lg">
                    <h3 className='text-gray-700 py-2'>Pay with Card</h3>



                    <h2 className="text-2xl font-semibold my-6 flex items-center justify-between text-gray-700">
                        Payment: <p className='flex items-center gap-0.5'> <FaEuroSign /> {price}  <span className='text-green-600 ml-2'>({quantity})</span> </p>
                    </h2>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Card Number
                        </label>
                        <div className="p-3 border border-gray-300 rounded-md flex items-center">
                            <FaCreditCard className="text-gray-500 mr-3" />
                            <CardNumberElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#32325d',
                                            '::placeholder': {
                                                color: '#a0aec0',
                                            },
                                        },
                                        invalid: {
                                            color: '#e53e3e',
                                        },
                                    },
                                }}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Expiry Date
                        </label>
                        <div className="p-3 border border-gray-300 rounded-md flex items-center">
                            <FaCalendarAlt className="text-gray-500 mr-3" />
                            <CardExpiryElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#32325d',
                                            '::placeholder': {
                                                color: '#a0aec0',
                                            },
                                        },
                                        invalid: {
                                            color: '#e53e3e',
                                        },
                                    },
                                }}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            CVC
                        </label>
                        <div className="p-3 border border-gray-300 rounded-md flex items-center">
                            <FaLock className="text-gray-500 mr-3" />
                            <CardCvcElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#32325d',
                                            '::placeholder': {
                                                color: '#a0aec0',
                                            },
                                        },
                                        invalid: {
                                            color: '#e53e3e',
                                        },
                                    },
                                }}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${isProcessing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}
                        
                        ${formData === null ? "opacity-60 cursor-not-allowed" : ""}
                        
                        `}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>

                <div className="  md:border-none  border-t-2 border-gray-600 lg:rounded-lg  bg-gray-50 lg:w-[200px] w-full  lg:h-[200px] h-40  flex items-center justify-center shadow-lg " >

                    <button onClick={handleCashOnDelivery}
                        className={` ${formData === null ? " opacity-60 cursor-not-allowed bg-blue-700  " : "bg-blue-700"}  px-5 py-3 text-xs font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            `}>
                        Cash On Dalivary
                    </button>


                </div>
            </div >
        </>
    );
}
