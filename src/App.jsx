import { RouterProvider } from "react-router"
import { AuthProvider } from "./context/AuthContext"
import router from "./routes/router"
import { ThemeProvider } from "./context/ThemeContext"


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
