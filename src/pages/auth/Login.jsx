"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { authService } from "../../services/auth"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(formData)
      login(response.user, response.token)
      navigate("/")
    } catch (err) {
      setError(err)
      console.error("Login failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    handleSubmit({ preventDefault: () => {} })
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <div className="card">
        <h2 className="text-center" style={{ marginBottom: "30px" }}>
          Login to Movies Club
        </h2>

        {error && (
          <div style={{ marginBottom: "20px" }}>
            <ErrorMessage
              error={error}
              onRetry={error.type !== "AUTH_ERROR" ? handleRetry : null}
              onDismiss={() => setError(null)}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {loading && <LoadingSpinner size="small" message="" />}
          </div>
        </form>

        <p className="text-center" style={{ marginTop: "20px" }}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
