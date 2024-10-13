import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useImageURL from "../../../ImageURL/useImageURL";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { AiOutlineEuro } from "react-icons/ai";

// Input field component
const InputField = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  required,
  step,
  preventEnter,
}) => (
  <div className="mt-2 w-full">
    <label className="text-gray-600 text-lg">{label}</label>
    <input
      type={type}
      step={step}
      placeholder={placeholder}
      {...register(name, { required })}
      onKeyDown={
        preventEnter ? (e) => e.key === "Enter" && e.preventDefault() : null
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
    />
  </div>
);

// Select field component
const SelectField = ({
  label,
  options,
  register,
  name,
  required,
  preventEnter,
}) => (
  <div className="mt-2 w-full">
    <label className="text-gray-600 text-lg">{label}</label>
    <select
      {...register(name, { required })}
      onKeyDown={
        preventEnter ? (e) => e.key === "Enter" && e.preventDefault() : null
      }
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Main Component for adding a product
const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useCurrentUser();
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);
  const [titleCategories, setTitleCategories] = useState({}); // Dynamic categories for titles and prices
  const [newCategory, setNewCategory] = useState(""); // Track the new category input
  const [currentCategory, setCurrentCategory] = useState(""); // No default, since categories are dynamic
  const [currentTitle, setCurrentTitle] = useState(""); // Track the title input
  const [currentPrice, setCurrentPrice] = useState(""); // Track the price input for the title
  const [loading, setLoading] = useState(false);

  const {
    imageUrl: coverImageUrl,
    uploadImage,
    loading: uploading,
  } = useImageURL();

  // Image handling functions
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Submit function
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const uploadedImageURLs = await Promise.all(
        images.map((file) => uploadImage(file))
      );
      const product = {
        ...data,
        image: uploadedImageURLs.filter(Boolean),
        ownerEmail: currentUser.email,
        titles: titleCategories, // Save categories and titles with prices here
        upload_time: new Date().toISOString(),
      };
  
      const response = await axiosSecure.post("/products", product);
      if (response.data) {

        console.log(response.data);
        
        toast.success("Product added successfully");
        reset();
        setImages([]);
        setTitleCategories({}); // Reset categories after submission
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Title management
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" && currentTitle.trim() && currentPrice) {
      e.preventDefault();
      addTitleToCategory();
    }
  };

 
  // Add title and price to the selected category
  const addTitleToCategory = () => {
    if (currentCategory && currentTitle.trim()) {
      const titleObject = {
        name: currentTitle.trim(),
        price: currentPrice ? parseFloat(currentPrice) : null, // Set to null if price is empty
      };
      setTitleCategories((prevCategories) => ({
        ...prevCategories,
        [currentCategory]: [
          ...(prevCategories[currentCategory] || []),
          titleObject,
        ],
      }));
      setCurrentTitle("");
      setCurrentPrice("");
    }
  };

  // Add a new category dynamically
  const addCategory = () => {
    if (newCategory.trim()) {
      setTitleCategories((prevCategories) => ({
        ...prevCategories,
        [newCategory]: [],
      }));
      setNewCategory(""); // Reset input field
      setCurrentCategory(newCategory); // Set the newly added category as the current one
    }
  };

  // Remove title from a category
  const removeTitle = (category, index) => {
    setTitleCategories((prevCategories) => ({
      ...prevCategories,
      [category]: prevCategories[category].filter((_, i) => i !== index),
    }));
  };

  // Remove an entire category
  const removeCategory = (category) => {
    setTitleCategories((prevCategories) => {
      const { [category]: _, ...rest } = prevCategories;
      return rest;
    });
    if (currentCategory === category) {
      setCurrentCategory(""); // Reset current category if it's removed
    }
  };

  return (
    <section className="w-full px-2 lg:px-2 lg:py-4 bg-gray-100 rounded-lg mb-9">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex gap-5 bg-gray-100 lg:px-4 py-4 my-2 mb-5">
          <div className="lg:w-8/12 w-full ">
            <h1 className="text-center text-2xl mb-4 text-gray-600 ">
              Add Product
            </h1>
            <InputField
              label="Product Name"
              name="name"
              placeholder="Product Name"
              register={register}
              required
            />
            <div className="md:flex w-full items-center gap-4">
              <SelectField
                label="Category"
                options={[
                  "Entree et accompagnement",
                  "Plat thai",
                  "signature rolls(x8)",
                ]}
                register={register}
                name="category"
                required
              />
              <SelectField
                label="Branch"
                options={["A", "B"]}
                register={register}
                name="branch"
              />
            </div>
            <div className="md:flex w-full items-center gap-4">
              <InputField
                label="Price"
                name="price"
                type="number"
                step="0.001"
                register={register}
                required
              />
              <InputField
                label="Tax"
                name="tax"
                type="number"
                step="0.01"
                register={register}
              />
            </div>
            <div className="md:flex w-full items-center gap-4">
              <InputField
                label="Quantity"
                name="quantity"
                type="number"
                register={register}
              />
              <InputField
                label="Measurement"
                name="measurement"
                register={register}
              />
            </div>

            <div className="w-full">
              <h1 className="text-gray-600 text-lg ">Description</h1>
              <textarea
                className="bg-gray-50 h-[150px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                {...register("description")}
                placeholder="Description"
              />
            </div>
          </div>

          {/* Add-Ons Section */}

          <div className=" w-full lg:w-4/12">
            <h1 className="text-center text-2xl mb-4 text-gray-600  ">
              Add Ons Product
            </h1>
            <div>
              <label className="text-gray-600 text-lg">Add New Category</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
              />
              <button
                type="button"
                onClick={addCategory}
                className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg"
              >
                Add Category
              </button>
            </div>

            {/* Dynamic category selection */}
            <div>
              <label className="text-gray-600 text-lg">Select Category</label>
              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
              >
                <option value="">Choose a category</option>
                {Object.keys(titleCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Title and Price to selected category */}
            {currentCategory && (
              <div>
                <label className="text-gray-600 text-lg mt-4 ">Add Title</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                  placeholder="Enter title"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                />
                <label className="text-gray-600 text-lg mt-4">
                  Price (Optional)
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3 "
                  placeholder="Enter price (optional)"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  onKeyDown={handleTitleKeyDown}
                />
                <button
                  type="button"
                  onClick={addTitleToCategory}
                  className="mt-2 py-1 px-4 bg-green-500 text-white rounded-lg"
                >
                  Add Ons , Add
                </button>
              </div>
            )}

            {/* Display dynamic categories, titles, and prices */}
            <div className="mt-5">
              {Object.entries(titleCategories).map(([category, titles]) => (
                <div key={category} className="mb-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-600 text-lg capitalize">
                      {category}
                    </h2>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove Category
                    </button>
                  </div>
                  <ul>
                    {titles.map(({ name, price }, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-1 font-semibold text-gray-900 ">
                          <span className="   ">{name}</span> -{" "}
                          <AiOutlineEuro /> {price}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTitle(category, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          
        </div>

        {/* Image Upload Section */}
        <div className="my-8 lg:px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 items-center mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative mr-4 mb-4">
                <img
                  src={URL.createObjectURL(image)}
                  className="max-h-40 w-auto"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-[#eae7e3] text-white p-1 rounded-full"
                >
                  <MdDelete color="red" size={20} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block md:text-2xl text-gray-600 text-sm font-bold mb-2">
              Upload Images
            </label>
            <input
              id="image"
              type="file"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />

            <div
              type="button"
              onClick={() => document.querySelector("#image").click()}
              className="flex items-center justify-center w-full"
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full md:h-40 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* SVG Icon for Upload */}
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 w-full text-center">
          <button
            type="submit"
            disabled={loading || uploading}
            className={`py-2 px-6 text-white bg-blue-500 hover:bg-blue-700 rounded-lg ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading || uploading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
