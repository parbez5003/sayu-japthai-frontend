import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import DashboardLayout from '../Layout/DashboardLayout';
import Dashboard from '../Components/Dashboard/Dashboard';
import Register from '../Components/Auth/Register';
import Login from '../Components/Auth/Login';
import AllUsers from '../Components/Dashboard/AdminDashboard/AllUsers/AllUsers';
import AllProducts from '../Components/Dashboard/AdminDashboard/AllProducts/AllProducts';
import AddProduct from '../Components/Dashboard/AdminDashboard/AddProduct/AddProduct';
import UpdateProduct from '../Components/Dashboard/AdminDashboard/UpdateProduct/UpdateProduct';
import Carts from '../Components/Carts/Carts';
import Payment from '../Components/Payment/Payment';
import OrderSuccess from '../Components/OrderSuccess/OrderSuccess';
import AllOrdersProduct from '../Components/Dashboard/AdminDashboard/AllOrdersProduct/AllOrdersProduct';
import Profile from '../Components/Dashboard/UserDashboard/Profile/Profile';
import Orders from '../Components/Dashboard/UserDashboard/Orders/Orders';
import PrivateRoute from '../Provider/PrivateRoute';
import AdminPriveteRoute from '../Provider/AdminPriveteRoute';
import UserDashboard from '../Components/Dashboard/UserDashboard/UserDashboard';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/payment',
                element: <PrivateRoute >  <Payment /> </PrivateRoute>
            },
            {
                path: '/orderSuccess',
                element: <PrivateRoute > <OrderSuccess /> </PrivateRoute>
            },

            {
                path: '/carts',
                element: <PrivateRoute> <Carts /> </PrivateRoute>
            },

        ],

    },

    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: < Login />
    },

    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/allUsers',
                element: <PrivateRoute> <AdminPriveteRoute > <AllUsers /> </AdminPriveteRoute> </PrivateRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <PrivateRoute> <AdminPriveteRoute ><AddProduct /> </AdminPriveteRoute> </PrivateRoute>
            },
            {
                path: '/dashboard/allOrdersProducts',
                element: <PrivateRoute> <AdminPriveteRoute > <AllOrdersProduct /> </AdminPriveteRoute> </PrivateRoute>
            },
            {
                path: '/dashboard/allProducts',
                element: <PrivateRoute> <AdminPriveteRoute > <AllProducts /> </AdminPriveteRoute> </PrivateRoute>
            },
            {
                path: '/dashboard/userprofile',
                element: <PrivateRoute > <Profile /> </PrivateRoute>
            },
            {
                path: '/dashboard/userDashboard',
                element: <PrivateRoute > <UserDashboard /> </PrivateRoute>
            },
            {
                path: '/dashboard/orders',
                element: <PrivateRoute > <Orders /> </PrivateRoute>
            },

            {
                path: "/dashboard/updateProduct/:id",
                element: <PrivateRoute> <AdminPriveteRoute ><UpdateProduct /> </AdminPriveteRoute> </PrivateRoute>,
                loader: ({ params }) =>
                    fetch(
                        `http://localhost:5000/api/v1/products/${params.id}`
                    ),
                    // fetch(
                    //     `https://sayu-japthai-backend.vercel.app/api/v1/products/${params.id}`
                    // ),
            },

        ]
    },
]);

export default Routes;