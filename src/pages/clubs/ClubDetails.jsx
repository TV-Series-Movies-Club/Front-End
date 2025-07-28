"use client"


 
 
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
m
        
        
          )}
        <
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
        