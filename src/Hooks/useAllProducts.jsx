import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useAllProducts = (page, limit, searchItems) => {

    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure()

    const { data: products = [], isLoading, refetch: refetchProduct, } = useQuery({
        queryKey: ["products", page, limit, searchItems],
        queryFn: async () => {
            const url = `/products?page=${page}&limit=${limit}&searchItems=${JSON.stringify(
                searchItems
            )}`;
            const res = await axiosPublic.get(url);
            return res.data;
        },
    });


    return [products, isLoading, refetchProduct];
};

export default useAllProducts;
