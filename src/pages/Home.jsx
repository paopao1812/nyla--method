
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Home.css";

const PLAN_DAYS = {
  fiveDays: ["Día 1 · Glúteos","Día 2 · Espalda y Bíceps","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros","Día 5 · Glúteos unilaterales"],
  threeDays: ["Día 1 · Cuádriceps","Día 2 · Torso","Día 3 · Glúteos + Pierna"],
  glutesOnly: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
  homeDays: ["Día 1 · Glúteos y Pierna","Día 2 · Tren Superior","Día 3 · Glúteos + Core"],
};

const PLAN_LABELS = {
  fiveDays: "Plan 5 días",
  threeDays: "Plan 3 días",
  glutesOnly: "Only Glúteos",
};

function getNextWorkout() {
  try {
    const completedDays = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
    const internalWeek = parseInt(localStorage.getItem("nylaInternalWeek") || "1");
    const planKey = ["fiveDays","threeDays","glutesOnly"].reduce((best, key) => {
      const days = PLAN_DAYS[key];
      const count = days.filter(d => completedDays.includes(`${key}-${internalWeek}-${d}`)).length;
      const bestCount = PLAN_DAYS[best].filter(d => completedDays.includes(`${best}-${internalWeek}-${d}`)).length;
      return count > bestCount ? key : best;
    }, "fiveDays");
    const days = PLAN_DAYS[planKey];
    const nextDay = days.find(d => !completedDays.includes(`${planKey}-${internalWeek}-${d}`));
    if (!nextDay) return null;
    const hasStarted = days.some(d => completedDays.includes(`${planKey}-${internalWeek}-${d}`));
    const completedCount = days.filter(d => completedDays.includes(`${planKey}-${internalWeek}-${d}`)).length;
    return { planKey, planLabel: PLAN_LABELS[planKey], day: nextDay, dayName: nextDay.split("·")[1]?.trim() || nextDay, hasStarted, completedCount, total: days.length };
  } catch { return null; }
}

function WorkoutReminder({ onDismiss }) {
  const navigate = useNavigate();
  const next = getNextWorkout();
  const [visible, setVisible] = useState(true);
  const dismissedToday = localStorage.getItem("nylaReminderDismissed");
  const today = new Date().toDateString();
  if (!next || !visible || dismissedToday === today) return null;

  const handleDismiss = () => {
    localStorage.setItem("nylaReminderDismissed", today);
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  const handleGo = () => {
    const n = getNextWorkout();
    if (n) { localStorage.setItem("nylaSelectedPlan", n.planKey); localStorage.setItem("nylaSelectedDay", n.day); }
    navigate("/workout");
  };

  return (
    <div className="home-reminder">
      <div className="home-reminder-top">
        <span className="home-reminder-icon">💪</span>
        <div>
          <p className="home-reminder-label">{next.hasStarted ? "CONTINÚA DONDE LO DEJASTE" : "TU PRÓXIMO ENTRENAMIENTO"}</p>
          <h3 className="home-reminder-title">{next.dayName}</h3>
          <p className="home-reminder-sub">{next.planLabel} · {next.completedCount}/{next.total} completados</p>
        </div>
      </div>
      <div className="home-reminder-btns">
        <button className="home-reminder-go" onClick={handleGo}>Ir a entrenar</button>
        <button className="home-reminder-ignore" onClick={handleDismiss}>Ahora no</button>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { userName } = useUser();
  const [showReminder, setShowReminder] = useState(true);
  const internalWeek = parseInt(localStorage.getItem("nylaInternalWeek") || "1");
  const completedDays = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
  const selectedPlan = localStorage.getItem("nylaSelectedPlan") || "fiveDays";
  const planDays = PLAN_DAYS[selectedPlan] || PLAN_DAYS.fiveDays;
  const weekCompleted = planDays.filter(d => completedDays.includes(`${selectedPlan}-${internalWeek}-${d}`)).length;
  const progressPercent = Math.round((weekCompleted / planDays.length) * 100);
  const internalWeek = parseInt(localStorage.getItem("nylaInternalWeek") || "1");
  const completedDays = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
  const selectedPlan = localStorage.getItem("nylaSelectedPlan") || "fiveDays";
  const planDays = PLAN_DAYS[selectedPlan] || PLAN_DAYS.fiveDays;
  const weekCompleted = planDays.filter(d => completedDays.includes(`${selectedPlan}-${internalWeek}-${d}`)).length;
  const progressPercent = Math.round((weekCompleted / planDays.length) * 100);

  const goWorkout = () => {
    const next = getNextWorkout();
    if (next) { localStorage.setItem("nylaSelectedPlan", next.planKey); localStorage.setItem("nylaSelectedDay", next.day); }
    navigate("/workout");
  };

  const next = getNextWorkout();

  return (
    <section className="home-screen">
      <div className="home-header">
        <div className="home-header-row">
          <h1 className="home-title">Hola, {userName || "Gym Sister"}</h1>
          <button className="home-profile-btn" onClick={() => navigate("/onboarding")}>
            {userName?.[0]?.toUpperCase() || "P"}
          </button>
        </div>
        <p className="home-subtitle">Hoy entrenas con intención, fuerza y claridad.</p>
      </div>

      {showReminder && <WorkoutReminder onDismiss={() => setShowReminder(false)} />}

      <div className="home-progress-card">
        <p className="home-card-label">Tu progreso</p>
        <div className="home-progress-row">
          <h2>Semana {internalWeek}</h2>
          <span>{weekCompleted}/{planDays.length} días</span>
        </div>
        <div className="home-progress-bar">
          <div className="home-progress-fill" style={{width: `${progressPercent}%`}}></div>
        </div>
        <p className="home-progress-text">Un paso más cerca de tu versión más fuerte.</p>
      </div>

      <div className="home-main-card" onClick={goWorkout} role="button">
        <p className="home-card-label">Entrenamiento de hoy</p>
        <h2>{next ? next.dayName : "Glúteos y fuerza base"}</h2>
        <p>{next ? `${next.planLabel} · ${next.completedCount + 1}/${next.total}` : "Semana 1 · Día 1"}</p>
        <button className="home-card-btn">
          {next?.hasStarted ? "CONTINUAR ENTRENAMIENTO" : "EMPEZAR ENTRENAMIENTO"}
        </button>
      </div>



      <div className="home-quote-card">
        <p>"No necesitas hacerlo perfecto. Solo volver a ti, una vez más."</p>
      </div>

      
      <p className="home-copyright">© 2025 NYLA . Todos los derechos reservados.</p>
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/progress")}><span className="nav-icon">📊</span><span className="nav-label">Progreso</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
      </nav>
    </section>
  );
}