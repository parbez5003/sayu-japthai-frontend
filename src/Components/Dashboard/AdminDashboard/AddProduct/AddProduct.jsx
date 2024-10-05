import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useImageURL from "../../../ImageURL/useImageURL";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";

// Component for adding a new product
const AddProduct = () => {

    const axiosSecure = useAxiosSecure()
    const { currentUser } = useCurrentUser()
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { imageUrl: coverImageUrl, uploadImage, loading: uploading, error } = useImageURL();

    // Function to handle image selection
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    // Function to remove a selected image
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Upload all images and get their URLs
            const uploadedImageURLs = await Promise.all(images.map((file) => uploadImage(file)));

            const { name, price, description, category, quantity, measurement } = data;

            const product = {
                image: uploadedImageURLs.filter(Boolean), // Remove any null values from the array
                name,
                quantity,
                ownerEmail: currentUser.email,
                price,
                category,
                description,
                measurement,
                upload_time: new Date().toISOString(),
            };
            console.log(product);
            // Send the product data to the server
            const response = await axiosSecure.post("/products", product);

            if (response.data) {
                toast.success("Product added successfully");
                reset();
                setImages([]);
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

    return (
        <section className="w-full px-2 lg:px-2 lg:py-4 bg-gray-100 rounded-lg mb-9">
            <h1 className="text-center lg:text-4xl md:text-3xl text-xl font-medium text-gray-600">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 mt-6">
                    <div className="lg:flex gap-5">
                        <div className="lg:w-8/12 w-full rounded-md bg-gray-100 lg:px-4 py-4 my-2 mb-5">
                            {/* Product Name */}
                            <div>
                                <label className="text-gray-600 text-lg">Product Name</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                    {...register("name", { required: true })}
                                    placeholder="Product Name"
                                    type="text"
                                />
                            </div>

                            <div className="md:flex w-full items-center gap-4 ">
                                {/* Category */}
                                <div className="mt-2 w-full">
                                    <label className="text-gray-600 text-lg">Category</label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                        {...register("category", { required: true })}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Entree et accompagnement">Entree et accompagnement</option>
                                        <option value="Plat thai">Plat thai</option>
                                        <option value="signature rolls(x8)">signature rolls(x8)</option>
                                        <option value="Menu sushi">Menu sushi</option>
                                        <option value="Frit rolls(x8)">Frit rolls(x8)</option>
                                        <option value="Avocado rolls(x8)">Avocado rolls(x8)</option>
                                        <option value="Brochettes yakitori(x2)">Brochettes yakitori(x2)</option>
                                        <option value="California rolls(x6)">California rolls(x6)</option>
                                        <option value="Saumon rolls(x6)">Saumon rolls(x6)</option>
                                        <option value="Crispy california rolls(x6)">Crispy california rolls(x6)</option>
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
                                {/* Price */}
                                <div className="mt-2 w-full">
                                    <label className="text-gray-600 text-lg">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                        placeholder="Price"
                                        {...register("price", { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Quantity */}{/* measurement */}
                            <div className="md:flex w-full items-center gap-4 ">
                                {/* Quantity */}
                                <div className="mt-2 w-full">
                                    <label className="text-gray-600 text-lg">Quantity</label>
                                    <input
                                        type="number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                        placeholder="Quantity"
                                        {...register("quantity")}
                                    />
                                </div>

                                {/* measurement */}
                                <div className="mt-2 w-full">
                                    <label className="text-gray-600 text-lg">Measurement</label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                        placeholder="Measurement"
                                        {...register("measurement")}
                                    />
                                </div>
                            </div>


                        </div>

                        {/* Description */}
                        <div className="w-full lg:w-4/12 mt-2">
                            <h1 className="text-gray-600 text-lg mb-3">Description</h1>
                            <textarea
                                className="bg-gray-50 lg:h-[100px] min-h-[210px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                {...register("description")}
                                placeholder="Description"
                            ></textarea>
                        </div>
                    </div>
                </div>
                {/* Image Input */}
                <div className="mb-4 lg:px-4">
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 items-center mt-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative mr-4 mb-4">
                                <img
                                    src={URL.createObjectURL(image)} // Display image preview
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
                        <label className="block md:text-2xl text-gray-600 text-sm font-bold mb-2">Upload Images</label>
                        <input
                            id="image"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                        />




                        <div type="button"
                            onClick={() => document.querySelector("#image").click()} className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  ">


                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                {/* <input id="dropzone-file" type="file" class="hidden" /> */}
                            </label>
                        </div>



                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className=" flex items-center justify-center w-full lg:w-3/12 mx-auto py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase text-center cursor-pointer"
                >
                    {loading ? "Please wait..." : "Add Product"}
                </button>
            </form>
        </section>
    );
};

export default AddProduct;
