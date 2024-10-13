import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useAllProducts from "../../../../Hooks/useAllProducts";
import Loading from "../../../Shared/Loading/Loading";
import CustomModal from "../../../Shared/CustomModal/CustomModal";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { FaEuroSign } from "react-icons/fa";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [products, isLoading, refetchProduct] = useAllProducts();

  console.log(products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: "",
  });

  const handleDeleteProduct = (id, name) => {
    setSelectedProduct({ id, name });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const { id, name } = selectedProduct;
    axiosPublic
      .delete(`/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Your product "${name}" has been deleted.`);

          refetchProduct();
        } else {
          toast.error(
            `An error occurred " ${name}" while deleting the product.`
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="px-2 md:py-3 text-gray-800 bg-gray-200">
        {products?.length === 0 ? (
          ""
        ) : (
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium py-4">All Product List</h1>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full mt-2">
                  <thead>
                    <tr className="text-indigo-500 hover:text-indigo-700">
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                        N/A
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                        Product Name
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                        Image
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                        Category
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                        Branch
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                        Additional Item
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg p-2">
                        Quantity
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                        Price
                      </th>
                      <th className="border bg-gray-100 border-gray-300 text-center text-sm md:text-md lg:text-lg py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <AnimatePresence>
                    <tbody>
                      {products?.map((product, i) => (
                        <motion.tr
                          key={product._id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <td className="border bg-white border-gray-200 p-2 text-center">
                            {i + 1}
                          </td>
                          <td className="border bg-white border-gray-200 md:p-2 p-1 text-sm w-60">
                            {product.name}
                          </td>
                          <td className="border bg-white border-gray-200 p-2">
                            <img
                              className="w-20 md:h-16 rounded-lg mx-auto"
                              src={product?.image[0]}
                              alt=""
                            />
                          </td>

                          <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                            {product?.category}
                          </td>
                          <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                            {product?.branch}
                          </td>

                          <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                            {product?.titles &&
                            typeof product.titles === "object" &&
                            Object.keys(product.titles).length > 0 ? (
                              <ul>
                                {Object.entries(product.titles).map(
                                  ([title, items], index) => (
                                    <li key={index}>
                                      <strong>{title}</strong> (
                                      {Array.isArray(items) ? items.length : 0})
                                      <ul className="pl-4 ">
                                        {Array.isArray(items) &&
                                          items.map((item, idx) => (
                                            <li key={idx}>
                                              {idx + 1}. {item.name}
                                            </li>
                                          ))}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              "N/A"
                            )}
                          </td>

                          <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                            {product?.quantity}
                          </td>
                          <td className="border bg-white border-gray-200 p-4 text-sm md:text-md text-center">
                            <div className="flex items-center justify-center gap-1">
                              <FaEuroSign /> {product?.price}
                            </div>
                          </td>
                          <td className="border bg-white border-gray-200 p-2 text-sm md:text-md text-center">
                            <div className="flex items-center justify-center lg:gap-6 md:gap-4 gap-2">
                              <Link
                                to={`/dashboard/updateProduct/${product?._id}`}
                              >
                                <span className="text-xl cursor-pointer">
                                  <CiEdit />
                                </span>
                              </Link>
                              <span
                                onClick={() =>
                                  handleDeleteProduct(
                                    product?._id,
                                    product?.name
                                  )
                                }
                                className="md:text-2xl text-xl text-red-600 cursor-pointer"
                              >
                                <MdDelete />
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </AnimatePresence>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </div>

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

export default AllProducts;
