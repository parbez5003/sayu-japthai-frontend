import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllArchidedOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allArchiveOrders = [],
    isLoading,
    refetch: archiveOrderRefetch,
  } = useQuery({
    queryKey: ["allArchiveOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/isAllArchivedOrders");
      const allArchiveOrders = res.data;

      // Sort allOrders by lastLogin time in descending order
      allArchiveOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

      return allArchiveOrders;
    },
  });

  return { allArchiveOrders, isLoading, archiveOrderRefetch };
};

export default useAllArchidedOrders;
