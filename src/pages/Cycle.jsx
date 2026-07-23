import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCyclePhase,
  getTodayCheckin,
  saveTodayCheckin,
  getAdaptedTraining,
  CHECKIN_OPTIONS,
} from "../utils/cyclePhase";
import "../styles/Cycle.css";

export default function Cycle() {
  const navigate = useNavigate();
  const [lastPeriodDate, setLastPeriodDate] = useState(
    localStorage.getItem("nylaLastPeriodDate") || ""
  );
  const [checkin, setCheckin] = useState(getTodayCheckin());

  const cycleInfo = getCyclePhase(lastPeriodDate);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setLastPeriodDate(value);
    localStorage.setItem("nylaLastPeriodDate", value);
  };

  const handleCheckin = (value) => {
    saveTodayCheckin(value);
    setCheckin(value);
  };

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
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {lastPeriodDate && (
          <button
            className="cycle-clear-btn"
            onClick={() => {
              setLastPeriodDate("");
              localStorage.removeItem("nylaLastPeriodDate");
            }}
          >
            No quiero indicarlo esta vez
          </button>
        )}
      </div>

      {cycleInfo && (
        <>
          {/* CHECK-IN DIARIO */}
          <div className="cycle-card cycle-checkin-card">
            <h3 className="cycle-checkin-title">¿Cómo te sientes hoy?</h3>
            <div className="cycle-checkin-options">
              {CHECKIN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`cycle-checkin-btn ${checkin === opt.value ? "active" : ""}`}
                  onClick={() => handleCheckin(opt.value)}
                >
                  <span className="cycle-checkin-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
            {checkin && (
              <p className="cycle-checkin-note">
                Gracias por contarnos cómo te sientes. Ajustamos tu recomendación de hoy.
              </p>
            )}
          </div>

          {/* RESULTADO DE FASE */}
          <div className="cycle-card cycle-result-card">
            <div className="cycle-phase-header">
              <span className="cycle-phase-icon">{cycleInfo.icon}</span>
              <div>
                <p className="cycle-day">Día {cycleInfo.day} de tu ciclo</p>
                <h2 className="cycle-phase-name">{cycleInfo.phase}</h2>
                <p className="cycle-phase-description">
                  Tu entrenamiento se adapta a cómo se siente tu cuerpo hoy.
                </p>
              </div>
            </div>

            <div className="cycle-info-box">
              <h3>🧬 Qué está ocurriendo en tu cuerpo</h3>
              <p>{cycleInfo.bodyChanges}</p>
            </div>

            <div className="cycle-info-box">
              <h3>⚡ Cómo puedes sentirte</h3>
              <p>{cycleInfo.feeling}</p>
            </div>

            <div className="cycle-info-box">
              <h3>🏋️ Entrenamiento recomendado</h3>
              <p>{getAdaptedTraining(cycleInfo, checkin)}</p>
            </div>

            <div className="cycle-nutrition">
              <div className="cycle-nutrition-col">
                <h3>🍵 Infusiones recomendadas</h3>
                <ul>
                  {cycleInfo.infusions.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="cycle-nutrition-col">
                <h3>🍽️ Alimentos recomendados</h3>
                <ul>
                  {cycleInfo.foods.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="cycle-info-box">
              <h3>💧 Hidratación</h3>
              <p>{cycleInfo.hydration}</p>
            </div>

            <div className="cycle-info-box">
              <h3>😴 Descanso</h3>
              <p>{cycleInfo.sleep}</p>
            </div>

            <div className="cycle-tip-box">
              <span className="cycle-tip-icon">❤️</span>
              <p>"{cycleInfo.dailyTip}"</p>
            </div>
          </div>
        </>
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
        <button className="cycle-training-btn" onClick={() => navigate("/workout")}>
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
    </section>
  );
}
