"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { clubService } from "../../services/club"
import { useAuth } from "../../context/AuthContext"

const ClubDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const [club, setClub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [joinLoading, setJoinLoading] = useState(false)

  const fetchClub = async () => {
    try {
      const response = await clubService.getClub(id)
      setClub(response.club || response)
    } catch (err) {
      setError("Failed to load club")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClub()
  }, [id])

  const handleJoinClub = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setJoinLoading(true)
    try {
      await clubService.joinClub(id)
      fetchClub() // Refresh club data
    } catch (err) {
      setError("Failed to join club")
    } finally {
      setJoinLoading(false)
    }
  }

  const handleLeaveClub = async () => {
    setJoinLoading(true)
    try {
      await clubService.leaveClub(id)
      fetchClub() // Refresh club data
    } catch (err) {
      setError("Failed to leave club")
    } finally {
      setJoinLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading club...</div>
  }

  if (error && !club) {
    return (
      <div className="card text-center">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/clubs")} className="btn btn-primary">
          Back to Clubs
        </button>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="card text-center">
        <h3>Club not found</h3>
        <button onClick={() => navigate("/clubs")} className="btn btn-primary">
          Back to Clubs
        </button>
      </div>
    )
  }

  const isMember = club.members?.some((member) => member.id === user?.id)

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={() => navigate("/clubs")} className="btn btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Clubs
      </button>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
          <div>
            <h1 style={{ marginBottom: "10px" }}>{club.name}</h1>
            <p style={{ color: "#666", marginBottom: "15px" }}>{club.description}</p>
            <div style={{ display: "flex", gap: "20px", color: "#666", fontSize: "14px" }}>
              <span>👥 {club.membersCount || club.members?.length || 0} members</span>
              {club.genre && <span>🎭 {club.genre}</span>}
              {club.isPrivate && <span>🔒 Private</span>}
            </div>
          </div>

          {isAuthenticated && (
            <div>
              {isMember ? (
                <button onClick={handleLeaveClub} className="btn btn-danger" disabled={joinLoading}>
                  {joinLoading ? "Leaving..." : "Leave Club"}
                </button>
              ) : (
                <button onClick={handleJoinClub} className="btn btn-primary" disabled={joinLoading}>
                  {joinLoading ? "Joining..." : "Join Club"}
                </button>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="text-error" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "20px" }}>Members</h3>
        {club.members && club.members.length > 0 ? (
          <div className="grid grid-3">
            {club.members.map((member) => (
              <div key={member.id} style={{ padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                <strong>{member.name}</strong>
                <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>{member.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#666" }}>No members yet</p>
       