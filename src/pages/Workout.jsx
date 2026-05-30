import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Workout.css";

const plans = {
  fiveDays: {
    label: "Plan 5 días",
    days: ["Día 1 · Glúteos","Día 2 · Espalda","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros / Bíceps / Tríceps","Día 5 · Glúteos unilaterales"],
  },
  threeDays: {
    label: "Plan 3 días",
    days: ["Día 1 · Glúteos","Día 2 · Espalda","Día 3 · Pierna + Glúteos"],
  },
  glutesOnly: {
    label: "Solo glúteos",
    days: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
  },
};

const activationPlan = [
  { name: "Clamshell con banda", description: "Tumbada de lado, abre lento manteniendo tensión.", reps: "3 × 15 por lado" },
  { name: "Puente de glúteo con pausa", description: "Aprieta glúteos arriba y mantén 2 segundos.", reps: "3 × 15" },
  { name: "Patada lateral tumbada", description: "Eleva lento hasta sentir glúteo medio.", reps: "3 × 15 por lado" },
];

const corePlan = [
  { name: "Bird Dog", reps: "3 × 10 por lado" },
  { name: "Plancha posterior", reps: "3 × 20 segundos" },
];

const weeklyPlan = {
  "Día 1 · Glúteos": [{ name: "Hip thrust" },{ name: "Peso muerto rumano" },{ name: "Step Up" },{ name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" }],
  "Día 2 · Espalda": [{ name: "Dominadas con banda" },{ name: "Jalón al pecho" },{ name: "Pullover" },{ name: "Remo" },{ name: "Hiperextensiones" }],
  "Día 3 · Cuádriceps o Descanso": [{ name: "Aductores en máquina" },{ name: "Sentadilla búlgara" },{ name: "Sentadilla Goblet con talones elevados" },{ name: "Prensa pies abajo" },{ name: "Extensión de piernas" },{ name: "Gemelos en máquina" }],
  "Día 4 · Hombros / Bíceps / Tríceps": [{ name: "Press militar" },{ name: "Vuelos laterales" },{ name: "Vuelos frontales" },{ name: "Remo al cuello" },{ name: "Curl bíceps en polea" },{ name: "Curl tríceps en polea" }],
  "Día 5 · Glúteos unilaterales": [{ name: "Hip thrust a una pierna" },{ name: "Peso muerto a una pierna" },{ name: "Step Up" },{ name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" }],
  "Día 3 · Pierna + Glúteos": [{ name: "Sentadilla búlgara" },{ name: "Prensa pies abajo" },{ name: "Peso muerto rumano" },{ name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" }],
  "Día 2 · Glúteos + Femoral": [{ name: "Hip thrust" },{ name: "Peso muerto rumano" },{ name: "Curl femoral" },{ name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" }],
  "Día 3 · Glúteos unilaterales": [{ name: "Hip thrust a una pierna" },{ name: "Peso muerto a una pierna" },{ name: "Step Up" },{ name: "Patada de glúteo en polea" },{ name: "Abducciones en máquina" }],
};

const getSets = (week) => { if (week <= 3) return 2; if (week === 4) return 3; return 4; };
const getReps = () => "6–12 reps";
const getCardio = (week) => ({ time: "25 min", incline: Math.min(5 + Math.floor((week - 1) / 2), 9), speed: Math.min(3.5 + (week - 1) * 0.15, 5.5).toFixed(1) });
const getPhase = (week) => { if (week <= 4) return "Base"; if (week <= 8) return "Progreso"; if (week <= 12) return "Fuerza"; return "Transformación"; };

export default function Workout() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("fiveDays");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Día 1 · Glúteos");
  const [activeSection, setActiveSection] = useState("activation");
  const [lastPeriodDate] = useState(() => localStorage.getItem("nylaLastPeriodDate") || "");
  const [completedDays, setCompletedDays] = useState(() => { const s = localStorage.getItem("nylaCompletedDays"); return s ? JSON.parse(s) : []; });
  const [exerciseWeights, setExerciseWeights] = useState(() => { const s = localStorage.getItem("nylaExerciseWeights"); return s ? JSON.parse(s) : {}; });

  useEffect(() => { localStorage.setItem("nylaCompletedDays", JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { localStorage.setItem("nylaExerciseWeights", JSON.stringify(exerciseWeights)); }, [exerciseWeights]);

  const getCycleInfo = () => {
    if (!lastPeriodDate) return null;
    const today = new Date(); const start = new Date(lastPeriodDate);
    const cycleDay = ((Math.floor((today - start) / 86400000)) % 28) + 1;
    if (cycleDay <= 5) return { emoji: "🩸", phase: "Fase menstrual", message: "Hoy puedes bajar intensidad, hacer activación suave, movilidad o caminata." };
    if (cycleDay <= 13) return { emoji: "🌱", phase: "Fase folicular", message: "Hoy puedes aprovechar tu energía para fuerza, glúteos y progresión de cargas." };
    if (cycleDay <= 16) return { emoji: "💐", phase: "Fase ovulatoria", message: "Hoy puedes entrenar fuerte, cuidando técnica, core y articulaciones." };
    return { emoji: "🧸", phase: "Fase lútea", message: "Hoy puedes entrenar con control, bajar un poco la intensidad y priorizar recuperación." };
  };

  const cycleInfo = getCycleInfo();
  const sets = getSets(selectedWeek);
  const cardio = getCardio(selectedWeek);
  const exercises = weeklyPlan[selectedDay] || [];
  const dayKey = useMemo(() => `${selectedPlan}-${selectedWeek}-${selectedDay}`, [selectedPlan, selectedWeek, selectedDay]);
  const isCompleted = completedDays.includes(dayKey);
  const weeklyCompleted = plans[selectedPlan].days.filter(d => completedDays.includes(`${selectedPlan}-${selectedWeek}-${d}`)).length;
  const progressPercent = (weeklyCompleted / plans[selectedPlan].days.length) * 100;
  const toggleCompleted = () => setCompletedDays(isCompleted ? completedDays.filter(i => i !== dayKey) : [...completedDays, dayKey]);
  const updateExerciseWeight = (name, value) => setExerciseWeights({ ...exerciseWeights, [`${selectedPlan}-${selectedWeek}-${selectedDay}-${name}`]: value });
  const isLowerBodyDay = selectedDay.includes("Glúteos") || selectedDay.includes("Pierna") || selectedDay.includes("Femoral") || selectedDay.includes("Cuádriceps");
  const isUpperBodyDay = selectedDay.includes("Espalda") || selectedDay.includes("Hombros");

  return (
    <section className="workout-screen">

      <p className="wk-section-label">Tu entrenamiento de hoy</p>

      <div className="phase-card">
        <p>Semana {selectedWeek}</p>
        <h2>Bloque {getPhase(selectedWeek)}</h2>
        <span>{sets} series por ejercicio · cardio progresivo</span>
      </div>

      {cycleInfo && (
        <div className="cycle-mini-card">
          <p>Hoy estás en</p>
          <h3><span>{cycleInfo.emoji}</span>{cycleInfo.phase}</h3>
          <span>{cycleInfo.message}</span>
        </div>
      )}

      <div className="progress-card">
        <div className="progress-header">
          <span>Progreso semanal</span>
          <strong>{weeklyCompleted}/{plans[selectedPlan].days.length} días</strong>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p>{weeklyCompleted === plans[selectedPlan].days.length ? "Semana completada. Estoy orgullosa de ti ✨" : "Cada día cuenta. Sigue volviendo a ti."}</p>
      </div>

      <div className="plan-tabs">
        {Object.entries(plans).map(([key, plan]) => (
          <button key={key} className={selectedPlan === key ? "active" : ""} onClick={() => { setSelectedPlan(key); setSelectedDay(plan.days[0]); setActiveSection("activation"); }}>
            {plan.label}
          </button>
        ))}
      </div>

      <p className="weeks-title">SEMANAS</p>
      <div className="weeks-grid">
        {Array.from({ length: 16 }, (_, i) => (
          <button key={i} type="button" className={`week-btn ${selectedWeek === i + 1 ? "active" : ""}`} onClick={() => setSelectedWeek(i + 1)}>{i + 1}</button>
        ))}
      </div>

      <div className="day-tabs">
        {plans[selectedPlan].days.map((day) => (
          <button key={day} className={selectedDay === day ? "active" : ""} onClick={() => { setSelectedDay(day); setActiveSection(day.includes("Glúteos") || day.includes("Pierna") || day.includes("Femoral") || day.includes("Cuádriceps") ? "activation" : "exercises"); }}>
            {day}
          </button>
        ))}
      </div>

      {isLowerBodyDay && (
        <div className="section-tabs">
          <button className={activeSection === "activation" ? "active" : ""} onClick={() => setActiveSection("activation")}>Activación</button>
          <button className={activeSection === "exercises" ? "active" : ""} onClick={() => setActiveSection("exercises")}>Ejercicios</button>
          <button className={activeSection === "cardio" ? "active" : ""} onClick={() => setActiveSection("cardio")}>Cardio</button>
        </div>
      )}

      {isUpperBodyDay && (
        <div className="section-tabs">
          <button className={activeSection === "exercises" ? "active" : ""} onClick={() => setActiveSection("exercises")}>Ejercicios</button>
          <button className={activeSection === "core" ? "active" : ""} onClick={() => setActiveSection("core")}>Core</button>
          <button className={activeSection === "cardio" ? "active" : ""} onClick={() => setActiveSection("cardio")}>Cardio</button>
        </div>
      )}

      {activeSection === "activation" && (
        <div className="week-card">
          <h2>Activación de Glúteos</h2>
          <p className="activation-intro">8 min · Sin peso · Lento y controlado.</p>
          <div className="exercise-detail-list">
            {activationPlan.map((ex, i) => (
              <div className="exercise-detail-card" key={i}>
                <h3>{ex.name}</h3>
                <p>{ex.description}</p>
                <strong>{ex.reps}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "exercises" && (
        <div className="week-card">
          <h2>{selectedDay}</h2>
          <div className="exercise-detail-list">
            {exercises.map((ex, i) => (
              <div className="exercise-detail-card" key={i}>
                <h3>{ex.name}</h3>
                <p>{sets} series · {getReps()}</p>
                <input className="weight-input" type="number" placeholder="Peso usado kg"
                  value={exerciseWeights[`${selectedPlan}-${selectedWeek}-${selectedDay}-${ex.name}`] || ""}
                  onChange={(e) => updateExerciseWeight(ex.name, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "core" && (
        <div className="week-card">
          <h2>Core</h2>
          <div className="exercise-detail-list">
            {corePlan.map((ex, i) => (
              <div className="exercise-detail-card" key={i}>
                <h3>{ex.name}</h3>
                <p>{ex.reps}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "cardio" && (
        <div className="cardio-card">
          <p>CARDIO DESPUÉS DE PESAS</p>
          <h2>Caminadora inclinada</h2>
          <div className="cardio-grid">
            <div><span>Tiempo</span><strong>{cardio.time}</strong></div>
            <div><span>Inclinación</span><strong>{cardio.incline}</strong></div>
            <div><span>Velocidad</span><strong>{cardio.speed}</strong></div>
          </div>
          <small>Mantén una intensidad cómoda. La inclinación no supera 9 y la velocidad máxima es 5.5.</small>
          <button className={`complete-button ${isCompleted ? "done" : ""}`} onClick={toggleCompleted}>
            {isCompleted ? "Entrenamiento completado ✅" : "Marcar como completado"}
          </button>
        </div>
      )}

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn active" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Biblioteca</span></button>
      </nav>
    </section>
  );
}