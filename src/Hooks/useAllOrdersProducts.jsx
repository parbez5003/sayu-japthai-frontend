import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllOrdersProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allOrdersProducts = [], isLoading  , refetch : orderRefetch} = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allOrders");
            const allOrders = res.data;

            // Sort allOrders by lastLogin time in descending order
            allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

            return allOrders;
        },
    });

    return { allOrdersProducts, isLoading  , orderRefetch};
};

export default useAllOrdersProducts;
