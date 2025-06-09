import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddCar from "../pages/AddCar";
import ErrorNotFoundPage from "../pages/ErrorNotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [{
            index: true,
            element: <Home />,
        },
        {
            path: "available-cars",
            element: <div>Available Cars Page</div>,
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
                    <div>My Cars Page</div>
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
        {
            path: "*",
            element: <ErrorNotFoundPage />,
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