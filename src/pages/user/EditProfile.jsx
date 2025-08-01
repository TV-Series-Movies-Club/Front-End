"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { userService } from "../../services/user"

const EditProfile = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profilePicture: null,
    preview: user?.profile_picture || null,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profilePicture" && files[0]) {
      setFormData({
        ...formData,
        profilePicture: files[0],
        preview: URL.createObjectURL(files[0]),
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const payload = new FormData()
      payload.append("name", formData.name)
      payload.append("email", formData.email)
      payload.append("bio", formData.bio)
      if (formData.profilePicture) {
        payload.append("profile_picture", formData.profilePicture)
      }

      const response = await userService.updateProfile(payload)
      updateUser(response.user)
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      setLoading(false)
      return
    }

    try {
      await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setSuccess("Password changed successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Edit Profile</h1>
        <button onClick={() => navigate("/profile")} className="btn btn-secondary">
          Back to Profile
        </button>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                placeholder="Tell us about yourself..."
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleProfileChange}
                disabled={loading}
              />
              {formData.preview && (
                <img
                  src={formData.preview}
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px", marginTop: "10px", objectFit: "cover", borderRadius: "50%" }}
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      {error && <div className="text-error" style={{ marginTop: "20px" }}>{error}</div>}
      {success && <div className="text-success" style={{ marginTop: "20px" }}>{success}</div>}
    </div>
  )
}

export default EditProfile


