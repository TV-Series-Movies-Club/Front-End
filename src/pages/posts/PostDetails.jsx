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