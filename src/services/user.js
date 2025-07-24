import api from "./api"

export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/me")
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData)
    return response.data
  },

  changePassword: async (passwordData) => {
    const response = await api.put("/users/profile/password", passwordData)
    return response.data
  },

  followUser: async (userId) => {
    const response = await api.post(`/users/follow/${userId}`)
    return response.data
  },

  unfollowUser: async (userId) => {
    const response = await api.post(`/users/unfollow/${userId}`)
    return response.data
  },

  getFollowers: async (userId) => {
    const response = await api.get(`/users/${userId}/followers`)
    return response.data
  },

  getFollowing: async (userId) => {
    const response = await api.get(`/users/${userId}/following`)
    return response.data
  },
}
