import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <div>Error loading page</div>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "available-cars",
                element: <div>Available Cars Page</div>,
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
    }
]);


export default router;