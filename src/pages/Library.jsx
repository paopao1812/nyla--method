import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Library.css";
import { VIDEO_MAP } from "../data/videoMap";
const exerciseCategories = [
  {
    title: "🏠 En Casa",
    exercises: [
      "Hip thrust con banda",
      "Sentadilla sumo con mancuerna",
      "Peso muerto rumano con mancuernas",
      "Patada de glúteo con banda",
      "Abducción lateral con banda",
      "Press de hombros con mancuernas",
      "Remo con mancuerna",
      "Curl de bíceps con mancuernas",
      "Extensión de tríceps con mancuerna",
      "Puente de glúteos con banda",
      "Sentadilla búlgara",
      "Peso muerto a una pierna",
      "Plancha frontal",
      "Bird Dog",
      "Heels Taps",
    ],
  },
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
      "Femoral tumbado",
    ],
  },
  {
    title: "Cuádriceps",
    exercises: [
      "Sentadilla búlgara",
      "Sentadilla Goblet talones elevados",
      "Prensa pies abajo",
      "Extensión de cuádriceps",
      "Gemelos en máquina",
      "Aducciones en máquina",
    ],
  },
  {
    title: "Torso",
    exercises: [
      "Dominadas con banda",
      "Jalón al pecho",
      "Pullover",
      "Remo sentado",
      "Elevaciones laterales",
      "Elevaciones frontales",
      "Curl bíceps",
      "Curl de tríceps",
      "Press militar",
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

function VideoModal({ exercise, onClose }) {
  const url = VIDEO_MAP[exercise];

  return (
    <div className="lib-modal-overlay" onClick={onClose}>
      <div className="lib-modal" onClick={e => e.stopPropagation()}>
        <div className="lib-modal-header">
          <h3 className="lib-modal-title">{exercise}</h3>
          <button className="lib-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="lib-video-wrap">
          {url ? (
            <video
  className="lib-video"
  src={url}
  controls
  playsInline
  autoPlay
  muted
  controlsList="nodownload"
/>
          ) : (
            <div className="lib-video-soon">
              <p className="lib-video-soon-icon">🎬</p>
              <p className="lib-video-soon-text">Vídeo próximamente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Library() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="lib-screen">
      <p className="lib-eyebrow">VIDEOTECA</p>
      <p className="lib-subtitle">Aprende la técnica de los ejercicios.</p>

      <div className="lib-grid">
        {exerciseCategories.map((cat, i) => (
          <div className="lib-card" key={i}>
            <h2 className="lib-card-title">{cat.title}</h2>
            <div className="lib-ex-list">
              {cat.exercises.map((ex, j) => (
                <button
                  key={j}
                  className={`lib-ex-btn ${VIDEO_MAP[ex] ? "has-video" : ""}`}
                  onClick={() => setActiveVideo(ex)}
                >
                  {VIDEO_MAP[ex] && <span className="lib-ex-play">▶</span>}
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <VideoModal exercise={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/cycle")}><span className="nav-icon">🌙</span><span className="nav-label">Ciclo</span></button>
        <button className="nav-btn" onClick={() => navigate("/workout")}><span className="nav-icon">🏋️</span><span className="nav-label">Entrena</span></button>
        <button className="nav-btn" onClick={() => navigate("/meals")}><span className="nav-icon">🍓</span><span className="nav-label">Nutrición</span></button>
        <button className="nav-btn" onClick={() => navigate("/progress")}><span className="nav-icon">📊</span><span className="nav-label">Progreso</span></button>
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn active" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Videoteca</span></button>
      </nav>
    </section>
  );
}