"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { watchService } from "../../services/watch"

const AddWatchedMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    notes: "",
    watchedAt: new Date().toISOString().split("T")[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
            <label htmlFor="title">Movie Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie title"
              required
              disabled={loading}
            />