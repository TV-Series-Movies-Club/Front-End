"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { clubService } from "../../services/club"
import ClubCard from "../../components/ClubCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"

const AllClubs = () => {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { isAuthenticated } = useAuth()

  const fetchClubs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const response = await clubService.getAllClubs()
      setClubs(response.clubs || response || [])
    } catch (err) {
      setError(err)
      console.error("Failed to fetch clubs:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  const handleRetry = () => {
    fetchClubs()
  }

  const handleRefresh = () => {
    fetchClubs(true)
  }

  if (loading && !refreshing) {
    return <LoadingSpinner size="large" message="Loading movie clubs..." />
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h1>Movie Clubs</h1>
          {refreshing && <LoadingSpinner size="small" message="" />}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRefresh} className="btn btn-secondary" disabled={refreshing}>
            {refreshing ? "Refreshing..." : "🔄 Refresh"}
          </button>
          {isAuthenticated && (
            <Link to="/clubs/create" className="btn btn-primary">
              Create New Club
            </Link>
          )}
        </div>
      </div>

      {error && <ErrorMessage error={error} onRetry={handleRetry} onDismiss={() => setError(null)} />}

      {!error && clubs.length === 0 && !loading ? (
        <div className="card text-center">
          <h3>No clubs yet</h3>
          <p>Be the first to create a movie club!</p>
          {isAuthenticated && (
            <Link to="/clubs/create" className="btn btn-primary">
              Create First Club
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-3">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllClubs
