import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import CustomModal from "../Shared/CustomModal/CustomModal";
import { toast } from "react-hot-toast";
import { FaEuroSign } from "react-icons/fa";


const CartsDetails = ({ cart, myCartRefetch, i }) => {

    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(cart?.quantity);
    const axiosSecure = useAxiosSecure();


    // modal and delete product 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ id: null, name: '' });


    const handleIncrement = async (id) => {
        if (quantity < cart?.stock_limit) {
            const newQuantity = quantity + 1;
            const newTotalPrice = newQuantity * cart?.unit_price;

            setQuantity(newQuantity);

            try {
                await axiosSecure.patch(`/myCarts/${id}`, {
                    quantity: newQuantity,
                    total_price: newTotalPrice,
                });
                myCartRefetch();
            } catch (error) {
                toast.error("Failed to update quantity.");
            }
        } else {
            setError(`Oops, this Food's limit is ${cart?.stock_limit}`);
        }
    };

    const handleDecrement = async (id) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            const newTotalPrice = newQuantity * cart?.unit_price;

            setQuantity(newQuantity);
            setError(""); // Clear any previous error messages

            try {
                await axiosSecure.patch(`/myCarts/${id}`, {
                    quantity: newQuantity,
                    total_price: newTotalPrice,
                });
                myCartRefetch();
            } catch (error) {
                toast.error("Failed to update quantity.");
            }
        } else {
            setError("Quantity cannot be less than 1.");
        }
    };





    // delete a cart
    const handleDeleteCart = (id, name) => {
        setSelectedProduct({ id, name });
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        const { id, name } = selectedProduct;
        axiosSecure
            .delete(`/myCarts/${id}`)
            .then((response) => {
                if (response.status === 200) {

                    toast.success(`Your product "${name}" has been deleted.`)

                    myCartRefetch();
                } else {
                    toast.error(`An error occurred " ${name}" while deleting the product.`)
                }
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            })
            .finally(() => {
                setIsModalOpen(false);
            });
    };





    return (
        <>
            <tr className="border-b bg-black text-gray-300">
                <td className="border bg-black border-gray-600 md:p-2 p-1 text-sm text-center w-60">
                    {i + 1}
                </td>
                <td className="border bg-black border-gray-600 md:p-2 p-1 text-sm text-center w-60">
                    {cart?.name}
                </td>
                <td className="border bg-black border-gray-600 p-2 text-center">
                    <img className="w-20 md:h-16 rounded-lg mx-auto" src={cart?.product_image}
                        alt={cart?.name} />
                </td>
                <td className="border bg-black border-gray-600 p-2 text-sm md:text-md text-center">
                    <div className="flex items-center justify-center gap-1">
                        <FaEuroSign /> {cart?.unit_price}
                    </div>
                </td>


                <td className="border bg-black border-gray-600 p-2 text-sm md:text-md text-center">
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={() => handleDecrement(cart?._id)} className="bg-gray-300 p-2 rounded">
                            <FaMinus className="text-gray-800" />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => handleIncrement(cart?._id)} className="bg-gray-300 p-2 rounded">
                            <FaPlus className="text-gray-800" />
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </td>

                <td className="border bg-black border-gray-600 p-2 text-sm md:text-md text-center">

                    <div className="flex items-center justify-center gap-1">
                        <FaEuroSign /> {cart?.total_price}
                    </div>
                    
                </td>
                <td className="border bg-black border-gray-600 p-2 text-sm md:text-md text-center">
                    <div className="flex items-center justify-center gap-4">

                        <button
                            onClick={() => handleDeleteCart(cart?._id, cart?.name)}
                            className="text-red-500"
                        >
                            <RxCross2 size={30} />
                        </button>
                    </div>
                </td>
            </tr>


            {/* Custom Modal */}
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={`Delete product`}
                text={`Are you sure you want to delete the product "${selectedProduct.name}"?`}
            />
        </>
    );
};

export default CartsDetails;
