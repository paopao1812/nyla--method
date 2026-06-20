
import { useNavigate } from "react-router-dom";
import "../styles/PremiumSuccess.css";


export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="welcome-logo">NYLA</h1>
        <h2 className="welcome-title">
          Tu transformación<br />empieza aquí.
        </h2>
        <p className="welcome-text">
          Un método diseñado para ti. Con intención, fuerza y claridad.
        </p>

        <div className="welcome-btns">
          <button className="welcome-btn-primary" onClick={() => navigate("/premium")}>
  CREATE MY ACCOUNT
</button>
          <button className="welcome-btn-secondary" onClick={() => navigate("/login")}>
            I ALREADY HAVE AN ACCOUNT
          </button>
        </div>

        <p className="welcome-hint">
          Use the same email address you used to purchase NYLA.
        </p>
      </div>
    </div>
  );
}