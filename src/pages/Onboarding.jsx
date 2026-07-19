
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/variables.css";

const GOALS = [
  { emoji: "🌿", title: "Perder grasa abdominal y corporal para sentirme mas comoda con mi cuerpo" },
  { emoji: "⚡", title: "Aumentar y tonificar glúteos y piernas" },
  { emoji: "🔄", title: "Ganar confianza, constancia y disciplina" },
  { emoji: "💗", title: "Aprender a quererme más" },
];

const LEVELS = [
  { emoji: "🌱", title: "Soy principiante", sub: "Poco o nada de experiencia con pesas" },
  { emoji: "🌿", title: "Tengo algo de base", sub: "He entrenado antes, pero sin constancia" },
  { emoji: "🌺", title: "Ya entreno regularmente", sub: "Quiero estructura y progresión real" },
];

const DAYS_LIST = [
  { key: "L", label: "L" },
  { key: "M", label: "M" },
  { key: "X", label: "X" },
  { key: "J", label: "J" },
  { key: "V", label: "V" },
  { key: "S", label: "S" },
  { key: "D", label: "D" },
];

function StepBar({ total, current }) {
  return (
    <div className="ob-steps">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`ob-step ${i < current - 1 ? "done" : i === current - 1 ? "active" : ""}`} />
      ))}
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [nombre, setNombre] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDays, setSelectedDays] = useState(["M", "J"]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { userName } = useUser();
  const navigate = useNavigate();

  function toggleDay(key) {
    setSelectedDays(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
    );
  }

  function next() {
    if (step < 5) {
      setStep(s => s + 1);
    } else {
      // Guardar todo en localStorage al completar
      if (selectedGoal !== null) localStorage.setItem("nylaGoal", String(selectedGoal));
      if (selectedLevel !== null) localStorage.setItem("nylaLevel", String(selectedLevel));
      localStorage.setItem("nylaDays", JSON.stringify(selectedDays));
      localStorage.setItem("nylaOnboardingDone", "true");
      if (nombre.trim()) localStorage.setItem("nylaUserName", nombre.trim());
      localStorage.setItem("nylaPlace", selectedPlace || "gym");
      const numDays = selectedDays.length;
      let plan;
      if (selectedPlace === "home") {
        plan = "homeDays";
      } else {
        plan = numDays >= 5 ? "fiveDays" : numDays >= 3 ? "threeDays" : "glutesOnly";
      }
      localStorage.setItem("nylaSelectedPlan", plan);
      navigate("/home");
    }
  }

  return (
    <div className="ob-screen">

      {/* PASO 1: OBJETIVO */}
      {step === 1 && (
        <>
          <div className="ob-top">
            <StepBar total={5} current={1} />
            <p className="ob-num">Paso 1 de 5 · Tu intención</p>
            <p className="ob-subtitle">¿Cómo te llamas?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 12 }}>
            <input
              className="premium-input"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{ marginBottom: "24px" }}
            />
            <p className="ob-subtitle" style={{ marginBottom: "12px" }}>¿Qué quieres construir con NYLA?</p>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 12 }}>
            </div>
            <div className="goal-grid">
              {GOALS.map((g, i) => (
                <div key={i} className={`goal-card ${selectedGoal === i ? "selected" : ""}`} onClick={() => setSelectedGoal(i)}>
                  <div className="goal-emoji">{g.emoji}</div>
                  <div className="goal-text"><h4>{g.title}</h4></div>
                  <div className="goal-check">✓</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next}>Continuar</button>
          </div>
        </>
      )}

      {/* PASO 2: NIVEL */}
      {step === 2 && (
        <>
          <div className="ob-top">
            <StepBar total={5} current={2} />
            <p className="ob-num">Paso 2 de 5 · Tu punto de partida</p>
            <p className="ob-subtitle">¿Donde estás ahora?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 12 }}>
            <div className="level-grid">
              {LEVELS.map((l, i) => (
                <div key={i} className={`level-card ${selectedLevel === i ? "selected" : ""}`} onClick={() => setSelectedLevel(i)}>
                  <div className="level-icon">{l.emoji}</div>
                  <div className="level-info"><h4>{l.title}</h4><p>{l.sub}</p></div>
                  <div className="level-check">✓</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next}>CONTINUAR →</button>
          </div>
        </>
      )}

      {/* PASO 3: DÍAS */}
      {step === 3 && (
        <>
          <div className="ob-top">
            <StepBar total={5} current={3} />
            <p className="ob-num">Paso 3 de 5 · Tu ritmo</p>
            <p className="ob-subtitle">¿Qué días quieres entrenar?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 16 }}>
            <div className="schedule-grid">
              {DAYS_LIST.map(d => (
                <div key={d.key} className={`day-btn ${selectedDays.includes(d.key) ? "selected" : ""}`} onClick={() => toggleDay(d.key)}>
                  <div className="day-letter">{d.label}</div>
                  <div className="day-dot" />
                </div>
              ))}
            </div>
            <p className="input-hint" style={{ marginTop: 16 }}>NYLA se adapta a ti 🌱</p>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next}>CONTINUAR →</button>
          </div>
        </>
      )}

      {/* PASO 4: LUGAR */}
      {step === 4 && (
        <>
          <div className="ob-top">
            <StepBar total={5} current={4} />
            <p className="ob-num">Paso 4 de 5 · Tu espacio</p>
            <p className="ob-subtitle">¿Dónde vas a entrenar?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 12 }}>
            <div className="level-grid">
              <div className={`level-card ${selectedPlace === "gym" ? "selected" : ""}`} onClick={() => setSelectedPlace("gym")}>
                <div className="level-icon">🏋️</div>
                <div className="level-info">
                  <h4>Gimnasio</h4>
                  <p>Acceso a máquinas, pesos y equipamiento completo.</p>
                </div>
                <div className="level-check">✓</div>
              </div>
              <div className={`level-card ${selectedPlace === "home" ? "selected" : ""}`} onClick={() => setSelectedPlace("home")}>
                <div className="level-icon">🏠</div>
                <div className="level-info">
                  <h4>En casa</h4>
                  <p>Necesitarás mínimo una mancuerna y bandas de resistencia.</p>
                </div>
                <div className="level-check">✓</div>
              </div>
            </div>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next} disabled={!selectedPlace}>CONTINUAR →</button>
          </div>
        </>
      )}

      {/* PASO 5: COMPROMISO */}
      {step === 5 && (
        <>
          <div className="ob-top">
            <StepBar total={5} current={4} />
            <p className="ob-num">Paso 5 de 5 · Tu compromiso</p>
            <p className="ob-subtitle">Una promesa que te cumples. ☺️</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start" }}>
            <div className="commit-wrap">
              <div className="commit-body">
                Yo, <em>{userName || "…"}</em>, elijo estar aquí.<br /><br />
                No busco la perfección. Busco <em>presencia</em>.<br />
                Cada vez que abra esta app,<br />
                me estoy eligiendo a mí misma.<br /><br />
                Y eso ya es un acto de amor.
              </div>
              <div className="commit-sig"></div>
            </div>
            <p className="commit-note">
              Podrás guardar esta carta como fondo de pantalla<br />
              al completar tu primera semana.
            </p>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next}>ACEPTO</button>
          </div>
        </>
      )}
    </div>
  );
}
