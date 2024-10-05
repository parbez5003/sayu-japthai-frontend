import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import useImageURL from "../../../ImageURL/useImageURL";

const UpdateProduct = () => {
    const updateProduct = useLoaderData();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { uploadImage, loading: uploading, error } = useImageURL();

    const { _id, ownerEmail, category, description, image, name, price, quantity, measurement } = updateProduct || {};

    const { register, handleSubmit, setValue } = useForm();

    const [images, setImages] = useState([image || ""]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (updateProduct) {
            setValue("name", name);
            setValue("category", category);
            setValue("description", description);
            setValue("price", price);
            setValue("quantity", quantity);
            setValue("measurement", measurement);

            setImages(image ? [image] : []);
        }
    }, [updateProduct, setValue, name, category, quantity, measurement, description, price, image]);

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

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Add the image URLs to the form data
            data.image = images[0] || ""; // Use only the first image URL

            const updateData = {
                _id,
                ownerEmail,
                ...data,
                upload_time: new Date().toISOString(),
            };

            const res = await axiosPublic.put(`/products/${_id}`, updateData);

            if (res?.data) {
                toast.success("Product updated successfully");
                setTimeout(() => {
                    navigate("/dashboard/allProducts");
                }, 1000);
            }
        } catch (error) {
            toast.error("Please Try Again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full px-2 lg:px-2 lg:py-4 bg-gray-100 rounded-lg mb-9 py-6">
            <h1 className="text-center lg:text-4xl md:text-3xl text-xl font-medium text-gray-600">Update Product</h1>
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
                                        defaultValue={price}
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
                        </div>
                        {/* Description */}
                        <div className="w-full lg:w-4/12 mt-2">
                            <h1 className="text-gray-600 text-lg mb-3">Description</h1>
                            <textarea
                                className="bg-gray-50 lg:min-h-[300px] md:min-h-[150px] min-h-[100px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                {...register("description")}
                                placeholder="Description"
                                defaultValue={description}
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
                                    src={image}
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

                    <label htmlFor="dropzone-file" className="text-gray-600 text-lg">Upload Image</label>
                    {/* Image uploader */}
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full lg:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a5 5 0 0 0-5 5v2a1 1 0 0 0 1 1h1m2 0h5a2 2 0 0 1 2 2v1m-3 0v-1a2 2 0 0 1 2-2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">Click to select a file or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                    className={`w-full lg:w-1/4 mx-auto px-5 py-2 text-center text-white font-medium rounded-md bg-blue-500 hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </section>
    );
};

export default UpdateProduct;
