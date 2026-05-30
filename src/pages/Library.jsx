
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
    <section className="library-screen">

      <p className="lib-section-label">Biblioteca de ejercicios</p>

      <p className="library-subtitle">Cada ejercicio tendrá vídeo, técnica y explicación paso a paso.</p>

      <div className="library-grid">
        {exerciseCategories.map((cat, i) => (
          <div className="library-card" key={i}>
            <h2>{cat.title}</h2>
            <div className="exercise-list">
              {cat.exercises.map((ex, j) => (
                <button key={j} className="exercise-button">{ex}</button>
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