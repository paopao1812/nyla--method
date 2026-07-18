import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles/PremiumSuccess.css";

export default function MagicLink() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Detectar cuando la usuaria vuelve con el magic link
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const email = session.user.email;
        localStorage.setItem("nylaUserEmail", email);

        // Verificar si ya tuvo premium o trial antes de asignar
        const { data: existingCustomer } = await supabase
          .from("customers")
          .select("premium, trial_end_date")
          .eq("email", email.toLowerCase())
          .single();

        const yaTienePremium = existingCustomer?.premium === true;
        const trialActivo = existingCustomer?.trial_end_date &&
          new Date(existingCustomer.trial_end_date) > new Date();

        if (!yaTienePremium && !trialActivo) {
          await supabase.from("customers").upsert({
            email: email.toLowerCase(),
            trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            last_active_at: new Date().toISOString(),
          }, { onConflict: "email" });
        } else {
          await supabase.from("customers")
            .update({ last_active_at: new Date().toISOString() })
            .eq("email", email.toLowerCase());
        }

        const onboarding = localStorage.getItem("nylaOnboardingDone");
        if (!onboarding) navigate("/onboarding");
        else navigate("/home");
      }
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!email || !email.includes("@")) {
      setError("Introduce un email válido.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: "https://nyla-real.vercel.app/magic",
      },
    });
    if (err) {
      setError("Error al enviar el enlace. Inténtalo de nuevo.");
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="premium-screen">
      <div className="premium-card">
        <p className="premium-eyebrow">NYLA METHOD</p>
        {!sent ? (
          <>
            <h1 className="premium-title">Empieza gratis<br />14 días</h1>
            <p className="premium-sub">Sin tarjeta. Sin contraseña. Solo tu email.</p>
            <input
              className="premium-input"
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
            />
            {error && <p className="premium-error">{error}</p>}
            <button className="premium-btn" onClick={handleSend} disabled={loading}>
              {loading ? "Enviando..." : "Empezar gratis →"}
            </button>
            <p style={{fontSize:"12px", color:"rgba(244,175,200,0.45)", textAlign:"center"}}>
              ¿Ya tienes cuenta?{" "}
              <span style={{color:"#c9607a", cursor:"pointer"}} onClick={() => navigate("/login")}>
                Inicia sesión
              </span>
            </p>
          </>
        ) : (
          <>
            <h1 className="premium-title">¡Revisa<br />tu email! ✦</h1>
            <p className="premium-sub">Te hemos enviado un enlace mágico a <strong>{email}</strong>. Haz click en él para entrar.</p>
            <p style={{fontSize:"12px", color:"rgba(244,175,200,0.45)", textAlign:"center", marginTop:"16px"}}>
              ¿No lo ves? Revisa tu carpeta de spam.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
