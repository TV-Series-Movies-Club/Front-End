"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { userService } from "../../services/user"

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [postsCount, setPostsCount] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return

      try {
        const [followersData, followingData, watchedData, profileData] = await Promise.all([
          userService.getFollowers(user.id),
          userService.getFollowing(user.id),
          userService.getWatchedMovies(user.id),
          userService.getProfile(),
        ])

        setFollowers(followersData)
        setFollowing(followingData)
        setWatchedMovies(watchedData)
        setPostsCount(profileData?.posts?.length || 0)
        updateUser(profileData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user?.id])

  const getProfileImage = () => {
    if (!user?.profile_picture) return "/default-avatar.png"
    const isAbsolute = user.profile_picture.startsWith("http")
    const path = isAbsolute ? user.profile_picture : `/uploads/${user.profile_picture}`
    return path
  }

  if (loading) {
    return <div className="card">Loading profile...</div>
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "20px"
        }}>
          <div>
            <img
              src={getProfileImage()}
              alt="Profile"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/default-avatar.png"
              }}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
                opacity: imageLoaded ? 1 : 0.5,
                transition: "opacity 0.3s ease"
              }}
            />

            <h1>{user?.name || user?.username}</h1>
            <p style={{ color: "#666", marginBottom: "10px" }}>{user?.email}</p>
            <p style={{ color: "#666" }}>
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
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
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{postsCount}</p>
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
                  <strong>{follower.name || follower.username}</strong>
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
              {following.slice(0, 5).map((followed) => (
                <div key={followed.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <strong>{followed.name || followed.username}</strong>
                  <p style={{ color: "#666", fontSize: "14px" }}>{followed.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#666" }}>Not following anyone yet</p>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: "30px" }}>
        <h2>🎬 Watched Movies</h2>
        {watchedMovies.length > 0 ? (
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {watchedMovies.map((movie, index) => (
              <li key={movie.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                <strong>{index + 1}. {movie.title}</strong> ({movie.year})<br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  Genre: {movie.genre} | Rating: {movie.rating}⭐
                </span><br />
                <span style={{ fontSize: "12px", color: "#888" }}>
                  Watched on: {movie.watchedAt ? new Date(movie.watchedAt).toLocaleDateString() : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#666" }}>No movies watched yet</p>
        )}
      </div>
    </div>
  )
}

export default Profile
