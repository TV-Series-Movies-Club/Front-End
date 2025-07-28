"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { postService } from "../../services/post"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    movieTitle: "",
    genre: "",
    rating: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await postService.createPost(formData)
      navigate(`/posts/${response.post?.id || response.id}`)
    } catch (err) {
      setError(err)
      console.error("Failed to create post:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    handleSubmit({ preventDefault: () => {} })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Create New Post</h1>
        <button onClick={() => navigate("/posts")} className="btn btn-secondary" disabled={loading}>
          Back to Posts
        </button>
      </div>
      <div className="card">
        {error && (
          <div style={{ marginBottom: "20px" }}>
            <ErrorMessage error={error} onRetry={handleRetry} onDismiss={() => setError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What's your post about?"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="movieTitle">Movie Title (Optional)</label>
            <input
              type="text"
              id="movieTitle"
              name="movieTitle"
              value={formData.movieTitle}
              onChange={handleChange}
              placeholder="Which movie are you discussing?"
              disabled={loading}
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="genre">Genre (Optional)</label>
              <select id="genre" name="genre" value={formData.genre} onChange={handleChange} disabled={loading}>
                <option value="">Select Genre</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="thriller">Thriller</option>
                <option value="documentary">Documentary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Your Rating (Optional)</label>
              <select id="rating" name="rating" value={formData.rating} onChange={handleChange} disabled={loading}>
                <option value="">Rate the movie</option>
                <option value="1">⭐ 1/5</option>
                <option value="2">⭐⭐ 2/5</option>
                <option value="3">⭐⭐⭐ 3/5</option>
                <option value="4">⭐⭐⭐⭐ 4/5</option>
                <option value="5">⭐⭐⭐⭐⭐ 5/5</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your thoughts, review, or discussion points..."
              rows="8"
              required
              disabled={loading}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating Post..." : "Create Post"}
            </button>
            {loading && <LoadingSpinner size="small" message="" />}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost