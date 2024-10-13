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
    titles,
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

  // State to track selected titles (with one selection per category)
  const [selectedTitles, setSelectedTitles] = useState({});

  // Function to handle single selection with the option to deselect
  const handleTitleChange = (category, title) => {
    setSelectedTitles((prevSelected) => {
      const newSelection = { ...prevSelected };

      if (newSelection[category] === title) {
        // Deselect the title if it's already selected
        delete newSelection[category];
      } else {
        // Select the title for this category, deselect the previous one if any
        newSelection[category] = title;
      }

      return newSelection;
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
        total_price: price * quantity,
        product_image: image,
        name,
        quantity,
        stock_limit: stockLimit,
        additional_food: selectedTitles || "",
      };

      try {
        const cartResponse = await axiosPublic.post(
          `/myCarts/${currentUser?.email}`,
          addCart
        );
        if (cartResponse.data) {
          toast.success("Product added to cart successfully!");
          myCartRefetch();
          setModalOpen(false);
          setSelectedTitles({});
        }
      } catch (error) {
        toast.error("Error adding product to cart.");
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Function to open and close modal
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    if (!isModalOpen) {
      setSelectedTitles({}); // Reset selected title every time modal opens
    }
  };

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
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

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-2 rounded-lg shadow-lg w-[300px] h-[500px] overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Product Image Section (Fixed) */}
              <div className="flex h-[200px] justify-center ">
                <img
                  className="w-full object-contain rounded-lg shadow-md"
                  src={image}
                  alt={name}
                />
              </div>

              {/* Modal Header (Fixed) */}
              <h3 className="text-2xl font-bold text-gray-900 text-center my-1">
                {name}
              </h3>

              {/* Scrollable Additional Items Section */}
              <div className="flex-grow overflow-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {Object.keys(titles).length > 0
                    ? "Additional Items"
                    : "No Additional Items"}
                </h3>

                {/* Loop through categories in titles */}
                <div className="space-y-4">
                  {Object.entries(titles).map(
                    ([category, items], categoryIndex) => (
                      <div key={categoryIndex}>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {category}
                        </h4>
                        <form className="space-y-2 text-gray-700">
                          {items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                id={`item-${categoryIndex}-${itemIndex}`}
                                name={category}
                                value={item.name}
                                checked={selectedTitles[category] === item.name}
                                onChange={() =>
                                  handleTitleChange(category, item.name)
                                }
                                className="form-checkbox h-5 w-5 text-indigo-600"
                              />
                              <label
                                htmlFor={`item-${categoryIndex}-${itemIndex}`}
                                className="text-gray-900"
                              >
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </form>
                      </div>
                    )
                  )}
                </div>

                {/* Display selected titles */}
                <div className="my-4">
                  <p className="text-gray-600">
                    {Object.keys(selectedTitles).length > 0
                      ? "Selected Items:"
                      : ""}
                  </p>
                  <ul className="list-decimal list-inside">
                    {Object.entries(selectedTitles).map(
                      ([category, title], index) => (
                        <li key={index} className="text-gray-800">
                          <strong>{title}</strong>{" "}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Price and Quantity Section (Fixed) */}
              <div className="flex items-center justify-between mb-4 mt-4">
                <span className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaEuroSign className="mr-1" />
                  {(price * quantity).toFixed(2)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center">
                  <button
                    className={`px-3 py-1 rounded-l-md text-white ${
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
                    className="px-3 py-1 bg-indigo-600 text-white rounded-r-md"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Modal Action Buttons (Fixed) */}
              <div className="flex justify-between mt-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white rounded-md transition duration-200 bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAddToCart}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
