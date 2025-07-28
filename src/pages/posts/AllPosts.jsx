"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { postService } from "../../services/post"
import PostCard from "../../components/PostCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { isAuthenticated } = useAuth()

  const fetchPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const response = await postService.getAllPosts()
      setPosts(response.posts || response || [])
    } catch (err) {
      setError(err)
      console.error("Failed to fetch posts:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const handleRetry = () => {
    fetchPosts()
  }

  const handleRefresh = () => {
    fetchPosts(true)
  }

  if (loading && !refreshing) {
    return <LoadingSpinner size="large" message="Loading movie posts..." />
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h1>Movie Posts</h1>
          {refreshing && <LoadingSpinner size="small" message="" />}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRefresh} className="btn btn-secondary" disabled={refreshing}>
            {refreshing ? "Refreshing..." : "🔄 Refresh"}
          </button>
          {isAuthenticated && (
            <Link to="/posts/create" className="btn btn-primary">
              Create New Post
            </Link>
          )}
        </div>
      </div>

      {error && <ErrorMessage error={error} onRetry={handleRetry} onDismiss={() => setError(null)} />}

      {!error && posts.length === 0 && !loading ? (
        <div className="card text-center">
          <h3>No posts yet</h3>
          <p>Be the first to share your movie thoughts!</p>
          {isAuthenticated && (
            <Link to="/posts/create" className="btn btn-primary">
              Create First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllPosts