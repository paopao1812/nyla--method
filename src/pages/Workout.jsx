
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestTimer from "../components/RestTimer";
import "../styles/Workout.css";
import "../styles/RestTimer.css";

const plans = {
  fiveDays: {
    label: "Plan 5 días",
    shortLabel: "5 días",
    days: ["Día 1 · Glúteos","Día 2 · Espalda y Bíceps","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros","Día 5 · Glúteos unilaterales"],
  },
  threeDays: {
    label: "Plan 3 días",
    shortLabel: "3 días",
    days: ["Día 1 · Cuádriceps","Día 2 · Torso","Día 3 · Glúteos + Pierna"],
  },
  glutesOnly: {
    label: "Only Glúteos",
    shortLabel: "Only Glúteos",
    days: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
  },
};

const getDayShort = (day) => {
  if (day.includes("Glúteos unilaterales")) return { num: day.split("·")[0].trim(), name: "Unilateral" };
  if (day.includes("Glúteos + Femoral"))    return { num: day.split("·")[0].trim(), name: "Glút+Fem" };
  if (day.includes("Glúteos + Pierna"))     return { num: day.split("·")[0].trim(), name: "Glút+Pierna" };
  if (day.includes("Glúteos"))              return { num: day.split("·")[0].trim(), name: "Glúteos" };
  if (day.includes("Espalda y Bíceps"))     return { num: day.split("·")[0].trim(), name: "Espalda" };
  if (day.includes("Espalda"))              return { num: day.split("·")[0].trim(), name: "Espalda" };
  if (day.includes("Torso"))                return { num: day.split("·")[0].trim(), name: "Torso" };
  if (day.includes("Cuádriceps"))           return { num: day.split("·")[0].trim(), name: "Cuádriceps" };
  if (day.includes("Hombros"))              return { num: day.split("·")[0].trim(), name: "Hombros" };
  if (day.includes("Pierna"))               return { num: day.split("·")[0].trim(), name: "Pierna" };
  return { num: day.split("·")[0].trim(), name: day.split("·")[1]?.trim() || "" };
};

const activationPlan = [
  { name: "Clamshell con banda", description: "Tumbada de lado, abre lento manteniendo tensión.", reps: "3 × 15 por lado" },
  { name: "Puente de glúteos", description: "Aprieta glúteos arriba y mantén 2 segundos.", reps: "3 × 15" },
  { name: "Monster walk con banda", description: "Pasos laterales con banda en rodillas, espalda recta.", reps: "3 × 12 por lado" },
];

const corePlan = [
  { name: "Heels Taps", reps: "3 × 20 repeticiones" },
  { name: "Plancha frontal", reps: "3 × 30 segundos" },
  { name: "Bird Dog", reps: "3 × 10 por lado" },
];

const weeklyPlan = {
  // Plan 5 días
  "Día 1 · Glúteos": [
    { name: "Hip thrust" },
    { name: "Peso muerto rumano" },
    { name: "Step Up" },
    { name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },
  ],
  "Día 2 · Espalda y Bíceps": [
    { name: "Dominadas con banda" },
    { name: "Jalón al pecho" },
    { name: "Pullover" },
    { name: "Remo" },
    { name: "Hiperextensiones" },
    { name: "Curl bíceps en polea" },
  ],
  "Día 3 · Cuádriceps o Descanso": [
    { name: "Aductores en máquina" },
    { name: "Sentadilla búlgara" },
    { name: "Sentadilla Goblet con talones elevados" },
    { name: "Prensa pies abajo" },
    { name: "Extensión de piernas" },
    { name: "Gemelos en máquina" },
  ],
  "Día 4 · Hombros": [
    { name: "Press militar" },
    { name: "Vuelos laterales" },
    { name: "Vuelos frontales" },
    { name: "Remo al cuello" },
    { name: "Curl tríceps en polea" },
  ],
  "Día 5 · Glúteos unilaterales": [
    { name: "Hip thrust a una pierna" },
    { name: "Peso muerto a una pierna" },
    { name: "Step Up" },
    { name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },
  ],
  // Plan 3 días
  "Día 1 · Cuádriceps": [
    { name: "Aductores en máquina" },
    { name: "Sentadilla búlgara" },
    { name: "Sentadilla Goblet con talones elevados" },
    { name: "Prensa pies abajo" },
    { name: "Extensión de piernas" },
    { name: "Gemelos en máquina" },
  ],
  "Día 2 · Torso": [
    { name: "Jalón al pecho" },
    { name: "Remo sentado" },
    { name: "Press militar" },
    { name: "Elevaciones laterales" },
    { name: "Curl bíceps" },
    { name: "Curl tríceps" },
  ],
  "Día 3 · Glúteos + Pierna": [
    { name: "Hip thrust" },
    { name: "Peso muerto rumano" },
    { name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },
    { name: "Curl femoral" },
  ],
  // Only Glúteos
  "Día 2 · Glúteos + Femoral": [
    { name: "Hip thrust" },
    { name: "Peso muerto rumano" },
    { name: "Sentadilla búlgara" },
    { name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },
  ],
  "Día 3 · Glúteos unilaterales": [
    { name: "Hip thrust a una pierna" },
    { name: "Peso muerto a una pierna" },
    { name: "Step Up" },
    { name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },
  ],
};

const getSets = (w) => w <= 3 ? 2 : w === 4 ? 3 : 4;
const getReps = () => "6–12 reps";
const getCardio = (w) => ({
  time: "25 min",
  incline: Math.min(5 + Math.floor((w - 1) / 2), 9),
  speed: Math.min(3.5 + (w - 1) * 0.15, 5.5).toFixed(1),
});
const getBlockLabel = (w) => {
  if (w <= 4) return "Construyendo tu base";
  if (w <= 8) return "Ganando fuerza";
  if (w <= 12) return "Potencia en progreso";
  return "Tu mejor versión";
};
const getMotivation = (w) => {
  if (w <= 4) return "Estás sentando las bases. Cada repetición cuenta.";
  if (w <= 8) return "Tu cuerpo ya nota el cambio. Sigue construyendo.";
  if (w <= 12) return "Estás más fuerte de lo que crees. No pares.";
  return "Has llegado lejos. NYLA sigue contigo.";
};

export default function Workout() {
  const navigate = useNavigate();
  const [internalWeek, setInternalWeek] = useState(() => {
    const saved = localStorage.getItem("nylaInternalWeek");
    return saved ? parseInt(saved) : 1;
  });
  const [selectedPlan, setSelectedPlan] = useState(() => {
  return localStorage.getItem("nylaSelectedPlan") || "fiveDays";
});

const [selectedDay, setSelectedDay] = useState(() => {
  return localStorage.getItem("nylaSelectedDay") || "Día 1 · Glúteos";
});
  const [activeSection, setActiveSection] = useState("activation");
  const [lastPeriodDate] = useState(() => localStorage.getItem("nylaLastPeriodDate") || "");
  const [completedDays, setCompletedDays] = useState(() => {
    const s = localStorage.getItem("nylaCompletedDays");
    return s ? JSON.parse(s) : [];
  });
  const [exerciseWeights, setExerciseWeights] = useState(() => {
    const s = localStorage.getItem("nylaExerciseWeights");
    return s ? JSON.parse(s) : {};
  });
  const [completedExercises, setCompletedExercises] = useState({});
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  useEffect(() => { localStorage.setItem("nylaCompletedDays", JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { localStorage.setItem("nylaExerciseWeights", JSON.stringify(exerciseWeights)); }, [exerciseWeights]);
  useEffect(() => { localStorage.setItem("nylaInternalWeek", String(internalWeek)); }, [internalWeek]);

  const getCycleInfo = () => {
    if (!lastPeriodDate) return null;
    const cycleDay = ((Math.floor((new Date() - new Date(lastPeriodDate)) / 86400000)) % 28) + 1;
    if (cycleDay <= 5)  return { emoji: "🩸", phase: "Fase menstrual",  message: "Prioriza movilidad y descanso activo hoy." };
    if (cycleDay <= 13) return { emoji: "🌱", phase: "Fase folicular",  message: "Energía en alza. Ideal para fuerza y progresión." };
    if (cycleDay <= 16) return { emoji: "💐", phase: "Fase ovulatoria", message: "Máximo rendimiento. Cuida técnica y articulaciones." };
    return { emoji: "🧸", phase: "Fase lútea", message: "Entrena con control. Prioriza recuperación." };
  };

  const cycleInfo = getCycleInfo();
  const sets = getSets(internalWeek);
  const cardio = getCardio(internalWeek);
  const exercises = weeklyPlan[selectedDay] || [];
  const dayKey = useMemo(() => `${selectedPlan}-${internalWeek}-${selectedDay}`, [selectedPlan, internalWeek, selectedDay]);
  const isCompleted = completedDays.includes(dayKey);
  const totalCompleted = completedDays.length;
  const weeklyCompleted = plans[selectedPlan].days.filter(d =>
    completedDays.includes(`${selectedPlan}-${internalWeek}-${d}`)
  ).length;
  const progressPercent = (weeklyCompleted / plans[selectedPlan].days.length) * 100;
  const blockComplete = weeklyCompleted >= plans[selectedPlan].days.length;
  const isLastBlock = internalWeek >= 16;

  const toggleCompleted = () => setCompletedDays(isCompleted
    ? completedDays.filter(i => i !== dayKey)
    : [...completedDays, dayKey]
  );
  const handleAdvance = () => {
    if (internalWeek < 16) {
      setInternalWeek(w => w + 1);
      setSelectedDay(plans[selectedPlan].days[0]);
      setActiveSection("activation");
      setCompletedExercises({});
    }
    setShowAdvanceModal(false);
  };
  const updateWeight = (name, value) => setExerciseWeights({
    ...exerciseWeights,
    [`${selectedPlan}-${internalWeek}-${selectedDay}-${name}`]: value,
  });
  const toggleExDone = (name) => setCompletedExercises(p => ({ ...p, [name]: !p[name] }));

  const isLower = selectedDay.includes("Glúteos") || selectedDay.includes("Pierna") || selectedDay.includes("Femoral") || selectedDay.includes("Cuádriceps");
  const isUpper = selectedDay.includes("Espalda") || selectedDay.includes("Hombros") || selectedDay.includes("Torso");

  const sectionLabels = { activation: "Activación", exercises: "Ejercicios", core: "Core", cardio: "Cardio" };
  const lowerSections = ["activation", "exercises", "cardio"];
  const upperSections = ["exercises", "core", "cardio"];

  return (
    <section className="wk-screen">

      {/* MODAL */}
      {showAdvanceModal && (
        <div className="wk-modal-overlay">
          <div className="wk-modal">
            <p className="wk-modal-eyebrow">NYLA</p>
            <h2 className="wk-modal-title">¿Lista para continuar al siguiente nivel?</h2>
            <p className="wk-modal-sub">Tu progresión se actualizará. Los pesos y series evolucionan contigo.</p>
            <div className="wk-modal-btns">
              <button className="wk-modal-cancel" onClick={() => setShowAdvanceModal(false)}>Cancelar</button>
              <button className="wk-modal-confirm" onClick={handleAdvance}>✨ Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="wk-hero">
        <div className="wk-hero-badges">
          <span className="wk-badge-pill">· {getBlockLabel(internalWeek).toUpperCase()}</span>
          {cycleInfo && <span className="wk-badge-phase">{cycleInfo.emoji} {cycleInfo.phase}</span>}
        </div>
        <h1 className="wk-hero-title">{selectedDay.split("·")[1]?.trim() || selectedDay}</h1>
        <div className="wk-hero-meta">
          <span>⏱ {sets <= 2 ? "30" : sets === 3 ? "40" : "50"} min</span>
          <span>🔥 {exercises.length} ejercicios</span>
          <span>💪 {sets} series</span>
        </div>
        <div className="wk-hero-preview">
          <div className="wk-hero-exs">
            {exercises.slice(0, 3).map((e, i) => <span key={i}>· {e.name}</span>)}
            {exercises.length > 3 && <span>+{exercises.length - 3} más...</span>}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="wk-stats">
        <div className="wk-stat"><span className="wk-stat-n">{totalCompleted}</span><span className="wk-stat-l">SESIONES</span></div>
        <div className="wk-stat"><span className="wk-stat-n">{weeklyCompleted}</span><span className="wk-stat-l">ESTA SEMANA</span></div>
        <div className="wk-stat"><span className="wk-stat-n">🔥</span><span className="wk-stat-l">RACHA ACTIVA</span></div>
      </div>

      {/* CYCLE */}
      {cycleInfo && (
        <div className="wk-cycle">
          <p className="wk-cycle-label">TU CICLO HOY</p>
          <h3 className="wk-cycle-title">{cycleInfo.emoji} {cycleInfo.phase}</h3>
          <p className="wk-cycle-msg">{cycleInfo.message}</p>
        </div>
      )}

      {/* MOTIVACIÓN */}
      <div className="wk-motivation">
        <p className="wk-motivation-text">✦ {getMotivation(internalWeek)}</p>
      </div>

      {/* PROGRESS */}
      <div className="wk-progress">
        <div className="wk-progress-top">
          <span>Tu avance</span>
          <strong>{weeklyCompleted}/{plans[selectedPlan].days.length} entrenamientos</strong>
        </div>
        <div className="wk-bar"><div className="wk-bar-fill" style={{ width: `${progressPercent}%` }} /></div>
        <p className="wk-progress-msg">{blockComplete ? "Bloque completado. Estoy orgullosa de ti ✨" : "Cada entrenamiento te acerca más a ti."}</p>
      </div>

      {blockComplete && !isLastBlock && (
        <button className="wk-advance-btn" onClick={() => setShowAdvanceModal(true)}>✨ Siguiente nivel</button>
      )}
      {blockComplete && isLastBlock && (
        <div className="wk-final-card">
          <p className="wk-final-emoji">🌸</p>
          <h3 className="wk-final-title">Has completado el método NYLA</h3>
          <p className="wk-final-sub">Tu transformación es real. NYLA sigue contigo.</p>
        </div>
      )}

      {/* PLAN SELECTOR */}
      <div className="wk-segment">
        {Object.entries(plans).map(([k, p]) => (
          <button key={k} className={`wk-segment-btn ${selectedPlan === k ? "active" : ""}`}
            onClick={() => { setSelectedPlan(k); setSelectedDay(p.days[0]); setActiveSection("activation"); }}>
            {p.shortLabel}
          </button>
        ))}
      </div>

      {/* DAY SELECTOR */}
      <div className="wk-day-grid">
        {plans[selectedPlan].days.map(day => {
          const { num, name } = getDayShort(day);
          const dayNum = num.replace("Día ", "D");
          return (
            <button key={day} className={`wk-day-chip ${selectedDay === day ? "active" : ""}`}
              onClick={() => {
                setSelectedDay(day);
                setActiveSection(
                  day.includes("Glúteos") || day.includes("Pierna") || day.includes("Femoral") || day.includes("Cuádriceps")
                    ? "activation" : "exercises"
                );
              }}>
              <span className="wk-day-num">{dayNum}</span>
              <span className="wk-day-name">{name}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION TABS */}
      {isLower && (
        <div className="wk-section-grid">
          {lowerSections.map(s => (
            <button key={s} className={`wk-section-btn ${activeSection === s ? "active" : ""}`} onClick={() => setActiveSection(s)}>
              {sectionLabels[s]}
            </button>
          ))}
        </div>
      )}
      {isUpper && (
        <div className="wk-section-grid">
          {upperSections.map(s => (
            <button key={s} className={`wk-section-btn ${activeSection === s ? "active" : ""}`} onClick={() => setActiveSection(s)}>
              {sectionLabels[s]}
            </button>
          ))}
        </div>
      )}

      {/* ACTIVATION */}
      {activeSection === "activation" && (
        <div className="wk-card">
          <h2 className="wk-card-title">Activación de Glúteos</h2>
          <p className="wk-card-sub">8 min · Sin peso · Lento y controlado.</p>
          <div className="wk-ex-list">
            {activationPlan.map((ex, i) => (
              <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-body">
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                  <strong>{ex.reps}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXERCISES */}
      {activeSection === "exercises" && (
        <div className="wk-card">
          <h2 className="wk-card-title">{selectedDay}</h2>
          <p className="wk-card-sub">{sets} series · 6–12 reps por ejercicio</p>
          <div className="wk-ex-list">
            {exercises.map((ex, i) => (
              <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-body">
                  <h3>{ex.name}</h3>
                  <p>{sets} series · {getReps()}</p>
                  <input className="wk-input" type="number" placeholder="Peso usado (kg)"
                    value={exerciseWeights[`${selectedPlan}-${internalWeek}-${selectedDay}-${ex.name}`] || ""}
                    onChange={e => updateWeight(ex.name, e.target.value)} />
                  <div className="wk-ex-actions">
                    <RestTimer />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORE */}
      {activeSection === "core" && (
        <div className="wk-card">
          <h2 className="wk-card-title">Core</h2>
          <div className="wk-ex-list">
            {corePlan.map((ex, i) => (
              <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-body">
                  <h3>{ex.name}</h3>
                  <p>{ex.reps}</p>
                  {ex.name === "Plancha frontal" && (
                    <div className="wk-ex-actions">
                      <RestTimer />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CARDIO */}
      {activeSection === "cardio" && (
        <div className="wk-cardio">
          <p className="wk-cardio-eyebrow">CARDIO DESPUÉS DE PESAS</p>
          <h2 className="wk-cardio-title">Caminadora inclinada</h2>
          <div className="wk-cardio-stats">
            <div><span>Tiempo</span><strong>{cardio.time}</strong></div>
            <div><span>Inclinación</span><strong>{cardio.incline}</strong></div>
            <div><span>Velocidad</span><strong>{cardio.speed}</strong></div>
          </div>
          <small>Intensidad cómoda. Inclinación máx. 9 · Velocidad máx. 5.5</small>
          <button className={`wk-complete ${isCompleted ? "done" : ""}`} onClick={toggleCompleted}>
            {isCompleted ? "Entrenamiento completado ✅" : "Marcar como completado"}
          </button>
        </div>
      )}

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn active" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Videoteca</span></button>
      </nav>
    </section>
  );
}