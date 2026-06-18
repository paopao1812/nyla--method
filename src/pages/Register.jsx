
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles/PremiumSuccess.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  const handleRegister = async () => {
    if (!name || !email || !password) { setError("Completa todos los campos."); return; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
    setLoading(true);
    setError("");
    

    // Verificar si el email tiene compra activa
    const res = await fetch("/api/verify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
    const { authorized } = await res.json();

    if (!authorized) {
      setError("No active NYLA purchase was found for this email address.");
      setLoading(false);
      return;
    }

    // Crear cuenta en Supabase Auth
    const { error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) { setError(authError.message); setLoading(false); return; }

    localStorage.setItem("nylaUserName", name);
    localStorage.setItem("nylaUserEmail", email.toLowerCase());
    localStorage.setItem("nylaPremium", "true");
    navigate("/onboarding");
    setLoading(false);
  };

  return (
    <div className="premium-screen">
      <div className="premium-card">
        <p className="premium-eyebrow">NYLA</p>
        <h1 className="premium-title">Crea tu<br />cuenta</h1>
        <p className="premium-sub">Usa el email con el que compraste NYLA.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input className="premium-input" type="text" placeholder="Tu nombre"
            value={name} onChange={e => { setName(e.target.value); setError(""); }} />
          <input className="premium-input" type="email" placeholder="Tu email"
            value={email} onChange={e => { setEmail(e.target.value); setError(""); }} />
          <div style={{ position: "relative" }}>
  <input
    className="premium-input"
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña (mín. 6 caracteres)"
    value={password}
    onChange={e => { setPassword(e.target.value); setError(""); }}
    style={{ paddingRight: "44px" }}
  />
  <button
    type="button"
    onClick={() => setShowPassword(p => !p)}
    style={{
      position: "absolute", right: "14px", top: "50%",
      transform: "translateY(-50%)", background: "none",
      border: "none", cursor: "pointer", fontSize: "16px",
      color: "rgba(244,175,200,0.5)"
    }}
  >
    {showPassword ? "🙈" : "👁"}
  </button>
</div>
        </div>

        {error && <p className="premium-error">{error}</p>}

        <button className="premium-btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Verificando..." : "Crear cuenta →"}
        </button>

        <p style={{ fontSize: "12px", color: "rgba(244,175,200,0.45)", textAlign: "center" }}>
          ¿Ya tienes cuenta?{" "}
          <span style={{ color: "#c9607a", cursor: "pointer" }} onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}