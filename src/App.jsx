import { RouterProvider } from "react-router"
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from "./context/AuthContext"
import router from "./routes/router"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastContainer } from "react-toastify"
import { queryClient } from "./config/queryClient"


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
