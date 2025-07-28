"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { watchService } from "../../services/watch"

const WatchedMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchWatchedMovies = async () => {
    try {
      const response = await watchService.getWatchedMovies()
      setMovies(response.movies || response)
    } catch (err) {
      setError("Failed to load watched movies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWatchedMovies()
  }, [])

  const handleRemoveMovie = async (movieId) => {
    try {
      await watchService.removeWatchedMovie(movieId)
      fetchWatchedMovies() // Refresh the list
    } catch (err) {
      setError("Failed to remove movie")
    }
  }

  if (loading) {
    return <div className="loading">Loading your watched movies...</div>
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>My Watched Movies</h1>
        <Link to="/watched/add" className="btn btn-primary">
          Add Movie
        </Link>
      </div>

      {error && <div className="text-error">{error}</div>}
