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

 createClub: async (clubData, token) => {
  const response = await api.post("/clubs/", clubData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data
},


 joinClub: async (clubId) => {
  const response = await api.post(`/clubs/join/${clubId}`)
  return response.data
},

 leaveClub: async (clubId) => {
  const response = await api.post(`/clubs/${clubId}/leave`)
  return response.data
},

}
