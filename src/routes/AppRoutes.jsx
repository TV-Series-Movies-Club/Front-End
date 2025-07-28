import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"

// Pages
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Profile from "../pages/user/Profile"
import EditProfile from "../pages/user/EditProfile"
import AllPosts from "../pages/posts/AllPosts"
import CreatePost from "../pages/posts/CreatePost"
import PostDetails from "../pages/posts/PostDetails"
import AllClubs from "../pages/clubs/AllClubs"
import CreateClub from "../pages/clubs/CreateClub"
import ClubDetails from "../pages/clubs/ClubDetails"
import WatchedMovies from "../pages/watched/WatchedMovies"
import AddWatchedMovie from "../pages/watched/AddWatchedMovie"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:id" element={<PostDetails />} />

      <Route path="/clubs" element={<AllClubs />} />
      <Route path="/clubs/:id" element={<ClubDetails />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/posts/create"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clubs/create"
        element={
          <ProtectedRoute>
            <CreateClub />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watched"
        element={
          <ProtectedRoute>
            <WatchedMovies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watched/add"
        element={
          <ProtectedRoute>
            <AddWatchedMovie />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes