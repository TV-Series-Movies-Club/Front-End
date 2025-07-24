import api from "./api"

export const authService = {
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  logout: async () => {
    const response = await api.post("/auth/logout")
    return response.data
  },
}
