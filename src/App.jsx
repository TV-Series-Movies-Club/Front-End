import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </AuthProvider>
  )
}

export default App
