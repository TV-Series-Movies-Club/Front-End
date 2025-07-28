"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="text-center" style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "#333" }}>🎬 Welcome to Movies Club</h1>
        <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Connect with fellow movie enthusiasts, share your thoughts, join clubs, and track your watched movies!
        </p>
      </div>

      {isAuthenticated ? (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Welcome back, {user?.name}!</h2>
          <div className="grid grid-2">
            <div className="card">
              <h3>📝 Share Your Thoughts</h3>
              <p>Create posts about your favorite movies and discuss with the community.</p>
              <Link to="/posts/create" className="btn btn-primary">
                Create Post
              </Link>
            </div>
            <div className="card">
              <h3>🎭 Join Movie Clubs</h3>
              <p>Find and join clubs based on your favorite genres and interests.</p>
              <Link to="/clubs" className="btn btn-primary">
                Browse Clubs
              </Link>
            </div>
            <div className="card">
              <h3>📚 Track Your Movies</h3>
              <p>Keep track of all the movies you've watched and rate them.</p>
              <Link to="/watched" className="btn btn-primary">
                My Movies
              </Link>
            </div>
            <div className="card">
              <h3>👤 Your Profile</h3>
              <p>Manage your profile, view your posts, and see your followers.</p>
              <Link to="/profile" className="btn btn-primary">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="grid grid-2" style={{ marginBottom: "40px" }}>
            <div className="card">
              <h3>🎬 Movie Discussions</h3>
              <p>Share reviews, recommendations, and engage in meaningful discussions about movies.</p>
            </div>
            <div className="card">
              <h3>🎭 Movie Clubs</h3>
              <p>Join clubs based on genres, directors, or specific movie interests.</p>
            </div>
            <div className="card">
              <h3>👥 Community</h3>
              <p>Follow other movie lovers and build your network of film enthusiasts.</p>
            </div>
            <div className="card">
              <h3>📊 Track Progress</h3>
              <p>Keep a personal log of movies you've watched and want to watch.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "15px 30px" }}>
              Join Movies Club
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: "1.1rem", padding: "15px 30px" }}>
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home