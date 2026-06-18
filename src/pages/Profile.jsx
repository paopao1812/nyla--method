import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PremiumSuccess.css";
import "../styles/Profile.css";

export default function Profile() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (age) localStorage.setItem("nylaAge", age);
    if (height) localStorage.setItem("nylaHeight", height);
    if (weight) localStorage.setItem("nylaWeight", weight);
    if (goalWeight) localStorage.setItem("nylaGoalWeight", goalWeight);
    navigate("/onboarding");
  };

  return (
    <div className="profile-screen">
      <div className="profile-card">
        <p className="profile-eyebrow">NYLA METHOD</p>
        <h1 className="profile-title">Cuéntame<br />sobre ti</h1>
        <p className="profile-sub">Todos los campos son opcionales. Puedes completarlos cuando quieras.</p>

        <div className="profile-fields">

          <div className="profile-field">
            <label className="profile-label">Edad</label>
            <input
              className="profile-input"
              type="number"
              placeholder="Ej. 25"
              value={age}
              onChange={e => setAge(e.target.value)}
              min="16" max="80"
            />
          </div>

          <div className="profile-field">
            <label className="profile-label">Estatura (cm)</label>
            <input
              className="profile-input"
              type="number"
              placeholder="Ej. 165"
              value={height}
              onChange={e => setHeight(e.target.value)}
              min="140" max="220"
            />
          </div>

          <div className="profile-field">
            <label className="profile-label">Peso actual (kg)</label>
            <input
              className="profile-input"
              type="number"
              placeholder="Ej. 62"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              min="30" max="200"
            />
          </div>

          <div className="profile-field">
            <label className="profile-label">Peso objetivo (kg)</label>
            <input
              className="profile-input"
              type="number"
              placeholder="Ej. 57"
              value={goalWeight}
              onChange={e => setGoalWeight(e.target.value)}
              min="30" max="200"
            />
          </div>

        </div>

        <button className="profile-btn" onClick={handleContinue}>
          Continuar →
        </button>

        <p className="profile-skip" onClick={handleContinue}>
          Saltar por ahora
        </p>
      </div>
    </div>
  );
}