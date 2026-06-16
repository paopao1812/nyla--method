

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PremiumSuccess.css";

export default function Premium() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Something went wrong. Please try again.");
    } catch {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="premium-screen">
      <div className="premium-card">
        <p className="premium-eyebrow">NYLA PREMIUM</p>
        <h1 className="premium-title">Your lifetime<br />transformation</h1>
        <p className="premium-sub">One payment. Lifetime access. No subscriptions.</p>

        <div className="premium-features">
          <div className="premium-feature">✦ 16-week progressive training method</div>
          <div className="premium-feature">✦ Personalized cycle-based training</div>
          <div className="premium-feature">✦ Full video library</div>
          <div className="premium-feature">✦ Nutrition & calorie calculator</div>
          <div className="premium-feature">✦ Affirmations & mindset tools</div>
          <div className="premium-feature">✦ Lifetime updates</div>
        </div>

        <div className="premium-price">
          <span className="premium-amount">29€</span>
          <span className="premium-period">one time · lifetime access</span>
        </div>

        <input
          className="premium-input"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(""); }}
        />

        {error && <p className="premium-error">{error}</p>}

        <button className="premium-btn" onClick={handleCheckout} disabled={loading}>
          {loading ? "Redirecting..." : "Unlock NYLA Premium →"}
        </button>

        <p className="premium-note">Secure payment via Stripe. Cancel anytime is not needed — it's yours forever.</p>
      </div>
    </div>
  );
}