import api from "./api"

export const clubService = {
  getAllClubs: async () => {
    const response = await api.get("/clubs/")
    return response.data
  },

  getClub: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}`)
    return response.data
  },

  createClub: async (clubData) => {
    const response = await api.post("/clubs/", clubData)
    return response.data
  },

  joinClub: async (clubId) => {
    const response = await api.post(`/clubs/${clubId}/join`)
    return response.data
  },

  leaveClub: async (clubId) => {
    const response = await api.delete(`/clubs/${clubId}/join`)
    return response.data
  },
}
