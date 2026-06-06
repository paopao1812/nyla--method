
import { useNavigate } from "react-router-dom";
import "../styles/Library.css";

const exerciseCategories = [
  {
    title: "Glúteos",
    exercises: [
      "Hip Thrust con barra",
      "Hip Thrust a una pierna",
      "Peso muerto",
      "Peso muerto a una pierna",
      "Step Up",
      "Patada de glúteo en polea",
      "Patada de glúteo en máquina",
      "Abducciones en máquina",
    ],
  },
  {
    title: "Cuádriceps",
    exercises: [
      "Sentadilla búlgara",
      "Sentadilla Goblet talones elevados",
      "Prensa pies abajo",
      "Gemelos en máquina",
      "Aductores en máquina",
    ],
  },
  {
    title: "Torso",
    exercises: [
      "Dominadas con banda",
      "Jalón al pecho",
      "Pullover",
      "Remo sentado",
      "Curl bíceps",
      "Curl de tríceps",
      "Press militar",
      "Elevaciones laterales",
      "Elevaciones frontales",
    ],
  },
  {
    title: "Activación Glúteo-Pierna",
    exercises: [
      "Clamshell con banda",
      "Puente de glúteos",
      "Monster walk con banda",
    ],
  },
  {
    title: "Core",
    exercises: [
      "Heels Taps",
      "Plancha frontal",
      "Bird Dog",
    ],
  },
];

export default function Library() {
  const navigate = useNavigate();

  return (
    <section className="lib-screen">
      <span className="nav-label">VIDEOTECA</span>
      <p className="lib-subtitle">Aprende la técnica de los ejercicios.</p>

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
        <button className="nav-btn active" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Videoteca</span></button>
      </nav>
    </section>
  );
}