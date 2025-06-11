import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddCar from "../pages/AddCar";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/CarDetails";
import ErrorNotFoundPage from "../pages/ErrorNotFoundPage";
import MyCars from "../pages/myCars/MyCars";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home />,
            }, {
                path: "available-cars",
                element: <AvailableCars />,
            }, {
                path: "car-details/:id",
                element: <CarDetails />,
            }, {
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
                        <div>My Bookings Page</div>
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
        path: "*",
        element: <ErrorNotFoundPage />,
    }
]);


export default router;