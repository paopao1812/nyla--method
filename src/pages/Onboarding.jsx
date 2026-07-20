
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

  // Auto-seleccionar gym cuando cambian los días
  useEffect(() => {
    if (selectedDays.length === 4) setSelectedPlace("gym");
    else if (selectedDays.length !== 3 && selectedDays.length !== 5) setSelectedPlace(null);
  }, [selectedDays]);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [skipCycle, setSkipCycle] = useState(false);
  const { userName } = useUser();
  const navigate = useNavigate();

  function back() {
    if (step > 1) setStep(s => s - 1);
  }

  function toggleDay(key) {
    setSelectedDays(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
    );
  }

  function next() {
    if (step < 6) {
      setStep(s => s + 1);
    } else {
      // Guardar todo en localStorage al completar
      if (selectedGoal !== null) localStorage.setItem("nylaGoal", String(selectedGoal));
      if (selectedLevel !== null) localStorage.setItem("nylaLevel", String(selectedLevel));
      localStorage.setItem("nylaDays", JSON.stringify(selectedDays));
      localStorage.setItem("nylaOnboardingDone", "true");
      if (nombre.trim()) localStorage.setItem("nylaUserName", nombre.trim());
      localStorage.setItem("nylaPlace", selectedPlace || "gym");
      if (lastPeriodDate) localStorage.setItem("nylaLastPeriodDate", lastPeriodDate);
      const numDays = selectedDays.length;
      let plan;
      if (selectedPlace === "home") {
        plan = "homeDays";
      } else if (selectedPlace === "glutesOnly") {
        plan = "glutesOnly";
      } else if (numDays >= 5) {
        plan = "fiveDays";
      } else if (numDays === 4) {
        plan = "fourDays";
      } else {
        plan = "threeDays";
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
            <StepBar total={6} current={1} />
            <p className="ob-num">Paso 1 de 6 · Tu intención</p>
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
            {step > 1 && (
              <button onClick={back} style={{
                background:"none", border:"none", color:"rgba(244,175,200,0.5)",
                fontSize:"13px", cursor:"pointer", padding:"0",
                marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px"
              }}>← Volver</button>
            )}
            <StepBar total={6} current={2} />
            <p className="ob-num">Paso 2 de 6 · Tu punto de partida</p>
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
            {step > 1 && (
              <button onClick={back} style={{
                background:"none", border:"none", color:"rgba(244,175,200,0.5)",
                fontSize:"13px", cursor:"pointer", padding:"0",
                marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px"
              }}>← Volver</button>
            )}
            <StepBar total={6} current={3} />
            <p className="ob-num">Paso 3 de 6 · Tu ritmo</p>
            <p className="ob-subtitle">¿Cuántos días a la semana quieres entrenar?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 16 }}>
            <div className="level-grid">
              <div className={`level-card ${selectedDays.length === 3 ? "selected" : ""}`} onClick={() => setSelectedDays(["L","M","X"])}>
                <div className="level-icon">📅</div>
                <div className="level-info">
                  <h4>3 días</h4>
                  <p>Ideal para empezar con constancia y sin agotarte.</p>
                </div>
                <div className="level-check">✓</div>
              </div>
              <div className={`level-card ${selectedDays.length === 4 ? "selected" : ""}`} onClick={() => setSelectedDays(["L","M","X","J"])}>
                <div className="level-icon">💪</div>
                <div className="level-info">
                  <h4>4 días</h4>
                  <p>Buen equilibrio entre entrenamiento y recuperación.</p>
                </div>
                <div className="level-check">✓</div>
              </div>
              <div className={`level-card ${selectedDays.length === 5 ? "selected" : ""}`} onClick={() => setSelectedDays(["L","M","X","J","V"])}>
                <div className="level-icon">🔥</div>
                <div className="level-info">
                  <h4>5 días</h4>
                  <p>Para quienes quieren máxima progresión y dedicación.</p>
                </div>
                <div className="level-check">✓</div>
              </div>
            </div>
            <p className="input-hint" style={{ marginTop: 16 }}>NYLA se adapta a ti 🌱</p>
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next} disabled={selectedDays.length === 0}>CONTINUAR →</button>
          </div>
        </>
      )}

      {/* PASO 4: LUGAR */}
      {step === 4 && (
        <>
          <div className="ob-top">
            {step > 1 && (
              <button onClick={back} style={{
                background:"none", border:"none", color:"rgba(244,175,200,0.5)",
                fontSize:"13px", cursor:"pointer", padding:"0",
                marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px"
              }}>← Volver</button>
            )}
            <StepBar total={6} current={4} />
            <p className="ob-num">Paso 4 de 6 · Tu espacio</p>
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
              <div className={`level-card ${selectedPlace === "glutesOnly" ? "selected" : ""}`} onClick={() => setSelectedPlace("glutesOnly")}>
                <div className="level-icon">🍑</div>
                <div className="level-info">
                  <h4>Solo Glúteos</h4>
                  <p>Plan enfocado exclusivamente en glúteos y femoral.</p>
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
            {step > 1 && (
              <button onClick={back} style={{
                background:"none", border:"none", color:"rgba(244,175,200,0.5)",
                fontSize:"13px", cursor:"pointer", padding:"0",
                marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px"
              }}>← Volver</button>
            )}
            <StepBar total={6} current={5} />
            <p className="ob-num">Paso 5 de 6 · Tu ciclo</p>
            <p className="ob-subtitle">¿Cuándo fue tu último período?</p>
          </div>
          <div className="ob-body" style={{ justifyContent: "flex-start", paddingTop: 16 }}>
            <p style={{fontSize:"13px", color:"rgba(244,175,200,0.6)", marginBottom:"16px", lineHeight:"1.6"}}>
              Esto nos permite adaptar tu entrenamiento a cada fase de tu ciclo. Es opcional y solo tú lo ves.
            </p>
            {!skipCycle ? (
              <>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={e => setLastPeriodDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
style={{
                    background:"rgba(0,0,0,0.2)", border:"1px solid rgba(244,175,200,0.2)",
                    borderRadius:"12px", padding:"14px", color:"#f5ede6",
                    fontSize:"16px", width:"100%", marginBottom:"12px",
                    fontFamily:"DM Sans, sans-serif", boxSizing:"border-box",
                    WebkitAppearance:"none", appearance:"none",
                    maxWidth:"100%", display:"block"
                  }}
                />
                {lastPeriodDate && (() => {
                  const cycleDay = ((Math.floor((new Date() - new Date(lastPeriodDate)) / 86400000)) % 28) + 1;
                  const phases = [
                    {
                      days: [1,5], emoji: "🩸", name: "Fase menstrual",
                      color: "#c9607a",
                      desc: "Tu cuerpo necesita descanso y movimiento suave.",
                      recs: ["Caminar o yoga suave", "Ejercicios de movilidad", "Evita entrenamientos de alta intensidad", "Prioriza el descanso activo"]
                    },
                    {
                      days: [6,13], emoji: "🌱", name: "Fase folicular",
                      color: "#7ece9e",
                      desc: "Energía en alza. Es tu mejor momento para entrenar fuerte.",
                      recs: ["Entrenamiento de fuerza", "Aumenta los pesos progresivamente", "Ideal para aprender técnica nueva", "Máximo rendimiento cardiovascular"]
                    },
                    {
                      days: [14,16], emoji: "💐", name: "Fase ovulatoria",
                      color: "#f4afc8",
                      desc: "Pico de energía y fuerza. Aprovéchalo.",
                      recs: ["Entrena con máxima intensidad", "Prueba nuevos récords personales", "Cuida las articulaciones", "Hidratación extra importante"]
                    },
                    {
                      days: [17,28], emoji: "🧸", name: "Fase lútea",
                      color: "#c9a96e",
                      desc: "Tu cuerpo pide más recuperación. Entrena con control.",
                      recs: ["Reduce la intensidad si te sientes cansada", "Pilates o yoga", "Mantén la constancia sin forzar", "Prioriza el sueño y la nutrición"]
                    }
                  ];
                  const phase = phases.find(p => cycleDay >= p.days[0] && cycleDay <= p.days[1]) || phases[3];
                  return (
                    <div style={{
                      background:"rgba(0,0,0,0.25)", borderRadius:"14px",
                      padding:"16px", marginTop:"12px", marginBottom:"12px",
                      border:`1px solid ${phase.color}40`
                    }}>
                      <p style={{fontSize:"16px", marginBottom:"4px"}}>{phase.emoji} <strong>{phase.name}</strong></p>
                      <p style={{fontSize:"12px", color:"rgba(244,175,200,0.7)", marginBottom:"12px"}}>Día {cycleDay} de tu ciclo</p>
                      <p style={{fontSize:"13px", color:"#f5ede6", marginBottom:"12px", lineHeight:"1.6"}}>{phase.desc}</p>
                      <p style={{fontSize:"11px", color:phase.color, marginBottom:"8px", letterSpacing:"0.1em", textTransform:"uppercase"}}>Te recomendamos</p>
                      {phase.recs.map((r, i) => (
                        <p key={i} style={{fontSize:"13px", color:"rgba(244,175,200,0.8)", marginBottom:"4px"}}>· {r}</p>
                      ))}
                    </div>
                  );
                })()}
                <p onClick={() => setSkipCycle(true)}
                  style={{fontSize:"12px", color:"rgba(244,175,200,0.45)", textAlign:"center", cursor:"pointer", marginTop:"8px"}}>
                  Prefiero no indicarlo
                </p>
              </>
            ) : (
              <div style={{textAlign:"center", padding:"20px"}}>
                <p style={{fontSize:"14px", color:"rgba(244,175,200,0.6)"}}>Sin problema 🌸</p>
                <p onClick={() => setSkipCycle(false)}
                  style={{fontSize:"12px", color:"#c9607a", cursor:"pointer", marginTop:"8px"}}>
                  Añadirlo igualmente
                </p>
              </div>
            )}
          </div>
          <div className="ob-footer">
            <button className="btn-primary" onClick={next}>CONTINUAR →</button>
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <div className="ob-top">
            {step > 1 && (
              <button onClick={back} style={{
                background:"none", border:"none", color:"rgba(244,175,200,0.5)",
                fontSize:"13px", cursor:"pointer", padding:"0",
                marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px"
              }}>← Volver</button>
            )}
            <StepBar total={6} current={6} />
            <p className="ob-num">Paso 6 de 6 · Tu compromiso</p>
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
