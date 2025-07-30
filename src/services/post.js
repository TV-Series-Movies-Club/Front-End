// src/services/post.js

import api from "./api"

export const postService = {
  getAllPosts: async () => {
    const response = await api.get("/posts/")
    return response.data
  },

  getPost: async (postId) => {
    const response = await api.get(`/posts/${postId}`)
    return response.data
  },

  createPost: async (postData) => {
    const response = await api.post("/posts/", postData)
    return response.data
  },

  updatePost: async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData)
    return response.data
  },

  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`)
    return response.data
  },
}
