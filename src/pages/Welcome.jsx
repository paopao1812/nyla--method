import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("nylaUserEmail");
    const done = localStorage.getItem("nylaOnboardingDone");
    if (email && done) navigate("/home", { replace: true });
  }, []);

  return (
    <div style={{
      minHeight:"100dvh",
      background:"linear-gradient(160deg, #6b1535 0%, #3d0e25 60%, #1a0610 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"40px 28px",
      fontFamily:"DM Sans, sans-serif",
      boxSizing:"border-box"
    }}>
      <div style={{width:"100%", maxWidth:"360px", display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", textAlign:"center"}}>
        <h1 style={{
          fontFamily:"Cormorant Garamond, serif",
          fontSize:"clamp(40px, 12vw, 56px)",
          fontWeight:"300", color:"#f4afc8", letterSpacing:"0.15em"
        }}>NYLA</h1>
        <h2 style={{
          fontFamily:"Cormorant Garamond, serif",
          fontSize:"clamp(22px, 6vw, 30px)",
          fontWeight:"300", color:"#f5ede6", lineHeight:"1.3"
        }}>Tu transformación<br/>empieza aquí.</h2>
        <p style={{fontSize:"14px", color:"rgba(244,175,200,0.5)", lineHeight:"1.7"}}>
          Un método diseñado para ti. Con intención, fuerza y claridad.
        </p>
        <div style={{display:"flex", flexDirection:"column", gap:"12px", width:"100%", marginTop:"8px"}}>
          <button onClick={() => navigate("/magic")} style={{
            padding:"16px", borderRadius:"50px",
            background:"linear-gradient(135deg, #8b2840, #c9607a)",
            color:"#fff", border:"none",
            fontSize:"11px", fontWeight:"600",
            letterSpacing:"0.25em", textTransform:"uppercase",
            minHeight:"52px", width:"100%",
            boxShadow:"0 6px 20px rgba(201,96,122,0.3)"
          }}>
            Empieza gratis 14 días
          </button>
          <button onClick={() => navigate("/login")} style={{
            padding:"16px", borderRadius:"50px",
            background:"rgba(244,175,200,0.08)",
            border:"1px solid rgba(244,175,200,0.2)",
            color:"rgba(244,175,200,0.7)",
            fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase",
            minHeight:"52px", width:"100%"
          }}>
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </div>
  );
}