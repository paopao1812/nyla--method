
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function Welcome() {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const user = useUser();
  const navigate = useNavigate();

  function handleStart() {

    const trimmed = name.trim();

    if (!trimmed) {
      setError(true);
      return;
    }

    setError(false);

    // Guarda el nombre SOLO si existe saveName
    if (user?.saveName) {
      user.saveName(trimmed);
    }

    navigate("/onboarding");
  }

  return (

    <div className="welcome-page" style={{ minHeight: '100dvh' }}>

      <div className="welcome-card">

        <p className="welcome-mini">
          TU COMPROMISO CONTIGO MISMA
        </p>

        <h1 className="welcome-logo">
          NYLA
        </h1>

       
       

        <h2 className="welcome-title">
          Si ya estás aquí,
          <br />
          es porque quieres un cambio real.
        </h2>

        <p className="welcome-text">
          Un espacio sin juicio, sin comparación.
          <br />
          Solo tú y tu versión más fuerte.
        </p>

        <p className="welcome-question">
          ¿Cómo te llamas?
        </p>

        <input
          type="text"
          className={`welcome-input ${error ? "input-error" : ""}`}
          placeholder="Tu nombre..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleStart();
            }
          }}
        />

        <p className="welcome-small">
          {error
            ? "Escribe tu nombre para continuar"
            : "Solo tú verás esto dentro de la app."}
        </p>

        <button
          className="welcome-btn"
          onClick={handleStart}
        >
          EMPEZAR MI JOURNEY
        </button>

        
        

      </div>

    </div>
  );
}