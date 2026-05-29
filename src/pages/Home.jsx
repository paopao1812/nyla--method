
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { userName } = useUser();

  return (
    <section className="home-screen">
      <p className="home-eyebrow">NYLA</p>

      <h1 className="home-title">
        Hola, {userName || "Gym Sister"}
      </h1>

      <p className="home-subtitle">
        Hoy no tienes que hacerlo perfecto.
      </p>

      <div
        className="home-card"
        onClick={() => navigate("/workout")}
        role="button"
      >
        <p className="home-card-label">Tu entrenamiento de hoy</p>

        <h2>Semana 1 · Día 1</h2>

        <p>Glúteos y fuerza base</p>
      </div>

      <div className="home-card soft">
        <p>
          Estás construyendo disciplina, confianza y amor propio.
        </p>
      </div>

    </section>
  );
}