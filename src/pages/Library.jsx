
import { useNavigate } from "react-router-dom";
import "../styles/Library.css";

const exerciseCategories = [
  { title: "Glúteos", exercises: ["Hip Thrust","Patada en polea","Abducción","Sentadilla búlgara"] },
  { title: "Pierna", exercises: ["Prensa","Peso muerto rumano","Curl femoral","Extensión de cuádriceps"] },
  { title: "Torso", exercises: ["Jalón al pecho","Remo sentado","Press hombro","Curl bíceps"] },
  { title: "Core", exercises: ["Dead bug","Plancha","Crunch cable","Elevaciones de piernas"] },
];

export default function Library() {
  const navigate = useNavigate();
  return (
    <section className="lib-screen">
      <p className="lib-eyebrow">BIBLIOTECA DE EJERCICIOS</p>
      <p className="lib-subtitle">Cada ejercicio tendrá vídeo, técnica y explicación paso a paso.</p>

      <div className="lib-grid">
        {exerciseCategories.map((cat, i) => (
          <div className="lib-card" key={i}>
            <h2 className="lib-card-title">{cat.title}</h2>
            <div className="lib-ex-list">
              {cat.exercises.map((ex, j) => (
                <button key={j} className="lib-ex-btn">{ex}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn active" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Biblioteca</span></button>
      </nav>
    </section>
  );
}