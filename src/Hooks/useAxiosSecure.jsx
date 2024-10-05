import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    // baseURL: "https://sayu-japthai-backend.vercel.app/api/v1",
    baseURL : "http://localhost:5000/api/v1",
    withCredentials: true

})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use((config) =>{
        const token = localStorage.getItem('access-token');
        
        config.headers.authorization = `Bearer ${token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    });
   
    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async(error) =>{
        const status = error.response?.status;
        if(status === 401 || status === 403){
            await logOut();
            navigate('/');
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;