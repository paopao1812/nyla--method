
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Library.css";

const VIDEO_MAP = {
  "Aducciones en máquina":           "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760200/Aducciones_en_Maqui%CC%81na_xa2lzi.mp4",
  "Extensión de cuádriceps":         "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760249/Extensio%CC%81n_de_Piernas_apgg9y.mp4",
  "Prensa pies abajo":               "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760293/Prensa_Pies_Abajo_rrdb0f.mp4",
  "Sentadilla Goblet talones elevados": "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760333/Sentadilla_Goblet_talones_elevados_sgcwsc.mp4",
  "Hip Thrust a una pierna":         "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760911/Hip_Thrust_a_una_pierna_bcsccb.mp4",
  "Abducciones en máquina":          "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760918/Abduccio%CC%81n_en_maqui%CC%81na_nlt1xo.mp4",
  "Hip Thrust con barra":            "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760925/Hip_Thrust_con_barra_pv5rty.mp4",
  "Patada de glúteo en máquina":     "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760925/Patada_de_Glu%CC%81teo_en_maqui%CC%81na_zsexvy.mp4",
  "Peso muerto":                     "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760927/Peso_Muerto_en_Maqui%CC%81na_zmclq3.mp4",
  "Peso muerto a una pierna":        "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760937/Peso_Muerto_a_una_pierna_xaqeol.mp4",
  "Patada de glúteo en polea":       "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760940/Patada_de_Glu%CC%81teos_en_polea_c1a2cs.mp4",
  "Step Up":                         "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760942/Step_Up_yn7epu.mp4",
  "Elevaciones laterales":           "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760993/Elevaciones_Laterales_igbruc.mp4",
  "Curl bíceps":                     "https://res.cloudinary.com/dhinbr3np/video/upload/v1780760994/Curl_de_Biceps_en_polea_lh53ic.mp4",
  "Dominadas con banda":             "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761003/Dominadas_con_Banda_skmvvk.mp4",
  "Curl de tríceps":                 "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761005/Curl_de_Triceps_z0nkja.mp4",
  "Elevaciones frontales":           "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761006/Elevaciones_Frontales_mx9mlq.mp4",
  "Jalón al pecho":                  "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761012/Jalo%CC%81n_al_pecho_jgx4fb.mp4",
  "Remo sentado":                    "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761012/Remo_Sentado_kkli4i.mp4",
  "Press militar":                   "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761016/Press_Militarr_nqpk1a.mp4",
  "Pullover":                        "https://res.cloudinary.com/dhinbr3np/video/upload/v1780761019/PullOver_shwgxl.mp4",
};

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
      "Femoral Tumbado",
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
        <button className="nav-btn" onClick={() => navigate("/affirmations")}><span className="nav-icon">✨</span><span className="nav-label">Afirmaciones</span></button>
        <button className="nav-btn active" onClick={() => navigate("/library")}><span className="nav-icon">📖</span><span className="nav-label">Videoteca</span></button>
      </nav>
    </section>
  );
}