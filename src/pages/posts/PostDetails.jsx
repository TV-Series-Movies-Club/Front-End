"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { postService } from "../../services/post"
import { commentService } from "../../services/comment"
import { useAuth } from "../../context/AuthContext"
import CommentBox from "../../components/CommentBox"

const PostDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPost = async () => {
    try {
      const response = await postService.getPost(id)
      setPost(response.post || response)
    } catch (err) {
      setError("Failed to load post")
    }
  }

  const fetchComments = async () => {
    try {
      const response = await commentService.getPostComments(id)
      setComments(response.comments || response)
    } catch (err) {
      console.error("Failed to load comments:", err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPost(), fetchComments()])
      setLoading(false)
    }

    fetchData()
  }, [id])

  const handleCommentAdded = () => {
    fetchComments()
  }

  if (loading) {
    return <div className="loading">Loading post...</div>
  }

  if (error) {
    return (
      <div className="card text-center">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/posts")} className="btn btn-primary">
          Back to Posts
        </button>
      </div>
    )
  }
  if (!post) {
    return (
      <div className="card text-center">
        <h3>Post not found</h3>
        <button onClick={() => navigate("/posts")} className="btn btn-primary">
          Back to Posts
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={() => navigate("/posts")} className="btn btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Posts
      </button>

      <div className="card">
        <h1 style={{ marginBottom: "15px" }}>{post.title}</h1>

        <div style={{ marginBottom: "20px", color: "#666" }}>
          <p>
            By {post.author?.name || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {post.movieTitle && (
            <p>
              🎬 Movie: <strong>{post.movieTitle}</strong>
            </p>
          )}
          {post.genre && (
            <p>
              🎭 Genre: <strong>{post.genre}</strong>
            </p>
          )}
          {post.rating && (
            <p>
              ⭐ Rating: <strong>{post.rating}/5</strong>
            </p>
          )}
        </div>

        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", marginBottom: "20px" }}>{post.content}</div>

        <div style={{ display: "flex", gap: "20px", color: "#666", fontSize: "14px" }}>
          <span>💬 {comments.length} comments</span>
          <span>❤️ {post.likesCount || 0} likes</span>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "20px" }}>Comments ({comments.length})</h3>

        {isAuthenticated && <CommentBox postId={id} onCommentAdded={handleCommentAdded} />}

        {comments.length === 0 ? (
          <div className="card text-center">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{comment.author?.name || "Anonymous"}</strong>
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ whiteSpace: "pre-wrap" }}>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetails