import axios from "axios"

const API_BASE_URL = "https://back-end-q8gk.onrender.com"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
})

// Request interceptor to add auth token and loading state
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add timestamp for request tracking
    config.metadata = { startTime: new Date() }

    return config
  },
  (error) => {
    console.error("Request interceptor error:", error)
    return Promise.reject({
      type: "REQUEST_ERROR",
      message: "Failed to send request",
      originalError: error,
    })
  },
)

// Response interceptor to handle auth errors and provide better error messages
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date()
    const duration = endTime - response.config.metadata.startTime
    console.log(`API Request completed in ${duration}ms:`, response.config.url)

    return response
  },
  (error) => {
    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        type: "TIMEOUT_ERROR",
        message: "Request timed out. Please check your connection and try again.",
        originalError: error,
      })
    }

    if (!error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Network error. Please check your internet connection.",
        originalError: error,
      })
    }

    const { status, data } = error.response

    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Don't redirect if already on login page
      if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
        window.location.href = "/login"
      }

      return Promise.reject({
        type: "AUTH_ERROR",
        message: "Your session has expired. Please log in again.",
        status,
        originalError: error,
      })
    }

    // Handle different HTTP status codes
    const errorMessages = {
      400: data?.message || "Invalid request. Please check your input.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      409: data?.message || "This action conflicts with existing data.",
      422: data?.message || "Invalid data provided.",
      429: "Too many requests. Please wait a moment and try again.",
      500: "Server error. Please try again later.",
      502: "Service temporarily unavailable. Please try again later.",
      503: "Service temporarily unavailable. Please try again later.",
    }

    return Promise.reject({
      type: "HTTP_ERROR",
      message: errorMessages[status] || data?.message || "An unexpected error occurred.",
      status,
      data,
      originalError: error,
    })
  },
)

export default api
