
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { userName } = useUser();

  return (
    <section className="home-screen">
      <div className="home-header">
        <p className="home-eyebrow">NYLA</p>

        <h1 className="home-title">
          Hola, {userName || "Gym Sister"}
        </h1>

        <p className="home-subtitle">
          Hoy entrenas con intención, fuerza y claridad.
        </p>
      </div>

      <div className="home-progress-card">
        <p className="home-card-label">Tu progreso</p>

        <div className="home-progress-row">
          <h2>Semana 1</h2>
          <span>Día 1</span>
        </div>

        <div className="home-progress-bar">
          <div className="home-progress-fill"></div>
        </div>

        <p className="home-progress-text">
          Un paso más cerca de tu versión más fuerte.
        </p>
      </div>

      <div
        className="home-main-card"
        onClick={() => navigate("/workout")}
        role="button"
      >
        <p className="home-card-label">Entrenamiento de hoy</p>

        <h2>Glúteos y fuerza base</h2>

        <p>
          Semana 1 · Día 1
        </p>

        <button className="home-card-btn">
          EMPEZAR ENTRENAMIENTO
        </button>
      </div>

      <div className="home-grid">
        <button
          className="home-option-card"
          onClick={() => navigate("/meals")}
        >
          <span>Nutrición</span>
          <small>Guía para acompañar tu proceso</small>
        </button>

        <button
          className="home-option-card"
          onClick={() => navigate("/cycle")}
        >
          <span>Ciclo</span>
          <small>Entrena según cómo te sientes</small>
        </button>

        <button
          className="home-option-card"
          onClick={() => navigate("/affirmations")}
        >
          <span>Afirmaciones</span>
          <small>Recuerda por qué empezaste</small>
        </button>

        <button
          className="home-option-card"
          onClick={() => navigate("/library")}
        >
          <span>Biblioteca</span>
          <small>Explora tu método NYLA</small>
        </button>
      </div>

      <div className="home-quote-card">
        <p>
          “No necesitas hacerlo perfecto. Solo volver a ti, una vez más.”
        </p>
      </div>
    </section>
  );
}