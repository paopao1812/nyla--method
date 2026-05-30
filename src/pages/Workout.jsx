
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
const getCardio = (week) => ({
  time: "25 min",
  incline: Math.min(5 + Math.floor((week - 1) / 2), 9),
  speed: Math.min(3.5 + (week - 1) * 0.15, 5.5).toFixed(1),
});
const getPhase = (week) => {
  if (week <= 4) return "Base";
  if (week <= 8) return "Progreso";
  if (week <= 12) return "Fuerza";
  return "Transformación";
};

export default function Workout() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("fiveDays");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Día 1 · Glúteos");
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

  const totalCompleted = completedDays.length;
  const weeklyCompleted = plans[selectedPlan].days.filter(d =>
    completedDays.includes(`${selectedPlan}-${selectedWeek}-${d}`)
  ).length;
  const progressPercent = (weeklyCompleted / plans[selectedPlan].days.length) * 100;

  const toggleCompleted = () => setCompletedDays(
    isCompleted ? completedDays.filter(i => i !== dayKey) : [...completedDays, dayKey]
  );
  const updateExerciseWeight = (name, value) => setExerciseWeights({
    ...exerciseWeights,
    [`${selectedPlan}-${selectedWeek}-${selectedDay}-${name}`]: value,
  });

  const isLowerBodyDay = selectedDay.includes("Glúteos") || selectedDay.includes("Pierna") || selectedDay.includes("Femoral") || selectedDay.includes("Cuádriceps");
  const isUpperBodyDay = selectedDay.includes("Espalda") || selectedDay.includes("Hombros");

  return (
    <section className="workout-screen">

      {/* ── EYEBROW ── */}
      <p className="wk-eyebrow">NYLA METHOD</p>

      {/* ── HERO CARD — estilo referencia ── */}
      <div className="wk-hero-card">
        <div className="wk-hero-top">
          <span className="wk-hero-badge">· SEMANA {selectedWeek} · {selectedDay.split("·")[1]?.trim() || selectedDay}</span>
          <span className="wk-hero-type">BLOQUE {getPhase(selectedWeek).toUpperCase()}</span>
        </div>
        <h1 className="wk-hero-title">{selectedDay.split("·")[1]?.trim() || selectedDay}</h1>
        <div className="wk-hero-pills">
          <span className="wk-hero-pill">⏱ {sets === 2 ? "30" : sets === 3 ? "40" : "50"} min</span>
          <span className="wk-hero-pill">🔥 {exercises.length} ejercicios</span>
          {cycleInfo && <span className="wk-hero-pill">{cycleInfo.emoji} {cycleInfo.phase}</span>}
        </div>
        <div className="wk-hero-bottom">
          <div className="wk-hero-exlist">
            {exercises.slice(0, 3).map((ex, i) => (
              <span key={i} className="wk-hero-ex">· {ex.name}</span>
            ))}
            {exercises.length > 3 && <span className="wk-hero-ex">+{exercises.length - 3} más...</span>}
          </div>
          <button className="wk-play-btn" onClick={() => setActiveSection("exercises")}>▶</button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="wk-stats-row">
        <div className="wk-stat">
          <span className="wk-stat-n">{totalCompleted}</span>
          <span className="wk-stat-l">Sesiones</span>
        </div>
        <div className="wk-stat">
          <span className="wk-stat-n">{selectedWeek}</span>
          <span className="wk-stat-l">Semana</span>
        </div>
        <div className="wk-stat">
          <span className="wk-stat-n">🔥</span>
          <span className="wk-stat-l">Racha viva</span>
        </div>
      </div>

      {/* ── CYCLE CARD ── */}
      {cycleInfo && (
        <div className="wk-cycle-card">
          <p className="wk-cycle-pre">TU CICLO HOY</p>
          <h3 className="wk-cycle-title">{cycleInfo.emoji} {cycleInfo.phase}</h3>
          <p className="wk-cycle-msg">{cycleInfo.message}</p>
        </div>
      )}

      {/* ── PROGRESS ── */}
      <div className="wk-progress-card">
        <div className="wk-progress-header">
          <span>Progreso semanal</span>
          <strong>{weeklyCompleted}/{plans[selectedPlan].days.length} días</strong>
        </div>
        <div className="wk-progress-bar">
          <div className="wk-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="wk-progress-msg">
          {weeklyCompleted === plans[selectedPlan].days.length
            ? "Semana completada. Estoy orgullosa de ti ✨"
            : "Cada día cuenta. Sigue volviendo a ti."}
        </p>
      </div>

      {/* ── PLAN TABS ── */}
      <div className="wk-tabs-row">
        {Object.entries(plans).map(([key, plan]) => (
          <button
            key={key}
            className={`wk-tab ${selectedPlan === key ? "active" : ""}`}
            onClick={() => { setSelectedPlan(key); setSelectedDay(plan.days[0]); setActiveSection("activation"); }}
          >
            {plan.label}
          </button>
        ))}
      </div>

      {/* ── WEEKS ── */}
      <p className="wk-weeks-label">SEMANAS</p>
      <div className="wk-weeks-grid">
        {Array.from({ length: 16 }, (_, i) => (
          <button
            key={i}
            className={`wk-week-btn ${selectedWeek === i + 1 ? "active" : ""}`}
            onClick={() => setSelectedWeek(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ── DAY TABS ── */}
      <div className="wk-day-tabs">
        {plans[selectedPlan].days.map((day) => (
          <button
            key={day}
            className={`wk-day-tab ${selectedDay === day ? "active" : ""}`}
            onClick={() => {
              setSelectedDay(day);
              setActiveSection(
                day.includes("Glúteos") || day.includes("Pierna") || day.includes("Femoral") || day.includes("Cuádriceps")
                  ? "activation" : "exercises"
              );
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ── SECTION TABS ── */}
      {isLowerBodyDay && (
        <div className="wk-section-tabs">
          <button className={activeSection === "activation" ? "active" : ""} onClick={() => setActiveSection("activation")}>Activación</button>
          <button className={activeSection === "exercises" ? "active" : ""} onClick={() => setActiveSection("exercises")}>Ejercicios</button>
          <button className={activeSection === "cardio" ? "active" : ""} onClick={() => setActiveSection("cardio")}>Cardio</button>
        </div>
      )}
      {isUpperBodyDay && (
        <div className="wk-section-tabs">
          <button className={activeSection === "exercises" ? "active" : ""} onClick={() => setActiveSection("exercises")}>Ejercicios</button>
          <button className={activeSection === "core" ? "active" : ""} onClick={() => setActiveSection("core")}>Core</button>
          <button className={activeSection === "cardio" ? "active" : ""} onClick={() => setActiveSection("cardio")}>Cardio</button>
        </div>
      )}

      {/* ── CONTENT CARDS ── */}
      {activeSection === "activation" && (
        <div className="wk-content-card">
          <h2 className="wk-content-title">Activación de Glúteos</h2>
          <p className="wk-content-sub">8 min · Sin peso · Lento y controlado.</p>
          <div className="wk-ex-list">
            {activationPlan.map((ex, i) => (
              <div className="wk-ex-card" key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-info">
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                  <strong>{ex.reps}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "exercises" && (
        <div className="wk-content-card">
          <h2 className="wk-content-title">{selectedDay}</h2>
          <p className="wk-content-sub">{sets} series · 6–12 reps por ejercicio</p>
          <div className="wk-ex-list">
            {exercises.map((ex, i) => (
              <div className="wk-ex-card" key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-info">
                  <h3>{ex.name}</h3>
                  <p>{sets} series · {getReps()}</p>
                  <input
                    className="wk-weight-input"
                    type="number"
                    placeholder="Peso usado (kg)"
                    value={exerciseWeights[`${selectedPlan}-${selectedWeek}-${selectedDay}-${ex.name}`] || ""}
                    onChange={(e) => updateExerciseWeight(ex.name, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "core" && (
        <div className="wk-content-card">
          <h2 className="wk-content-title">Core</h2>
          <div className="wk-ex-list">
            {corePlan.map((ex, i) => (
              <div className="wk-ex-card" key={i}>
                <div className="wk-ex-num">{i + 1}</div>
                <div className="wk-ex-info">
                  <h3>{ex.name}</h3>
                  <p>{ex.reps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "cardio" && (
        <div className="wk-cardio-card">
          <p className="wk-cardio-pre">CARDIO DESPUÉS DE PESAS</p>
          <h2 className="wk-cardio-title">Caminadora inclinada</h2>
          <div className="wk-cardio-grid">
            <div><span>Tiempo</span><strong>{cardio.time}</strong></div>
            <div><span>Inclinación</span><strong>{cardio.incline}</strong></div>
            <div><span>Velocidad</span><strong>{cardio.speed}</strong></div>
          </div>
          <small>Mantén una intensidad cómoda. Inclinación máx. 9 · Velocidad máx. 5.5</small>
          <button className={`wk-complete-btn ${isCompleted ? "done" : ""}`} onClick={toggleCompleted}>
            {isCompleted ? "Entrenamiento completado ✅" : "Marcar como completado"}
          </button>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
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