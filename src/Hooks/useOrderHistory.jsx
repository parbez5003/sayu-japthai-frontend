
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCurrentUser from "./useCurrentUser";

const useOrderHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    

    const {
        data: orderData = [],
        isLoading,
        refetch: orderRefetch
    } = useQuery({
        queryKey: ["myorders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myorders/${currentUser?.email}`);
            const myorders = res.data;

            myorders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            return myorders;
        },
    });

  
    return { orderData, isLoading, orderRefetch };
};

export default useOrderHistory;
