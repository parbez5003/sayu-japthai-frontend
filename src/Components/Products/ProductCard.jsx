import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaEuroSign } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function ProductCard({ product, myCartRefetch }) {
  const {
    _id,
    name,
    price,
    tax,
    titles,
    add_ons_price,
    sort_description,
    description,
    image,
    ownerEmail,
    quantity: stockLimit,
    measurement,
  } = product || {};
  const axiosPublic = useAxiosPublic();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Modal state management
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Set default quantity to 1

  // Manage description toggle
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  // Toggle Description
  const toggleDescription = () =>
    setDescriptionExpanded(!isDescriptionExpanded);

  //   titles section

  // State to track selected titles
  const [selectedTitles, setSelectedTitles] = useState([]);

  
 // Function to handle single selection with the option to deselect
const handleTitleChange = (title) => {
    setSelectedTitles((prevSelected) => {
      if (prevSelected === title) {
        // If the same title is clicked again, deselect it
        return "";
      } else {
        // Otherwise, select the clicked title
        return title;
      }
    });
  };
  
  // handleAddToCart
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
    } else {
      const addCart = {
        customer_name: currentUser?.name,
        customer_email: currentUser?.email,
        owner_email: ownerEmail,
        product_id: _id,
        unit_price: price,
        total_price: price * quantity, // Adjust total price based on quantity
        product_image: image,
        name,
        quantity,
        stock_limit: stockLimit,
        addiotional_food: selectedTitles,
      };

      try {
        const cartResponse = await axiosPublic.post(
          `/myCarts/${currentUser?.email}`,
          addCart
        );
        if (cartResponse.data) {
          toast.success("Product added to cart successfully!");
          myCartRefetch();
          setModalOpen(false); // Close the modal after adding to cart
        }
      } catch (error) {
        toast.error("Product already in cart?");
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Function to open and close modal
  const toggleModal = () => setModalOpen((prev) => !prev);

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    // if (quantity < stockLimit) {
    // }
  };

  // Function to decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="lg:w-[300px] 2xl:w-[360px] lg:mt-6 font-poppins ">
          <div className="p-2 bg-neutral-800 rounded-xl">
            <img
              className="h-[245px] bg-cover mx-auto rounded-xl w-full  transition-all duration-300 hover:scale-110"
              src={image}
              alt={name}
            />
          </div>

          <div className="p-3">
            <h5 className="text-xl px-1 pt-2 font-semibold text-gray-300 font-oswald">
              {name}
            </h5>

            {/* description */}
            <p className="text-gray-300 px-1 text-sm py-3 font-oswald">
              {isDescriptionExpanded ? description : description.slice(0, 100)}
              .....
              <span
                onClick={toggleDescription}
                className=" cursor-pointer text-indigo-700 ml-2 font-semibold px-1 "
              >
                {isDescriptionExpanded ? "See Less" : "See More"}
              </span>
            </p>

            <div className="">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold text-gray-300 flex items-center">
                  <FaEuroSign /> {price}
                </span>
                <span>{measurement ? measurement : ""} </span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={toggleModal} // Open the modal when clicked
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-5 right-0 left-4">
          <button className="text-red-500 text-2xl">
            <FaRegHeart />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 px-3 flex items-center justify-center bg-black bg-opacity-60 mt-10 md:mt-0  ">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl">
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Product Image Section */}
              <div className="md:w-1/2 flex flex-col justify-center items-center">
                <img
                  className="md:w-3/4 w-full h-auto rounded-lg shadow-md"
                  src={image}
                  alt={name}
                />

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {name}
                </h3>
              </div>

              {/* Product Details Section */}
              <div className="my-2  md:mt-0 md:w-1/2 flex flex-col justify-between">
                <h3 className="text-xl font-normal font-poppins text-gray-900 mb-3">
                  {titles.length > 0 ? " Additional Item" : "Additional Item None"}
                </h3>
                <div>
                  {/* Title Radio Buttons (Single selection) */}
                  <form className="space-y-2 text-gray-700 mb-4">
                    {titles.map((title, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`title-${i}`}
                          name="title" // Group all radio buttons under the same name
                          value={title}
                          checked={selectedTitles === title} // Set checked if this title is selected
                          onChange={() => handleTitleChange(title)} // Update state with the selected title
                          className="form-radio h-5 w-5 text-indigo-600"
                        />
                        <label htmlFor={`title-${i}`} className="text-gray-900">
                          {title}
                        </label>
                      </div>
                    ))}
                  </form>

                  {/* Display selected title */}
                  <div className="my-4">
                    <p className="text-gray-600  ">
                      {titles.length > 0 ? " Selected Title : " : ""}{" "}
                      <span className=" ml-1 font-semibold ">
                        {selectedTitles}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaEuroSign className="mr-1" />
                    {(price * quantity).toFixed(2)}
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center">
                    <button
                      className={`px-2 py-1 rounded-l-md text-white ${
                        quantity > 1
                          ? "bg-indigo-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-900 bg-gray-200 border-t border-b">
                      {quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-indigo-600 text-white rounded-r-md"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                    onClick={handleAddToCart}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
