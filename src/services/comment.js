import api from "./api"

export const commentService = {
  getPostComments: async (postId) => {
    const response = await api.get(`/feeds/comments/posts/${postId}/comments`)
    return response.data
  },

  createComment: async (postId, commentData) => {
    const response = await api.post(`/feeds/comments/posts/${postId}/comments`, commentData)
    return response.data
  },

  deleteComment: async (commentId) => {
    const response = await api.delete(`/feeds/comments/${commentId}`)
    return response.data
  },
}
