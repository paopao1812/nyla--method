import { useNavigate } from "react-router-dom";
import { getCyclePhase } from "../utils/cyclePhase";

export default function CyclePhaseCard() {
  const navigate = useNavigate();
  const lastPeriodDate = localStorage.getItem("nylaLastPeriodDate");
  const cycleInfo = getCyclePhase(lastPeriodDate);

  if (!cycleInfo) return null;

  return (
    <div className="home-cycle-card" onClick={() => navigate("/cycle")} role="button">
      <div className="home-cycle-header">
        <span className="home-cycle-icon">{cycleInfo.icon}</span>
        <div>
          <p className="home-cycle-label">HOY ESTÁS EN</p>
          <h3 className="home-cycle-title">{cycleInfo.phase}</h3>
        </div>
      </div>
      <p className="home-cycle-text">{cycleInfo.feeling}</p>
      <button className="home-cycle-btn">Ver recomendaciones</button>
    </div>
  );
}
