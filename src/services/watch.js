import api from "./api"

export const watchService = {
  getWatchedMovies: async () => {
    const response = await api.get("/watch/")
    return response.data
  },

  addWatchedMovie: async (movieData) => {
    const response = await api.post("/watch/", movieData)
    return response.data
  },

  removeWatchedMovie: async (movieId) => {
    const response = await api.delete(`/watch/${movieId}`)
    return response.data
  },
}
