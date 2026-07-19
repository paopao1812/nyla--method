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
      <div style={{display:"flex", gap:"12px", marginBottom:"4px"}}>
        {[
          {n: completedDays.length, l: "Sesiones"},
          {n: internalWeek, l: "Semana"},
          {n: "🔥", l: "Activa"},
        ].map((s, i) => (
          <div key={i} style={{
            flex:1, background:"rgba(0,0,0,0.25)",
            border:"1px solid rgba(244,175,200,0.1)",
            borderRadius:"14px", padding:"14px 10px",
            textAlign:"center"
          }}>
            <div style={{fontFamily:"Cormorant Garamond, serif", fontSize:"24px", color:"#f5ede6", marginBottom:"4px"}}>{s.n}</div>
            <div style={{fontSize:"9px", letterSpacing:"0.2em", color:"rgba(244,175,200,0.5)", textTransform:"uppercase"}}>{s.l}</div>
          </div>
        ))}
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

      
      <div style={{padding:"16px 0 24px"}}>
        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)} style={{
            padding:"12px 24px", borderRadius:"20px",
            background:"rgba(0,0,0,0.2)", border:"1px solid rgba(244,175,200,0.15)",
            color:"rgba(244,175,200,0.5)", cursor:"pointer",
            fontSize:"11px", letterSpacing:"0.2em", fontFamily:"DM Sans, sans-serif",
            display:"block", margin:"0 auto"
          }}>
            Reiniciar progreso
          </button>
        ) : (
          <div style={{
            background:"rgba(0,0,0,0.3)", borderRadius:"14px",
            padding:"16px", border:"1px solid rgba(201,96,122,0.2)"
          }}>
            <p style={{fontSize:"14px", color:"#f5ede6", marginBottom:"12px", textAlign:"center"}}>
              ¿Segura? Perderás todo tu progreso.
            </p>
            <div style={{display:"flex", gap:"10px"}}>
              <button onClick={() => setShowResetConfirm(false)} style={{
                flex:1, padding:"12px", borderRadius:"10px",
                background:"rgba(244,175,200,0.1)", border:"none",
                color:"#f5ede6", cursor:"pointer", fontSize:"13px"
              }}>Cancelar</button>
              <button onClick={handleReset} style={{
                flex:1, padding:"12px", borderRadius:"10px",
                background:"#8b2840", border:"none",
                color:"#fff", cursor:"pointer", fontSize:"13px"
              }}>Sí, reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
