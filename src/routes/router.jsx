import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import CarDetails from "../pages/CarDetails/CarDetails";
import AddCar from "../pages/AddCar/AddCar";
import PrivateRoute from "../components/PrivateRoute";
import MyCars from "../pages/myCars/MyCars";
import MyBookings from "../pages/MyBookings/MyBookings";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";
import ErrorNotFoundPage from "../pages/ErrorPage/ErrorNotFoundPage";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import DashboardStats from "../pages/Dashboard/components/DashboardStats";
import AvailableCars from "../pages/AvailableCars/AvailableCars";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "available-cars",
                element: <AvailableCars />,
            },
            {
                path: "car-details/:id",
                Component: CarDetails,
            },
            {
                path: "add-car",
                element: (
                    <PrivateRoute>
                        <AddCar />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-cars",
                element: (
                    <PrivateRoute>
                        <MyCars />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-bookings",
                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                ),
            },
        ],

    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            }, {
                path: "signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardStats />,
            },
            {
                path: "add-car",
                element: (
                    <PrivateRoute>
                        <AddCar />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-cars",
                element: (
                    <PrivateRoute>
                        <MyCars />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-bookings",
                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                ),
            },
        ],
    },

    {
        path: "*",
        element: <ErrorNotFoundPage />,
    }
]);


export default router;