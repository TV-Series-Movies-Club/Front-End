"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { clubService } from "../../services/club"
import { useAuth } from "../../context/AuthContext"

const CreateClub = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: "", description: "", genre: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await clubService.createClub(form, token)
      navigate("/clubs")
    } catch (err) {
      setError("Failed to create club")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Create Movie Club</h2>
      {error && <p className="text-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Club Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="genre" placeholder="Genre (optional)" value={form.genre} onChange={handleChange} />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Club"}
        </button>
      </form>
    </div>
  )
}

export default CreateClub
