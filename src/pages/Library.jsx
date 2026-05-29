import { useNavigate } from "react-router-dom";
const exerciseCategories = [
  {
    title: "Glúteos",
    exercises: [
      "Hip Thrust",
      "Patada en polea",
      "Abducción",
      "Sentadilla búlgara",
    ],
  },

  {
    title: "Pierna",
    exercises: [
      "Prensa",
      "Peso muerto rumano",
      "Curl femoral",
      "Extensión de cuádriceps",
    ],
  },

  {
    title: "Torso",
    exercises: [
      "Jalón al pecho",
      "Remo sentado",
      "Press hombro",
      "Curl bíceps",
    ],
  },

  {
    title: "Core",
    exercises: [
      "Dead bug",
      "Plancha",
      "Crunch cable",
      "Elevaciones de piernas",
    ],
  },

];

export default function Library() {
    const navigate = useNavigate();
  return (
    
    <section className="library-screen">
      <p className="library-eyebrow"></p>

      
      
<p className="section-label">Biblioteca de ejercicios</p>
      <p className="library-subtitle">
        Cada ejercicio tendrá vídeo, técnica y explicación paso a paso.
      </p>

      <div className="library-grid">
        {exerciseCategories.map((category, index) => (
          <div className="library-card" key={index}>
            <h2>{category.title}</h2>

            <div className="exercise-list">
              {category.exercises.map((exercise, exerciseIndex) => (
                <button key={exerciseIndex} className="exercise-button">
                  {exercise}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-nav">

  <button className="nav-btn" onClick={() => navigate("/cycle")}>
    <span className="nav-icon">🌙</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/workout")}>
    <span className="nav-icon">🏋️</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/meals")}>
    <span className="nav-icon">🍓</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/affirmations")}>
    <span className="nav-icon">✨</span>
  </button>

  <button className="nav-btn" onClick={() => navigate("/library")}>
    <span className="nav-icon">📖</span>
  </button>

</div>
    </section>
  );
}