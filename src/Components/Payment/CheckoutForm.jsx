import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import useGetMyCarts from "../../Hooks/useGetMyCarts";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaEuroSign } from "react-icons/fa";

// InputField component for rendering form fields
const InputField = ({ label, icon: Icon, children }) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2">
      {label}
    </label>
    <div className="p-3 border border-gray-300 rounded-md flex items-center">
      <Icon className="text-gray-500 mr-3" />
      {children}
    </div>
  </div>
);

export default function CheckoutForm({ formData }) {
  const { road_number, address, complement_address, post_code, district } =
    formData || {};
  const { myCarts, price, quantity, myCartRefetch } = useGetMyCarts();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const email = myCarts?.[0]?.customer_email;

  // Function to validate form fields
  const validateForm = () => {
    if (!formData || !road_number || !address || !post_code || !district) {
      toast.error("Please complete all the required address fields.");
      return false;
    }
    if (!Array.isArray(myCarts) || myCarts.length === 0) {
      toast.error("Your cart is empty.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || !stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardNumberElement);

    try {
      if (paymentMethod === "card") {
        // Request payment intent from the back-end
        const { data } = await axiosSecure.post("/order", { email });
        if (!data.success) throw new Error("Error creating payment intent");

        const { clientSecret } = data;

        // Confirm the card payment using Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: { email },
            },
          }
        );

        if (error) {
          console.error("[error]", error);
          toast.error("Payment failed. Please check your card details.");
          setIsProcessing(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          // Ensure proper conversion of amount to euros
          const totalAmountInEuros = (paymentIntent.amount / 100).toFixed(2);

          const paymentInformation = {
            customer_email: email,
            email: paymentIntent.receipt_email,
            total_amount: totalAmountInEuros, // Display amount in euros with 2 decimal places
            transactionId: paymentIntent.id,
            date: new Date(),
            foods: myCarts,
            status: "success",
            road_number,
            address,
            complement_address,
            post_code,
            district,
          };
          console.log(paymentInformation);

          await axiosSecure.post("/orderSuccess", paymentInformation);
          toast.success("Payment successfully processed.");
          await axiosSecure.delete(`/deleteCarts/${email}`);
          myCartRefetch();
          navigate("/orderSuccess");
        }
      } else {
        // Handle Cash on Delivery order
        const total_amount = myCarts.reduce(
          (sum, item) => sum + item.total_price,
          0
        );

        const totalAmountInEuros = total_amount.toFixed(2);

        const orderInformation = {
          foods: myCarts,
          total_amount: totalAmountInEuros, // Display amount in euros with 2 decimal places
          customer_email: email,
          isDelivered: false,
          isOrderCancel: false,
          isPaid: false,
          status: "pending",
          date: new Date(),
          road_number,
          address,
          complement_address,
          post_code,
          district,
        };

        await axiosSecure.post("/orderSuccess", orderInformation);
        toast.success(
          `Cash on Delivery order of ${totalAmountInEuros}€ placed successfully.`
        );
        await axiosSecure.delete(`/deleteCarts/${email}`);
        myCartRefetch();
        navigate("/orderSuccess");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setIsProcessing(false);
    }
  };

  // Handle button click when form is incomplete
  const handleIncompleteFormClick = () => {
    if (!formData || !road_number || !address || !post_code || !district) {
      toast.error(
        "Please complete all required address fields before submitting."
      );
    }
  };

  const isFormComplete =
    formData && road_number && address && post_code && district;

  return (
    <div className="">
      <form
        onSubmit={isFormComplete ? handleSubmit : (e) => e.preventDefault()}
        className="lg:w-[500px] w-full p-6 bg-gray-50 rounded-md shadow-lg"
      >
        <h3 className="text-gray-700 py-2">Select Payment Method</h3>

        {/* Payment Method Checkboxes */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <label className="flex items-center hover:bg-gray-200 rounded-md p-2 transition">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="form-radio h-5 w-5 text-blue-600 "
            />
            <span className="ml-2 text-gray-700 text-sm sm:text-base">
              Pay with Card
            </span>
          </label>
          <label className="flex items-center hover:bg-gray-200 rounded-md p-2 transition">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="form-radio h-5 w-5 text-blue-600 "
            />
            <span className="ml-2 text-gray-700 text-sm sm:text-base">
              Cash on Delivery
            </span>
          </label>
        </div>

        <h2 className="text-2xl font-semibold my-6 flex items-center justify-between text-gray-700">
          Payment:{" "}
          <p className="flex items-center gap-0.5">
            <FaEuroSign /> {price.toFixed(2)}{" "}
            <span className="text-green-600 ml-2">({quantity})</span>
          </p>
        </h2>

        {/* Render Card Input Fields if Payment Method is 'card' */}
        {paymentMethod === "card" && (
          <>
            <InputField label="Card Number" icon={FaCreditCard}>
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
                className="flex-1"
              />
            </InputField>

            <InputField label="Expiry Date" icon={FaCalendarAlt}>
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
                className="flex-1"
              />
            </InputField>

            <InputField label="CVC" icon={FaLock}>
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
                className="flex-1"
              />
            </InputField>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={isFormComplete ? null : handleIncompleteFormClick}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            isProcessing
              ? "bg-gray-500"
              : isFormComplete
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          } transition`}
          disabled={isProcessing || !isFormComplete}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
