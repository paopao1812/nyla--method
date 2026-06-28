
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Summary.css";

const motivationalByDay = {
  "Glúteos": "Tus glúteos han trabajado duro hoy. Cada repetición es una promesa que te cumples. 🌸",
  "Espalda": "Tu espalda es más fuerte que ayer. Lo invisible también se construye. ✦",
  "Cuádriceps": "Piernas que no fallan. Hoy has apostado por ti. 💪",
  "Hombros": "Torso fuerte, mente más fuerte. NYLA está orgullosa de ti. 🌹",
  "Unilateral": "El trabajo unilateral es el más honesto. Hoy has sido constante. ✨",
  "Torso": "Cada serie suma. Tu versión más fuerte se construye hoy. 🔥",
  "Pierna": "Piernas fuertes, vida fuerte. Hoy lo has dado todo. 💗",
  "default": "Un día más eligiéndote. Eso es lo que construye resultados reales. ✦",
};

const PLAN_DAYS = {
  fiveDays: ["Día 1 · Glúteos","Día 2 · Espalda y Bíceps","Día 3 · Cuádriceps o Descanso","Día 4 · Hombros","Día 5 · Glúteos unilaterales"],
  threeDays: ["Día 1 · Cuádriceps","Día 2 · Torso","Día 3 · Glúteos + Pierna"],
  glutesOnly: ["Día 1 · Glúteos","Día 2 · Glúteos + Femoral","Día 3 · Glúteos unilaterales"],
};

function getMotivation(dayName) {
  const key = Object.keys(motivationalByDay).find(k => dayName?.includes(k));
  return motivationalByDay[key] || motivationalByDay["default"];
}

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);

  const {
    selectedDay = "Entrenamiento",
    selectedPlan = "fiveDays",
    sets = 2,
    exercises = [],
    exerciseWeights = {},
    internalWeek = 1,
  } = location.state || {};

  const dayName = selectedDay.split("·")[1]?.trim() || selectedDay;
  const planLabel = { fiveDays: "Plan 5 días", threeDays: "Plan 3 días", glutesOnly: "Only Glúteos" }[selectedPlan] || "";
  const motivation = getMotivation(dayName);
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  const handleShare = async () => {
    const text = `✦ He completado ${dayName} con NYLA Method.\n\n${motivation}\n\n💪 ${exercises.length} ejercicios · ${sets} series\n\nnyla-real.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NYLA Method — Entrenamiento completado",
          text,
        });
      } catch {}
    } else {
      navigator.clipboard?.writeText(text);
      alert("Copiado al portapapeles ✓");
    }
  };

  const handleGoHome = () => {
    // Calcular siguiente día pendiente
    const completedDays = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
    const days = PLAN_DAYS[selectedPlan] || [];
    const nextDay = days.find(d => !completedDays.includes(`${selectedPlan}-${internalWeek}-${d}`));

    if (nextDay) {
      localStorage.setItem("nylaSelectedDay", nextDay);
      localStorage.setItem("nylaSelectedPlan", selectedPlan);
      const isLower = nextDay.includes("Glúteos") || nextDay.includes("Pierna") || nextDay.includes("Femoral") || nextDay.includes("Cuádriceps");
      localStorage.setItem("nylaActiveSection", isLower ? "activation" : "exercises");
    } else {
      localStorage.removeItem("nylaSelectedDay");
      localStorage.removeItem("nylaActiveSection");
    }

    navigate("/home", { replace: true });
  };

  return (
    <div className="sum-screen">
      <div className="sum-card" ref={cardRef}>

        <div className="sum-header">
          <p className="sum-eyebrow">NYLA METHOD · COMPLETADO</p>
          <p className="sum-date">{today}</p>
          <h1 className="sum-title">{dayName}</h1>
          <p className="sum-plan">{planLabel}</p>
        </div>

        <div className="sum-stats">
          <div className="sum-stat">
            <span className="sum-stat-n">{exercises.length}</span>
            <span className="sum-stat-l">EJERCICIOS</span>
          </div>
          <div className="sum-stat">
            <span className="sum-stat-n">{sets}</span>
            <span className="sum-stat-l">SERIES</span>
          </div>
          <div className="sum-stat">
            <span className="sum-stat-n">✓</span>
            <span className="sum-stat-l">COMPLETADO</span>
          </div>
        </div>

        <div className="sum-exercises">
          <p className="sum-section-label">LO QUE HAS TRABAJADO</p>
          {exercises.map((ex, i) => {
            const weightKey = `${selectedPlan}-${internalWeek}-${selectedDay}-${ex.name}`;
            const weight = exerciseWeights[weightKey];
            return (
              <div className="sum-ex" key={i}>
                <div className="sum-ex-info">
                  <span className="sum-ex-num">{i + 1}</span>
                  <span className="sum-ex-name">{ex.name}</span>
                </div>
                {weight && <span className="sum-ex-weight">{weight} kg</span>}
              </div>
            );
          })}
        </div>

        <div className="sum-motivation">
          <p>{motivation}</p>
        </div>

        <p className="sum-brand">NYLA Method · nyla-real.vercel.app</p>
      </div>

      <div className="sum-actions">
        <button className="sum-share-btn" onClick={handleShare}>
          ↑ Compartir mi logro
        </button>
        <button className="sum-home-btn" onClick={handleGoHome}>
          Volver a Home
        </button>
      </div>
    </div>
  );
}