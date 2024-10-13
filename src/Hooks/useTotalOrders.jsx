import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTotalOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: totalOrders, // Initialize with default values
    isLoading,
    refetch: totalOrderRefetch, // Fixed the spelling
  } = useQuery({
    queryKey: ["totalOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getAllOrders");
      const totalOrders = res.data;

      // No need to sort, as this is summary data

      return totalOrders; // Returning the total orders and price
    },
  });

  return { totalOrders, isLoading, totalOrderRefetch }; // Return the correct data
};

export default useTotalOrders;
