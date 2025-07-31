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
      fetchWatchedMovies()
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
              <h3>{movie.movie_title}</h3>

              {movie.year && (
                <p style={{ color: "#666", marginBottom: "5px" }}>Year: {movie.year}</p>
              )}
              {movie.genre && (
                <p style={{ color: "#666", marginBottom: "5px" }}>Genre: {movie.genre}</p>
              )}
              {movie.rating && (
                <p style={{ color: "#666", marginBottom: "5px" }}>
                  Rating: {"⭐".repeat(movie.rating)} ({movie.rating}/5)
                </p>
              )}
              {movie.experience && (
                <p style={{ fontStyle: "italic", marginBottom: "10px" }}>"{movie.experience}"</p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Watched: {new Date(movie.watched_on).toLocaleDateString()}
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
