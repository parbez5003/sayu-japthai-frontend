import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://sayu-japthai-backend.vercel.app/api/v1",
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
