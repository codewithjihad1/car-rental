import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <div>Error loading page</div>,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ],
    },
]);


export default router;