"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { userService } from "../../services/user"

const Profile = () => {
  const { user } = useAuth()
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return

      try {
        const [followersData, followingData] = await Promise.all([
          userService.getFollowers(user.id),
          userService.getFollowing(user.id),
        ])
        setFollowers(followersData)
        setFollowing(followingData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (loading) {
    return <div className="loading">Loading profile...</div>
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
          <div>
            <h1>{user?.name}</h1>
            <p style={{ color: "#666", marginBottom: "10px" }}>{user?.email}</p>
            <p style={{ color: "#666" }}>Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
          <Link to="/profile/edit" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-3">
          <div className="card">
            <h3>👥 Followers</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{followers.length}</p>
          </div>
          <div className="card">
            <h3>👤 Following</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{following.length}</p>
          </div>
          <div className="card">
            <h3>📝 Posts</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{user?.postsCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Recent Followers</h3>
          {followers.length > 0 ? (
            <div>
              {followers.slice(0, 5).map((follower) => (
                <div key={follower.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <strong>{follower.name}</strong>
                  <p style={{ color: "#666", fontSize: "14px" }}>{follower.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#666" }}>No followers yet</p>
          )}
        </div>

        <div className="card">
          <h3>Following</h3>
          {following.length > 0 ? (
            <div>
              {following.slice(0, 5).map((user) => (
                <div key={user.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <strong>{user.name}</strong>
                  <p style={{ color: "#666", fontSize: "14px" }}>{user.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#666" }}>Not following anyone yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
