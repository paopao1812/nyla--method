
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles/PremiumSuccess.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError("Completa todos los campos."); return; }
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError("Email o contraseña incorrectos."); setLoading(false); return; }

    // Verificar acceso premium
    const res = await fetch("/api/verify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
    const { authorized } = await res.json();

    localStorage.setItem("nylaUserEmail", email.toLowerCase());
    if (authorized) localStorage.setItem("nylaPremium", "true");

    // Si no tiene onboarding, mandarlo ahí primero
    const onboarding = localStorage.getItem("nylaOnboardingDone");
    if (!onboarding) { navigate("/onboarding"); }
    else { navigate("/home"); }
    setLoading(false);
  };

  return (
    <div className="premium-screen">
      <div className="premium-card">
        <p className="premium-eyebrow">NYLA METHOD</p>
        <h1 className="premium-title">Bienvenida<br />de vuelta</h1>
        <p className="premium-sub">Inicia sesión para continuar tu journey.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input className="premium-input" type="email" placeholder="Tu email"
            value={email} onChange={e => { setEmail(e.target.value); setError(""); }} />
          <input className="premium-input" type="password" placeholder="Tu contraseña"
            value={password} onChange={e => { setPassword(e.target.value); setError(""); }} />
        </div>

        {error && <p className="premium-error">{error}</p>}

        <button className="premium-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar →"}
        </button>

        <p style={{ fontSize: "12px", color: "rgba(244,175,200,0.45)", textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <span style={{ color: "#c9607a", cursor: "pointer" }} onClick={() => navigate("/register")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}