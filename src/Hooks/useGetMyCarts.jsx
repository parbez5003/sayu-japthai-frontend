import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCurrentUser from "./useCurrentUser";

const useGetMyCarts = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();

    const {
        data: cartsData = [],
        isLoading,
        refetch: myCartRefetch
    } = useQuery({
        queryKey: ["myCarts"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myCarts/${currentUser?.email}`);
            return res?.data;
        },
    });

    // Calculate total price and quantity
    const price = cartsData.reduce((acc, item) => acc + item.total_price, 0);
    const quantity = cartsData.reduce((acc, item) => acc + item.quantity, 0);

    return { myCarts: cartsData, price, quantity, isLoading, myCartRefetch };
};

export default useGetMyCarts;
