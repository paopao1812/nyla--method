
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import "../styles/PremiumSuccess.css";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) localStorage.setItem("nylaUserEmail", email);
    localStorage.setItem("nylaPremium", "true");
  }, []);

  return (
    <div className="success-screen">
      <div className="success-card">
        <p className="success-icon">🌸</p>
        <p className="success-eyebrow">NYLA PREMIUM</p>
        <h1 className="success-title">Welcome to<br />NYLA Premium</h1>
        <p className="success-sub">Your lifetime access has been activated.</p>
        <p className="success-msg">
          Now create your account to start your journey.
        </p>
        <button className="success-btn" onClick={() => navigate("/register")}>
          Create my account →
        </button>
      </div>
    </div>
  );
}