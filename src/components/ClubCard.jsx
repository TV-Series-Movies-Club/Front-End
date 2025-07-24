import { Link } from "react-router-dom"

const ClubCard = ({ club }) => {
  return (
    <div className="card">
      <h3>
        <Link to={`/clubs/${club.id}`} style={{ textDecoration: "none", color: "#333" }}>
          {club.name}
        </Link>
      </h3>
      <p style={{ color: "#666", marginBottom: "10px" }}>{club.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>👥 {club.membersCount || 0} members</span>
        <Link to={`/clubs/${club.id}`} className="btn btn-primary">
          View Club
        </Link>
      </div>
    </div>
  )
}

export default ClubCard
