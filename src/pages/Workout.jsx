
import { useState, useMemo, useEffect } from "react";
import { trackActivity } from "../utils/trackActivity";
import { VIDEO_MAP } from "../data/videoMap";
import { useNavigate } from "react-router-dom";
import RestTimer from "../components/RestTimer";
import "../styles/Workout.css";
import "../styles/RestTimer.css";

const PLAN_DAYS = {
  fiveDays: ["Día 1 · Glúteos","Día 2 · Espalda y Bíceps","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros","Día 5 · Glúteos unilaterales"],
  threeDays: ["Día 1 · Cuádriceps","Día 2 · Tren Superior","Día 3 · Glúteos + Pierna"],
  glutesOnly: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
  homeDays: ["Día 1 · Glúteos y Pierna","Día 2 · Tren Superior","Día 3 · Glúteos + Core"],
};

const plans = {
  fiveDays: {
    label: "Plan 5 días",
    shortLabel: "5 días",
    days: ["Día 1 · Glúteos","Día 2 · Espalda y Bíceps","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros","Día 5 · Glúteos unilaterales"],
  },
  threeDays: {
    label: "Plan 3 días",
    shortLabel: "3 días",
    days: ["Día 1 · Cuádriceps","Día 2 · Tren Superior","Día 3 · Glúteos + Pierna"],
  },
  glutesOnly: {
    label: "Only Glúteos",
    shortLabel: "Only Glúteos",
    days: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
  },
  homeDays: {
    label: "En Casa",
    shortLabel: "En Casa",
    days: ["Día 1 · Glúteos y Pierna","Día 2 · Tren Superior","Día 3 · Glúteos + Core"],
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
  "Día 1 · Glúteos": [
    { name: "Hip Thrust con barra" },{ name: "Peso muerto" },{ name: "Step Up" },
    { name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" },
  ],
  "Día 2 · Espalda y Bíceps": [
    { name: "Dominadas con banda" },{ name: "Jalón al pecho" },{ name: "Pullover" },
    { name: "Remo sentado" },{ name: "Hiperextensiones" },{ name: "Curl bíceps" },
  ],
  "Día 3 · Cuádriceps o Descanso": [
    { name: "Aductores en máquina" },{ name: "Sentadilla búlgara" },
    { name: "Sentadilla Goblet con talones elevados" },{ name: "Prensa pies abajo" },
    { name: "Extensión de cuádriceps" },{ name: "Gemelos en máquina" },
  ],
  "Día 4 · Hombros": [
    { name: "Press militar" },{ name: "Elevaciones laterales" },{ name: "Elevaciones frontales" },
    { name: "Remo al cuello" },{ name: "Curl de tríceps" },
  ],
  "Día 5 · Glúteos unilaterales": [
    { name: "Hip Thrust a una pierna" },{ name: "Peso muerto a una pierna" },{ name: "Step Up" },
    { name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" },
  ],
  "Día 1 · Cuádriceps": [
    { name: "Aductores en máquina" },{ name: "Sentadilla búlgara" },
    { name: "Sentadilla Goblet con talones elevados" },{ name: "Prensa pies abajo" },
    { name: "Extensión de piernas" },{ name: "Gemelos en máquina" },
  ],
  "Día 2 · Tren Superior": [
    { name: "Jalón al pecho" },{ name: "Remo sentado" },{ name: "Press militar" },
    { name: "Elevaciones laterales" },{ name: "Curl bíceps" },{ name: "Curl tríceps" },
  ],
  "Día 3 · Glúteos + Pierna": [
    { name: "Hip thrust" },{ name: "Peso muerto rumano" },{ name: "Patada de glúteo en polea" },
    { name: "Abducciones en máquina" },{ name: "Femoral tumbado" },
  ],
  "Día 1 · Glúteos y Pierna": [
    { name: "Hip thrust con banda" },{ name: "Sentadilla sumo con mancuerna" },{ name: "Peso muerto rumano con mancuernas" },
    { name: "Patada de glúteo con banda" },{ name: "Abducción lateral con banda" },
  ],
  "Día 2 · Tren Superior": [
    { name: "Press de hombros con mancuernas" },{ name: "Remo con mancuerna" },{ name: "Curl de bíceps con mancuernas" },
    { name: "Extensión de tríceps con mancuerna" },{ name: "Elevaciones laterales" },
  ],
  "Día 3 · Glúteos + Core": [
    { name: "Puente de glúteos con banda" },{ name: "Sentadilla búlgara con mancuernas" },{ name: "Peso muerto a una pierna" },
    { name: "Plancha frontal" },{ name: "Bird Dog" },{ name: "Heels Taps" },
  ],
  "Día 2 · Glúteos + Femoral": [
    { name: "Hip thrust" },{ name: "Peso muerto rumano" },{ name: "Sentadilla búlgara" },
    { name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" },
  ],
  "Día 3 · Glúteos unilaterales": [
    { name: "Hip thrust a una pierna" },{ name: "Peso muerto a una pierna" },{ name: "Step Up" },
    { name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" },
  ],
};

const getSets = (w) => w <= 3 ? 2 : w === 4 ? 3 : 4;
const getReps = () => "6–12 reps";
const cardioTable = [
  { time: "15 min", incline: 3, eliptica: 3 },
  { time: "20 min", incline: 4, eliptica: 4 },
  { time: "20 min", incline: 5, eliptica: 5 },
  { time: "25 min", incline: 6, eliptica: 6 },
  { time: "25 min", incline: 7, eliptica: 7 },
  { time: "30 min", incline: 8, eliptica: 8 },
  { time: "30 min", incline: 9, eliptica: "8–9" },
  { time: "30 min", incline: 10, eliptica: "9–10" },
];
const getCardio = (w) => {
  const idx = Math.min(Math.floor((w - 1) / 2), 7);
  return cardioTable[idx];
};
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
  const [internalWeek, setInternalWeek] = useState(() => {
    const saved = localStorage.getItem("nylaInternalWeek");
    return saved ? parseInt(saved) : 1;
  });

  const [selectedPlan, setSelectedPlan] = useState(() =>
    localStorage.getItem("nylaSelectedPlan") || "fiveDays"
  );

  const [selectedDay, setSelectedDay] = useState(() =>
    localStorage.getItem("nylaSelectedDay") || "Día 1 · Glúteos"
  );

  const [activeSection, setActiveSection] = useState(() =>
    localStorage.getItem("nylaActiveSection") || "exercises"
  );

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
  const [activeVideo, setActiveVideo] = useState(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Persistir estado al cambiar
  useEffect(() => { localStorage.setItem("nylaCompletedDays", JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { localStorage.setItem("nylaExerciseWeights", JSON.stringify(exerciseWeights)); }, [exerciseWeights]);
  useEffect(() => { localStorage.setItem("nylaInternalWeek", String(internalWeek)); }, [internalWeek]);
  useEffect(() => { localStorage.setItem("nylaSelectedPlan", selectedPlan); }, [selectedPlan]);
  useEffect(() => { localStorage.setItem("nylaSelectedDay", selectedDay); }, [selectedDay]);
  useEffect(() => { localStorage.setItem("nylaActiveSection", activeSection); }, [activeSection]);

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
      setActiveSection("exercises");
      setCompletedExercises({});
    }
    setShowAdvanceModal(false);
  };

  const updateWeight = (name, value) => setExerciseWeights({
    ...exerciseWeights,
    [`${selectedPlan}-${internalWeek}-${selectedDay}-${name}`]: value,
  });

  // Obtener peso de semana anterior
  const getPrevWeight = (name) => {
    if (internalWeek <= 1) return null;
    return exerciseWeights[`${selectedPlan}-${internalWeek - 1}-${selectedDay}-${name}`] || null;
  };


  const handleComplete = () => {
    trackActivity();
    const key = `${selectedPlan}-${internalWeek}-${selectedDay}`;
    const current = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
    if (!current.includes(key)) {
      const updated = [...current, key];
      localStorage.setItem("nylaCompletedDays", JSON.stringify(updated));
      setCompletedDays(updated);
    }
    setShowSummaryModal(true);
  };

  const handleGoHome = () => {
    const completedDaysArr = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
    const days = PLAN_DAYS[selectedPlan] || [];
    const nextDay = days.find(d => !completedDaysArr.includes(`${selectedPlan}-${internalWeek}-${d}`));
    if (nextDay) {
      localStorage.setItem("nylaSelectedDay", nextDay);
      localStorage.setItem("nylaSelectedPlan", selectedPlan);
      const isLowerDay = nextDay.includes("Glúteos") || nextDay.includes("Pierna") || nextDay.includes("Femoral") || nextDay.includes("Cuádriceps");
      localStorage.setItem("nylaActiveSection", isLowerDay ? "activation" : "exercises");
    } else {
      localStorage.removeItem("nylaSelectedDay");
      localStorage.removeItem("nylaActiveSection");
    }
    setShowSummaryModal(false);
    navigate("/home");
  };
  const toggleExDone = (name) => setCompletedExercises(p => ({ ...p, [name]: !p[name] }));

  const isLower = selectedDay.includes("Glúteos") || selectedDay.includes("Pierna") || selectedDay.includes("Femoral") || selectedDay.includes("Cuádriceps");
  const isUpper = selectedDay.includes("Espalda") || selectedDay.includes("Hombros") || selectedDay.includes("Torso");

  const sectionLabels = { activation: "Activación", exercises: "Ejercicios", core: "Core", cardio: "Cardio" };
  const lowerSections = ["activation", "exercises", "cardio"];
  const upperSections = ["core", "exercises", "cardio"];

  const changeSection = (s) => setActiveSection(s);
  const changeDay = (day) => {
    setSelectedDay(day);
    const isLowerDay = day.includes("Glúteos") || day.includes("Pierna") || day.includes("Femoral") || day.includes("Cuádriceps");
    setActiveSection(isLowerDay ? "activation" : "exercises");
  };

  return (
    <div className="wk-screen">

      {/* MODAL */}

      {showSummaryModal && (
        <div className="wk-modal-overlay">
          <div className="wk-modal">
            <p className="wk-modal-eyebrow">NYLA METHOD</p>
            <h2 className="wk-modal-title">¡Entrenamiento completado! 🌸</h2>
            <p className="wk-modal-sub">{selectedDay.split("·")[1]?.trim() || selectedDay}</p>
            <div className="wk-modal-stats">
              <span>💪 {exercises.length} ejercicios</span>
              <span>🔥 {sets} series</span>
            </div>
            <p className="wk-modal-motivation">{getMotivation(internalWeek)}</p>
            <div className="wk-modal-btns">
              <button className="wk-modal-confirm" onClick={handleGoHome}>Volver a Home ✦</button>
            </div>
          </div>
        </div>
      )}

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
        {[
          { key: "fiveDays", icon: "🏋️", label: "5 días" },
          { key: "threeDays", icon: "📅", label: "3 días" },
          { key: "glutesOnly", icon: "🍑", label: "Glúteos" },
          { key: "homeDays", icon: "🏠", label: "Casa" },
        ].map(({ key, icon, label }) => (
          <button key={key} className={`wk-segment-btn ${selectedPlan === key ? "active" : ""}`}
            onClick={() => { setSelectedPlan(key); setSelectedDay(plans[key].days[0]); setActiveSection("activation"); }}>
            <span className="wk-seg-icon">{icon}</span>
            <span className="wk-seg-label">{label}</span>
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
              onClick={() => changeDay(day)}>
              <span className="wk-day-num">{dayNum}</span>
              <span className="wk-day-name">{name}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION TABS */}


      {/* ACTIVATION */}
      {isLower && activeSection === "activation" && (
        <div className="wk-card">
          <h2 className="wk-card-title">Activación de Glúteos</h2>
          <p className="wk-card-sub">8 min · Sin peso · Lento y controlado.</p>
          <div className="wk-ex-list">
            {activationPlan.map((ex, i) => (
              <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-body">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h3>{ex.name}</h3>
                    {VIDEO_MAP[ex.name] && (
                      <button className="wk-video-btn" onClick={() => setActiveVideo(activeVideo === ex.name ? null : ex.name)}>
                        {activeVideo === ex.name ? "✕" : "▶"}
                      </button>
                    )}
                  </div>
                  {activeVideo === ex.name && VIDEO_MAP[ex.name] && (
                    <video src={VIDEO_MAP[ex.name]} controls playsInline autoPlay muted controlsList="nodownload"
                      style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}} />
                  )}
                  <p>{ex.description}</p>
                  <strong>{ex.reps}</strong>
                </div>
              </div>
            ))}
          </div>
          <button className="wk-complete" style={{marginTop:"16px"}} onClick={() => setActiveSection("exercises")}>
            Siguiente: Ejercicios →
          </button>
        </div>
      )}

      {/* EXERCISES */}
      {activeSection === "exercises" && (
        <div className="wk-card">
          <h2 className="wk-card-title">{selectedDay}</h2>
          <p className="wk-card-sub">{sets} series · 6–12 reps por ejercicio</p>
          <div className="wk-ex-list">
            {exercises.map((ex, i) => {
              const prevWeight = getPrevWeight(ex.name);
              return (
                <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                  <div className="wk-ex-num">{i + 1}</div>
                  <div className="wk-ex-body">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <h3>{ex.name}</h3>
                      {VIDEO_MAP[ex.name] && (
                        <button className="wk-video-btn" onClick={() => setActiveVideo(activeVideo === ex.name ? null : ex.name)}>
                          {activeVideo === ex.name ? "✕" : "▶"}
                        </button>
                      )}
                    </div>
                    {activeVideo === ex.name && VIDEO_MAP[ex.name] && (
                      <video
                        src={VIDEO_MAP[ex.name]}
                        controls
                        playsInline
                        autoPlay
                        muted
                        controlsList="nodownload"
                        style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}}
                      />
                    )}
                    <p>{sets} series · {getReps()}</p>
                    <input className="wk-input" type="number" placeholder="Peso usado (kg)"
                      value={exerciseWeights[`${selectedPlan}-${internalWeek}-${selectedDay}-${ex.name}`] || ""}
                      onChange={e => updateWeight(ex.name, e.target.value)} />
                    {prevWeight && (
                      <p className="wk-prev-weight">↑ Semana anterior: {prevWeight} kg</p>
                    )}
                    <div className="wk-ex-actions">
                      <RestTimer />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="wk-complete" style={{marginTop:"16px"}} onClick={() => setActiveSection(isUpper ? "core" : "cardio")}>
            Siguiente: {isUpper ? "Core" : "Cardio"} →
          </button>
        </div>
      )}

      {/* CORE */}
      {isUpper && activeSection === "core" && (
        <div className="wk-card">
          <h2 className="wk-card-title">Core</h2>
          <div className="wk-ex-list">
            {corePlan.map((ex, i) => (
              <div className={`wk-ex ${completedExercises[ex.name] ? "done" : ""}`} key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-body">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h3>{ex.name}</h3>
                    {VIDEO_MAP[ex.name] && (
                      <button className="wk-video-btn" onClick={() => setActiveVideo(activeVideo === ex.name ? null : ex.name)}>
                        {activeVideo === ex.name ? "✕" : "▶"}
                      </button>
                    )}
                  </div>
                  {activeVideo === ex.name && VIDEO_MAP[ex.name] && (
                    <video src={VIDEO_MAP[ex.name]} controls playsInline autoPlay muted controlsList="nodownload"
                      style={{width:"100%",borderRadius:"10px",marginBottom:"8px"}} />
                  )}
                  <p>{ex.reps}</p>
                  {ex.name === "Plancha frontal" && (
                    <div className="wk-ex-actions"><RestTimer /></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="wk-complete" style={{marginTop:"16px"}} onClick={() => setActiveSection("cardio")}>
            Siguiente: Cardio →
          </button>
        </div>
      )}

      {/* CARDIO */}
      {activeSection === "cardio" && (
        selectedPlan === "homeDays" ? (
          <div className="wk-cardio">
            <p className="wk-cardio-eyebrow">MOVIMIENTO DIARIO</p>
            <h2 className="wk-cardio-title">🚶‍♀️ Pasos diarios</h2>
            <div className="wk-cardio-stats">
              <div><span>Objetivo mínimo</span><strong>10.000</strong></div>
              <div><span>Objetivo ideal</span><strong>15.000</strong></div>
            </div>
            <p style={{textAlign:"center", padding:"0 16px", opacity:0.7, fontSize:"14px"}}>
              Caminar es la forma más efectiva de mantenerte activa en casa. Distribuye los pasos a lo largo del día.
            </p>
            <button className="wk-complete" onClick={handleComplete}>
              Finalizar entrenamiento ✦
            </button>
          </div>
        ) : (
          <div className="wk-cardio">
            <p className="wk-cardio-eyebrow">CARDIO DESPUÉS DE PESAS · SEMANA {internalWeek}</p>
            <h2 className="wk-cardio-title">🚶‍♀️ Caminadora inclinada</h2>
            <div className="wk-cardio-stats">
              <div><span>Tiempo</span><strong>{cardio.time}</strong></div>
              <div><span>Inclinación</span><strong>{cardio.incline}%</strong></div>
            </div>
            <div className="wk-cardio-divider" />
            <h2 className="wk-cardio-title">🔄 Elíptica</h2>
            <div className="wk-cardio-stats">
              <div><span>Tiempo</span><strong>{cardio.time}</strong></div>
              <div><span>Resistencia</span><strong>{cardio.eliptica}</strong></div>
            </div>
            <small>Elige una opción. Intensidad cómoda y constante.</small>
            <button className="wk-complete" onClick={handleComplete}>
              Finalizar entrenamiento ✦
            </button>
          </div>
        )
      )}

      
    </div>
  );
}// fix build Sat Jul 18 21:48:28 CEST 2026
