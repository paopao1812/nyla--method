
import { useState, useEffect, useRef, useCallback } from "react";

const REST_OPTIONS = [30, 60, 90];

export default function RestTimer() {
  const [duration, setDuration] = useState(() => {
  const saved = localStorage.getItem("nylaRestDuration");
  return saved ? parseInt(saved) : 30;
  });
  const [timeLeft, setTimeLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(null);
    setDone(false);
  }, []);

  const start = useCallback((dur) => {
    clearInterval(intervalRef.current);
    setDone(false);
    setTimeLeft(dur);
    setRunning(true);
    setShowPicker(false);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setDone(true);
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleDurationSelect = (d) => {
    localStorage.setItem("nylaRestDuration", String(d));
    setDuration(d);
    start(d);
  };

  const handlePress = () => {
    if (running) { stop(); return; }
    if (done) { setDone(false); setShowPicker(true); return; }
    setShowPicker(p => !p);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
  const progress = timeLeft !== null ? timeLeft / duration : 1;
  const r = 20; const circ = 2 * Math.PI * r;

  return (
    <div className="rest-timer-wrap">
      {/* PICKER */}
      {showPicker && !running && (
        <div className="rest-picker">
          <p className="rest-picker-label">¿Cuánto descanso?</p>
          <div className="rest-picker-opts">
            {REST_OPTIONS.map(d => (
              <button
                key={d}
                className={`rest-opt ${duration === d ? "active" : ""}`}
                onClick={() => handleDurationSelect(d)}
              >
                {d === 60 ? "1 min" : d === 90 ? "1:30" : "2 min"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TIMER DISPLAY */}
      {(running || done) && (
        <div className="rest-display">
          <div className="rest-ring-wrap">
            <svg className="rest-svg" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r={r} className="rest-ring-bg" />
              <circle
                cx="25" cy="25" r={r}
                className="rest-ring-fill"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="rest-time">{done ? "✨" : fmt(timeLeft)}</span>
          </div>
          <p className="rest-status">{done ? "Lista para tu siguiente serie ✨" : "Descansando..."}</p>
        </div>
      )}

      {/* MAIN BUTTON */}
      <button
        className={`rest-btn ${running ? "running" : ""} ${done ? "done" : ""}`}
        onClick={handlePress}
      >
        {running ? `⏱ ${fmt(timeLeft)} — Pausar` : done ? "🔄 Otro descanso" : "⏱ Iniciar descanso"}
      </button>
    </div>
  );
}