"use client"

import { useState } from "react"
import { commentService } from "../services/comment"

const CommentBox = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    setLoading(true)
    setError("")

    try {
      await commentService.createComment(postId, { content: comment })
      setComment("")
      if (onCommentAdded) onCommentAdded()
    } catch (err) {
      setError("Failed to add comment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          disabled={loading}
        />
      </div>
      {error && <div className="text-error">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading || !comment.trim()}>
        {loading ? "Adding..." : "Add Comment"}
      </button>
    </form>
  )
}

export default CommentBox