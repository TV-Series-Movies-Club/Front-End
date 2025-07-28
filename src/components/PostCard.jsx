import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
  return (
    <div className="card">
      <h3>
        <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "#333" }}>
          {post.title}
        </Link>
      </h3>
      <p style={{ color: "#666", marginBottom: "10px" }}>
        By {post.author?.name || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p style={{ marginBottom: "15px" }}>{post.content?.substring(0, 150)}...</p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>💬 {post.commentsCount || 0} comments</span>
        <span style={{ fontSize: "14px", color: "#666" }}>❤️ {post.likesCount || 0} likes</span>
      </div>
    </div>
  )
}

export default PostCard