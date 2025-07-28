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
      {movies.length === 0 ? (
        <div className="card text-center">
          <h3>No movies tracked yet</h3>
          <p>Start building your movie collection!</p>
          <Link to="/watched/add" className="btn btn-primary">
            Add Your First Movie
          </Link>
        </div>
      ) : (
        <div className="grid grid-3">
          {movies.map((movie) => (
            <div key={movie.id} className="card">
              <h3>{movie.title}</h3>
              <p style={{ color: "#666", marginBottom: "10px" }}>{movie.year && `Year: ${movie.year}`}</p>
              {movie.genre && <p style={{ color: "#666", marginBottom: "10px" }}>Genre: {movie.genre}</p>}
              {movie.rating && (
                <p style={{ marginBottom: "10px" }}>
                  Your Rating: {"⭐".repeat(movie.rating)} ({movie.rating}/5)
                </p>
              )}
              {movie.notes && <p style={{ marginBottom: "15px", fontStyle: "italic" }}>"{movie.notes}"</p>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Watched: {new Date(movie.watchedAt || movie.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="btn btn-danger"
                  style={{ fontSize: "12px", padding: "5px 10px" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WatchedMovies