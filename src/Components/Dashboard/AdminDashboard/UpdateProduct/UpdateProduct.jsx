import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import useImageURL from "../../../ImageURL/useImageURL";
import { AiOutlineEuro } from "react-icons/ai";

const UpdateProduct = () => {

  const updateProduct = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { uploadImage, loading: uploading, error } = useImageURL();

  const {
    _id,
    ownerEmail,
    category,
    description,
    image,
    name,
    price,
    quantity,
    measurement,
    sort_description,
    add_ons_price,
    branch,
    tax,
    titles,
  } = updateProduct || {};

  const { register, handleSubmit, setValue } = useForm();
  const [images, setImages] = useState([image || ""]);
  const [loading, setLoading] = useState(false);
  const [titleCategories, setTitleCategories] = useState({}); 
  const [newCategory, setNewCategory] = useState(""); 
  const [currentCategory, setCurrentCategory] = useState(""); 
  const [currentTitle, setCurrentTitle] = useState(""); 
  const [currentPrice, setCurrentPrice] = useState("");


  useEffect(() => {
    if (updateProduct) {
      setValue("name", name);
      setValue("category", category);
      setValue("description", description);
      setValue("price", price);
      setValue("quantity", quantity);
      setValue("measurement", measurement);
      setValue("sort_description", sort_description);
      setValue("add_ons_price", add_ons_price);
      setValue("branch", branch);
      setValue("tax", tax);

      setImages(image ? [image] : []);
      setCurrentTitle(updateProduct.titles || []); 
    }
  }, [
    updateProduct,
    setValue,
    name,
    category,
    quantity,
    measurement,
    description,
    price,
    image,
    sort_description,
    add_ons_price,
    branch,
    tax,
  ]);

  // Function to handle image selection
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    // Upload new images and update state
    const newImages = [];
    for (const file of files) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        newImages.push(imageUrl);
      }
    }

    // Update images state with new images, ensure only one image is shown
    setImages(newImages.length > 0 ? [newImages[0]] : []);
  };

  // Function to remove a selected image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  
  const addTitleToCategory = () => {
    if (currentCategory && currentTitle.trim()) {
      const titleObject = {
        name: currentTitle.trim(),
        price: currentPrice ? parseFloat(currentPrice) : null, // Convert price to number or null
      };

      // Update categories
      setTitleCategories((prevCategories) => ({
        ...prevCategories,
        [currentCategory]: [
          ...(prevCategories[currentCategory] || []),
          titleObject,
        ],
      }));

      // Clear input fields
      setCurrentTitle("");
      setCurrentPrice("");
    }
  };

  // Function to handle keydown event (for Enter key)
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTitleToCategory();
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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
  
      // Assuming the first image is selected
      data.image = images[0] || "";
  
      // Ensure that titles are properly formatted as a Map of categories and titles
      data.titles = Object.entries(titleCategories).reduce((acc, [category, titles]) => {
        acc[category] = titles.map(title => ({
          name: title.name,       // Title name
          price: title.price || null, // Title price (nullable)
        }));
        return acc;
      }, {});
  
      const updateData = {
        _id,
        ownerEmail,
        ...data,
        upload_time: new Date().toISOString(),
      };
  
      const res = await axiosPublic.put(`/products/${_id}`, updateData);
  
      if (res?.data) {

        console.log(res.data);
        
        toast.success("Product updated successfully");
        setTimeout(() => {
          navigate("/dashboard/allProducts");
        }, 1000);
      }
    } catch (error) {
      console.error(error); // For debugging
      toast.error("Please Try Again");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="w-full px-2 lg:px-2 lg:py-4 bg-gray-100 rounded-lg mb-9 py-6">
      <h1 className="text-center lg:text-4xl md:text-3xl text-xl font-medium text-gray-600">
        Update Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mt-6">
          <div className="lg:flex gap-5 bg-gray-100 lg:px-4 py-4 my-2 mb-5">
            <div className="lg:w-8/12 w-full ">
              {/* Product Name */}
              <div>
                <label className="text-gray-600 text-lg">Product Name</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  {...register("name", { required: true })}
                  placeholder="Product Name"
                  defaultValue={name}
                  type="text"
                />
              </div>

              {/* Category and Price */}
              <div className="md:flex w-full items-center gap-4">
                {/* Category */}
                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Category</label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    {...register("category", { required: true })}
                    defaultValue={category}
                  >
                    <option value="">Select Category</option>
                    <option value="Entree et accompagnement">
                      Entree et accompagnement
                    </option>
                    <option value="Plat thai">Plat thai</option>
                    <option value="signature rolls(x8)">
                      signature rolls(x8)
                    </option>
                    <option value="Menu sushi">Menu sushi</option>
                    <option value="Frit rolls(x8)">Frit rolls(x8)</option>
                    <option value="Avocado rolls(x8)">Avocado rolls(x8)</option>
                    <option value="Brochettes yakitori(x2)">
                      Brochettes yakitori(x2)
                    </option>
                    <option value="California rolls(x6)">
                      California rolls(x6)
                    </option>
                    <option value="Saumon rolls(x6)">Saumon rolls(x6)</option>
                    <option value="Crispy california rolls(x6)">
                      Crispy california rolls(x6)
                    </option>
                    <option value="Spring rolls(x6)">Spring rolls(x6)</option>
                    <option value="Makis(x6)">Makis(x6)</option>
                    <option value="Flocon rolls(x6)">Flocon rolls(x6)</option>
                    <option value="Sushis">Sushis</option>
                    <option value="Best Poké bowl">Best Poké bowl</option>
                    <option value="Chirashi">Chirashi</option>
                    <option value="Sashimi saumon">Sashimi saumon</option>
                    <option value="Boissons">Boissons</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sauce">Sauce</option>
                    <option value="Formule by sayu">Formule by sayu</option>
                  </select>
                </div>

                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Branch</label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    {...register("branch", { required: true })}
                    defaultValue={branch}
                  >
                    <option value="">Select Branch</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              <div className="md:flex w-full items-center gap-4 ">
                {/* Price */}
                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Price"
                    {...register("price", { required: true })}
                    defaultValue={price}
                  />
                </div>
                {/* tax */}
                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Tax</label>
                  <input
                    type="number"
                    step="0.01"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Tax"
                    {...register("tax")}
                    defaultValue={tax}
                  />
                </div>
              </div>

              {/* Quantity and Measurement */}
              <div className="md:flex w-full items-center gap-4">
                {/* Quantity */}
                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Quantity</label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Quantity"
                    {...register("quantity")}
                    defaultValue={quantity}
                  />
                </div>

                {/* Measurement */}
                <div className="mt-2 w-full">
                  <label className="text-gray-600 text-lg">Measurement</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Measurement"
                    {...register("measurement")}
                    defaultValue={measurement}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="w-full  mt-2">
                <h1 className="text-gray-600 text-lg mb-3">Description</h1>
                <textarea
                  className="bg-gray-50  border h-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  {...register("description")}
                  placeholder="Description"
                  defaultValue={description}
                ></textarea>
              </div>
            </div>

            {/* Add-Ons Section */}

            <div className="w-full lg:w-4/12">
              <h1 className="text-center text-2xl mb-4 text-gray-600">
                Add Ons Product
              </h1>

              {/* Add New Category Section */}
              <div>
                <label className="text-gray-600 text-lg">
                  Add New Category
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                  placeholder="Enter category name"
                  value={newCategory || ""}
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
                  value={currentCategory || ""}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                >
                  <option value="">Choose a category</option>
                  {/* Dynamically populate categories from titleCategories */}
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
                  <label className="text-gray-600 text-lg mt-4">
                    Add Title
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                    placeholder="Enter title"
                    value={currentTitle || "" }
                    onChange={(e) => setCurrentTitle(e.target.value)}
                  />


                  <label className="text-gray-600 text-lg mt-4">
                    Price (Optional)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                    placeholder="Enter price (optional)"
                    value={currentPrice || ""}
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
                          <div className="flex items-center gap-1 font-semibold text-gray-900">
                            <span>{name}</span> - <AiOutlineEuro /> {price}
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
        </div>

        {/* Image Input */}
        <div className="mb-4 lg:px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 items-center mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative mr-4 mb-4">
                <img src={image} className="max-h-40 w-auto" alt="Preview" />
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

          <label htmlFor="dropzone-file" className="text-gray-600 text-lg">
            Upload Image
          </label>
          {/* Image uploader */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full lg:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a5 5 0 0 0-5 5v2a1 1 0 0 0 1 1h1m2 0h5a2 2 0 0 1 2 2v1m-3 0v-1a2 2 0 0 1 2-2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  Click to select a file or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`flex items-center justify-center w-full lg:w-3/12 mx-auto py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase text-center cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
