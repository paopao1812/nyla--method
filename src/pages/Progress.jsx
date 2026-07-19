import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const WEEK_DAYS = ["L", "M", "X", "J", "V", "S", "D"];

function getRacha(completedDays) {
  if (!completedDays.length) return 0;
  // Extraer fechas únicas de los keys (asumimos que cada key es un día distinto completado)
  // Usamos el total de días completados como aproximación de racha
  return completedDays.length;
}

export default function Progress() {
  const navigate = useNavigate();
  const completedDays = JSON.parse(localStorage.getItem("nylaCompletedDays") || "[]");
  const exerciseWeights = JSON.parse(localStorage.getItem("nylaExerciseWeights") || "{}");
  const internalWeek = parseInt(localStorage.getItem("nylaInternalWeek") || "1");
  const selectedPlan = localStorage.getItem("nylaSelectedPlan") || "fiveDays";

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Historial de entrenamientos
  const history = completedDays.map(key => {
    const parts = key.split("-");
    const plan = parts[0];
    const week = parts[1];
    const day = parts.slice(2).join("-");
    return { plan, week, day, key };
  }).reverse();

  // Ejercicios con datos de peso
  const exercisesWithWeights = useMemo(() => {
    const map = {};
    Object.entries(exerciseWeights).forEach(([key, weight]) => {
      const parts = key.split("-");
      const name = parts.slice(3).join("-");
      const week = parseInt(parts[1]);
      if (!map[name]) map[name] = [];
      map[name].push({ week, weight: parseFloat(weight) });
    });
    Object.values(map).forEach(arr => arr.sort((a, b) => a.week - b.week));
    return map;
  }, [exerciseWeights]);

  const exerciseNames = Object.keys(exercisesWithWeights);

  const handleReset = () => {
    localStorage.removeItem("nylaCompletedDays");
    localStorage.removeItem("nylaExerciseWeights");
    localStorage.removeItem("nylaInternalWeek");
    localStorage.removeItem("nylaSelectedDay");
    localStorage.removeItem("nylaActiveSection");
    window.location.reload();
  };

    localStorage.removeItem("nylaCompletedDays");
    localStorage.removeItem("nylaExerciseWeights");
    localStorage.removeItem("nylaInternalWeek");
    localStorage.removeItem("nylaSelectedDay");
    localStorage.removeItem("nylaActiveSection");
    window.location.reload();
  };

  const planLabels = {
    fiveDays: "5 días",
    threeDays: "3 días",
    glutesOnly: "Only Glúteos",
    homeDays: "En Casa",
  };

  return (
    <section className="wk-screen">
      <div className="wk-hero">
        <div className="wk-hero-badges">
          <span className="wk-badge-pill">· TU PROGRESO</span>
        </div>
        <h1 className="wk-hero-title">Progreso</h1>
        <div className="wk-hero-meta">
          <span>📅 Semana {internalWeek}</span>
          <span>✓ {completedDays.length} sesiones</span>
        </div>
      </div>

      {/* RACHA */}
      <div className="wk-stats">
        <div className="wk-stat">
          <span className="wk-stat-n">{completedDays.length}</span>
          <span className="wk-stat-l">SESIONES</span>
        </div>
        <div className="wk-stat">
          <span className="wk-stat-n">{internalWeek}</span>
          <span className="wk-stat-l">SEMANA</span>
        </div>
        <div className="wk-stat">
          <span className="wk-stat-n">🔥</span>
          <span className="wk-stat-l">ACTIVA</span>
        </div>
      </div>

      {/* KILOS POR EJERCICIO */}
      {exerciseNames.length > 0 && (
        <div className="wk-card">
          <h2 className="wk-card-title">Progresión de pesos</h2>
          <p className="wk-card-sub">Selecciona un ejercicio para ver tu evolución</p>
          <div style={{display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px"}}>
            {exerciseNames.map(name => (
              <button key={name}
                onClick={() => setSelectedExercise(selectedExercise === name ? null : name)}
                style={{
                  padding:"6px 12px", borderRadius:"20px", fontSize:"12px",
                  background: selectedExercise === name ? "#c9607a" : "rgba(201,96,122,0.15)",
                  color: selectedExercise === name ? "#fff" : "#c9607a",
                  border:"1px solid #c9607a", cursor:"pointer"
                }}>
                {name}
              </button>
            ))}
          </div>
          {selectedExercise && exercisesWithWeights[selectedExercise] && (
            <div>
              <p style={{fontSize:"13px", opacity:0.6, marginBottom:"12px"}}>
                {selectedExercise}
              </p>
              <div style={{display:"flex", alignItems:"flex-end", gap:"8px", height:"80px"}}>
                {exercisesWithWeights[selectedExercise].map((d, i) => {
                  const max = Math.max(...exercisesWithWeights[selectedExercise].map(x => x.weight));
                  const h = max > 0 ? (d.weight / max) * 70 : 10;
                  return (
                    <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px"}}>
                      <span style={{fontSize:"10px", opacity:0.7}}>{d.weight}kg</span>
                      <div style={{
                        width:"28px", height:`${h}px`, borderRadius:"4px 4px 0 0",
                        background:"linear-gradient(to top, #c9607a, #e8a0b0)"
                      }}/>
                      <span style={{fontSize:"10px", opacity:0.5}}>S{d.week}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* HISTORIAL */}
      <div className="wk-card">
        <h2 className="wk-card-title">Historial</h2>
        {history.length === 0 ? (
          <p style={{opacity:0.5, fontSize:"14px"}}>Aún no has completado ningún entrenamiento.</p>
        ) : (
          <div className="wk-ex-list">
            {history.slice(0, 20).map((item, i) => (
              <div key={i} className="wk-ex">
                <div className="wk-ex-num">✓</div>
                <div className="wk-ex-body">
                  <h3 style={{fontSize:"14px"}}>{item.day}</h3>
                  <p>{planLabels[item.plan] || item.plan} · Semana {item.week}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </section>
  );
}
