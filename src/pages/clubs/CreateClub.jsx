"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { clubService } from "../../services/club"

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
    isPrivate: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await clubService.createClub(formData)
      navigate(`/clubs/${response.club?.id || response.id}`)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create club")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Create New Club</h1>
        <button onClick={() => navigate("/clubs")} className="btn btn-secondary">
          Back to Clubs
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Club Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter club name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your club and what it's about..."
              rows="4"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Primary Genre (Optional)</label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleChange} disabled={loading}>
              <option value="">All Genres</option>
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
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                disabled={loading}
              />
              Private Club (invitation only)
            </label>
          </div>

          {error && <div className="text-error">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating Club..." : "Create Club"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateClub
