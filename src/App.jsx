import { RouterProvider } from "react-router"
import { AuthProvider } from "./context/AuthContext"
import router from "./routes/router"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastContainer } from "react-toastify"


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
