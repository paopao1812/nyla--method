
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cycle.css";

export default function Cycle() {
  const navigate = useNavigate();
  const [lastPeriodDate, setLastPeriodDate] = useState("");

  useEffect(() => {
    const savedDate = localStorage.getItem("nylaLastPeriodDate");
    if (savedDate) setLastPeriodDate(savedDate);
  }, []);

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
        phase: "Fase menstrual",
        icon: "🩸",
        feeling: "Puedes sentir menos energía, inflamación o más cansancio.",
        training:
          "Prioriza movilidad, caminatas suaves, core ligero y descanso activo.",
      };
    }

    if (cycleDay >= 6 && cycleDay <= 13) {
      return {
        day: cycleDay,
        phase: "Fase folicular",
        icon: "🌿",
        feeling: "Tu energía puede empezar a subir.",
        training:
          "Buen momento para entrenar fuerza, glúteos, progresión de cargas y cardio moderado.",
      };
    }

    if (cycleDay >= 14 && cycleDay <= 16) {
      return {
        day: cycleDay,
        phase: "Fase ovulatoria",
        icon: "🌹",
        feeling: "Puedes sentirte con más energía y potencia.",
        training:
          "Ideal para entrenamientos fuertes, cuidando técnica, control y articulaciones.",
      };
    }

    return {
      day: cycleDay,
      phase: "Fase lútea",
      icon: "🧸",
      feeling:
        "Puede aparecer más sensibilidad, hambre, cansancio o retención.",
      training:
        "Baja un poco la intensidad, prioriza fuerza controlada, caminatas y recuperación.",
    };
  };

  const cycleInfo = getCycleInfo();

  return (
    <section className="cycle-screen">
      <div className="cycle-hero">
        <p className="cycle-eyebrow">CICLO NYLA</p>

        <h1 className="cycle-title">Tu ciclo es tu aliado</h1>

        <p className="cycle-subtitle">
          Registra la fecha de tu última menstruación y NYLA te guiará según tu fase.
        </p>
      </div>

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
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {cycleInfo && (
        <div className="cycle-card cycle-result-card">
          <div className="cycle-phase-header">
            <span className="cycle-phase-icon">{cycleInfo.icon}</span>

            <div>
              <p className="cycle-day">Día {cycleInfo.day} de tu ciclo</p>

              <h2 className="cycle-phase-name">
                {cycleInfo.phase}
              </h2>

              <p className="cycle-phase-description">
                Tu entrenamiento se adapta a cómo se siente tu cuerpo hoy.
              </p>
            </div>
          </div>

          <div className="cycle-info-box">
            <h3>Energía de hoy</h3>
            <p>{cycleInfo.feeling}</p>
          </div>

          <div className="cycle-info-box">
            <h3>Qué hacer hoy</h3>
            <p>{cycleInfo.training}</p>
          </div>

          <div className="cycle-nutrition">
            <div className="cycle-nutrition-col">
              <h3>Infusiones recomendadas</h3>
              <ul>
                <li>Jengibre</li>
                <li>Manzanilla</li>
                <li>Canela</li>
              </ul>
            </div>

            <div className="cycle-nutrition-col">
              <h3>Alimentos recomendados</h3>
              <ul>
                <li>Omega-3</li>
                <li>Hierro + vitamina C</li>
                <li>Magnesio</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="cycle-card cycle-note">
        <span className="cycle-note-icon">ℹ️</span>

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
          Ir a mi entrenamiento
        </button>

        <button
          className="restart-btn"
          onClick={() => {
            localStorage.removeItem("nylaLastPeriodDate");
            navigate("/onboarding");
          }}
        >
          Volver a empezar
        </button>
      </div>

      <nav className="bottom-nav">
        <button className="nav-btn active" onClick={() => navigate("/cycle")}>
          <span className="nav-icon">🌙</span>
          <span className="nav-label">Ciclo</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/workout")}>
          <span className="nav-icon">🏋️</span>
          <span className="nav-label">Entrena</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/meals")}>
          <span className="nav-icon">🍓</span>
          <span className="nav-label">Nutrición</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/affirmations")}>
          <span className="nav-icon">✨</span>
          <span className="nav-label">Afirmaciones</span>
        </button>

        <button className="nav-btn" onClick={() => navigate("/library")}>
          <span className="nav-icon">📖</span>
          <span className="nav-label">Biblioteca</span>
        </button>
      </nav>
    </section>
  );
}