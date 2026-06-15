

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PremiumSuccess.css";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
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
          You now have full access to the 16-week method, video library, cycle training and everything NYLA has to offer.
        </p>
        <button className="success-btn" onClick={() => navigate("/home")}>
          Start your journey →
        </button>
      </div>
    </div>
  );
}