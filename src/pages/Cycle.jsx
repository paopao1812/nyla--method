
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cycle() {
  
  
const navigate = useNavigate();

  const [lastPeriodDate, setLastPeriodDate] = useState("");

  const getCycleInfo = () => {
    if (!lastPeriodDate) return null;

    const today = new Date();
    const start = new Date(lastPeriodDate);

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const cycleDay = ((diffDays - 1) % 28) + 1;

    if (cycleDay >= 1 && cycleDay <= 5) {
      return {
        day: cycleDay,
        phase: "🩸Fase menstrual",
        feeling: "Puedes sentir menos energía, inflamación o más cansancio.",
        training:
          "Prioriza movilidad, caminatas suaves, core ligero y descanso activo.",
      };
    }

    if (cycleDay >= 6 && cycleDay <= 13) {
      return {
        day: cycleDay,
        phase: "🌿Fase folicular",
        feeling: "Tu energía puede empezar a subir.",
        training:
          "Buen momento para entrenafuerza, glúteos, progresión de cargas y cardio moderado.",
      };
    }

    if (cycleDay >= 14 && cycleDay <= 16) {
      return {
        day: cycleDay,
        phase: "🌹Fase ovulatoria",
        feeling: "Puedes sentirte con más energía y potencia.",
        training:
          "Ideal para entrenamientos fuertes, cuidando técnica, control y articulaciones.",
      };
    }

    return {
      day: cycleDay,
      phase: "🧸Fase lútea",
      feeling: "Puede aparecer más sensibilidad, hambre, cansancio o retención.",
      training:
        "Baja un poco la intensidad, prioriza fuerza controlada, caminatas y recuperación.",
    };
  };

  const cycleInfo = getCycleInfo();

  return (
    <section className="cycle-screen">
      <p className="cycle-eyebrow"></p>

     
    <p className="section-label">Tu cliclo es tu amigo</p>

      <p className="cycle-subtitle">
        Registra la fecha de tu última menstruación y NYLA te guiará según tu fase.
      </p>

      <div className="cycle-card">
        <label className="cycle-label">
          Primer día de tu última menstruación
        </label>

        <input
          className="cycle-input"
          type="date"
          value={lastPeriodDate}
          onChange={(e) => {
  setLastPeriodDate(e.target.value);
  localStorage.setItem("nylaLastPeriodDate", e.target.value);
}}
        />
      </div>

      {cycleInfo && (
  <div className="cycle-card result">
    <p className="cycle-day">Día {cycleInfo.day} de tu ciclo</p>

    <h2>{cycleInfo.phase}</h2>

   <h3>Qué hacer hoy</h3>
<p>{cycleInfo.training}</p>

<div className="cycle-nutrition">
  <h3>🌿 Infusiones recomendadas</h3>

  <ul>
    <li>Jengibre</li>
    <li>Manzanilla</li>
    <li>Canela</li>
  </ul>

  <h3>🍎 Alimentos recomendados</h3>

  <ul>
    <li>Omega-3</li>
    <li>Hierro + vitamina C</li>
    <li>Magnesio</li>
  </ul>
</div>
  </div>
)}
      

      <div className="cycle-card note">
        <p>
          Esta guía es educativa y general. Tu ciclo puede variar. Si tienes dolor
          intenso, ciclos irregulares o una condición médica, consulta con un
          profesional de salud.
        </p>
      </div>
      
    <div className="cycle-actions">

  <button
    className="cycle-training-btn"
    onClick={() => navigate("/workout")}
  >
    Ir a mi entrenamiento →
  </button>

  <button
    className="restart-btn"
    onClick={() => {
      localStorage.clear();
      navigate("/onboarding");
    }}
  >
    Volver a empezar
  </button>

</div>

      <div className="bottom-nav">

  <button className="nav-btn" onClick={() => navigate("/cycle")}>
    <span className="nav-icon">🌙</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/workout")}>
    <span className="nav-icon">🏋️</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/meals")}>
    <span className="nav-icon">🍓</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/affirmations")}>
    <span className="nav-icon">✨</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/library")}>
    <span className="nav-icon">📖</span>
  </button>

</div>
    </section>
  );
}

