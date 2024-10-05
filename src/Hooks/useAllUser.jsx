import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            const users = res.data;

            // Sort users by lastLogin time in descending order
            users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return users;
        },
    });

    return [allUsers, isLoading];
};

export default useAllUsers;
