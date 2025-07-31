"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { watchService } from "../../services/watch"

const AddWatchedMovie = () => {
  const [formData, setFormData] = useState({
    movie_title: "",
    year: "",
    genre: "",
    rating: "",
    experience: "",
    watchedAt: new Date().toISOString().split("T")[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) || "" : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await watchService.addWatchedMovie(formData)
      navigate("/watched")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add movie")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Add Watched Movie</h1>
        <button onClick={() => navigate("/watched")} className="btn btn-secondary">
          Back to My Movies
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="movie_title">Movie Title</label>
            <input
              type="text"
              id="movie_title"
              name="movie_title"
              value={formData.movie_title}
              onChange={handleChange}
              placeholder="Enter movie title"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="year">Release Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear()}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                disabled={loading}
              >
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
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="rating">Your Rating</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Rate the movie</option>
                <option value="1">⭐ 1/5</option>
                <option value="2">⭐⭐ 2/5</option>
                <option value="3">⭐⭐⭐ 3/5</option>
                <option value="4">⭐⭐⭐⭐ 4/5</option>
                <option value="5">⭐⭐⭐⭐⭐ 5/5</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="watchedAt">Date Watched</label>
              <input
                type="date"
                id="watchedAt"
                name="watchedAt"
                value={formData.watchedAt}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Notes (Optional)</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Your thoughts, memorable quotes, or any notes about the movie..."
              rows="4"
              disabled={loading}
            />
          </div>

          {error && <div className="text-error">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding Movie..." : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddWatchedMovie
