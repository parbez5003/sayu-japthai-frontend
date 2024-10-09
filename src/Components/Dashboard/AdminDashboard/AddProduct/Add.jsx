import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Add = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]); // State to store titles
  const [currentTitle, setCurrentTitle] = useState(""); // To handle input title

  // Function to handle form submission
  const onSubmit = async (data) => {

    
    try {
      setLoading(true);
      const { add_ons_price, sort_description } = data;

      const product = {
        titles, // Use the array of titles
        add_ons_price,
        sort_description,
      };

      console.log(product);

      // Simulate server response for testing purposes
      
    } catch (error) {
      toast.error("Error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding titles on Enter key press, specific to title input field only
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle.trim()) { // Only add title if it's not empty
        setTitles([...titles, currentTitle.trim()]); // Add the current title to the array
        setCurrentTitle(""); // Clear the input field
      }
    }
  };

  // Function to prevent form submission on Enter in any input except title
  const handlePreventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Function to remove a title from the array
  const removeTitle = (index) => {
    // Only remove the specific title that matches the index
    setTitles(titles.filter((_, i) => i !== index));
  };

  return (
    <section className="w-full px-2 lg:px-2 lg:py-4 bg-gray-100 rounded-lg mb-9">
      <h1 className="text-center lg:text-4xl md:text-3xl text-xl font-medium text-gray-600">
        Add Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-gray-900 text-2xl mb-4 text-center ">
            Add Ons Product
          </h1>
        </div>

        {/* Display the list of added titles */}
        {titles.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Added Titles:</h2>
            <ul className="flex flex-wrap gap-2">
              {titles.map((title, index) => (
                <li
                  key={index}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg flex items-center"
                >
                  {title}
                  <button
                    onClick={() => removeTitle(index)} // Correctly remove specific title
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Title Input */}
        <div className="mt-2 w-full">
          <label className="text-gray-600 text-lg">Title</label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Add Ons Product Title"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown} // Handle Enter key press only for the title field
          />
        </div>

        {/* Price Input */}
        <div className="mt-2 w-full">
          <label className="text-gray-600 text-lg">Price</label>
          <input
            type="number"
            step="0.01"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Price"
            {...register("add_ons_price")}
            onKeyDown={handlePreventEnterSubmit} // Prevent form submission on Enter in the price field
          />
        </div>
        {/* Price Input */}
        <div className="mt-2 w-full">
          <label className="text-gray-600 text-lg">Price</label>
          <input
            type="text"
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Price"
            {...register("add_ons_price")}
            onKeyDown={handlePreventEnterSubmit} // Prevent form submission on Enter in the price field
          />
        </div>

        {/* Description */}
        <div className="mt-2 w-full">
          <label className="text-gray-600 text-lg">Sort Description</label>
          <textarea
            className="bg-gray-50 lg:h-[60px] min-h-[45px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            {...register("sort_description")}
            placeholder="Sort Description...."
            onKeyDown={handlePreventEnterSubmit} // Prevent form submission on Enter in the description field
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full lg:w-3/12 mx-auto py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase text-center cursor-pointer"
        >
          {loading ? "Please wait..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default Add;
