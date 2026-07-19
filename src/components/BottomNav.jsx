import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const items = [

    { path: "/workout", icon: "🏋️", label: "Entrena" },
    { path: "/meals", icon: "🍓", label: "Nutrición" },
    { path: "/progress", icon: "📊", label: "Progreso" },
    { path: "/affirmations", icon: "✨", label: "Afirmaciones" },
  ];

  const showNav = ["/home","/workout","/meals","/progress","/affirmations","/library"].includes(path);
  if (!showNav) return null;

  return (

    <nav style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: "430px",
      background: "rgba(26,6,16,0.97)",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(201,96,122,0.15)",
      padding: "10px 0 28px",
      display: "flex", justifyContent: "space-around", alignItems: "center",
      zIndex: 99999,
    }}>
      {items.map(item => (
        <button key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
            opacity: path === item.path ? 1 : 0.5,
            padding: "4px 8px",
          }}>
          <span style={{fontSize: "20px"}}>{item.icon}</span>
          <span style={{fontSize: "10px", color: path === item.path ? "#c9607a" : "#f5ede6", fontFamily: "DM Sans, sans-serif"}}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>


  );
}
