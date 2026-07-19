import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Cuenco tibetano - recibe el contexto ya inicializado
function playBowl(ctx) {
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") ctx.resume();
    const duration = 4;
    const fundamental = 432;
    [1, 2.756, 5.404].forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = fundamental * harmonic;
      gain.gain.setValueAtTime(i === 0 ? 0.5 : 0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    });
  } catch {}
}

// Sonido de ambiente suave (ruido blanco filtrado)
function createAmbience(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 400;

  const gain = ctx.createGain();
  gain.gain.value = 0.04;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  return { source, gain };
}

const MODES = {
  breathing: { label: "Respiración", duration: 120, desc: "2 minutos · Inhala 4s · Exhala 6s" },
  meditation: { label: "Meditación", duration: 300, desc: "5 minutos · Cierra los ojos · Respira" },
};

export default function MindfulStart() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("choose"); // choose | active | done
  const [mode, setMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState("inhala"); // inhala | exhala
  const [breathProgress, setBreathProgress] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const [ambience, setAmbience] = useState(false);

  const intervalRef = useRef(null);
  const breathRef = useRef(null);
  const audioCtxRef = useRef(null);
  const ambienceRef = useRef(null);

  const INHALE = 4;
  const EXHALE = 6;
  const CYCLE = INHALE + EXHALE;

  // Animación de respiración
  useEffect(() => {
    if (running && mode === "breathing") {
      let elapsed = 0;
      breathRef.current = setInterval(() => {
        elapsed = (elapsed + 0.1) % CYCLE;
        if (elapsed < INHALE) {
          setBreathPhase("inhala");
          const p = elapsed / INHALE;
          setCircleScale(1 + p * 0.3);
          setBreathProgress(p);
        } else {
          setBreathPhase("exhala");
          const p = (elapsed - INHALE) / EXHALE;
          setCircleScale(1.3 - p * 0.3);
          setBreathProgress(1 - p);
        }
      }, 100);
    } else {
      clearInterval(breathRef.current);
      setCircleScale(1);
    }
    return () => clearInterval(breathRef.current);
  }, [running, mode]);

  // Animación meditación (pulso suave)
  useEffect(() => {
    if (running && mode === "meditation") {
      let t = 0;
      breathRef.current = setInterval(() => {
        t += 0.05;
        setCircleScale(1 + Math.sin(t) * 0.08);
      }, 100);
    }
    return () => clearInterval(breathRef.current);
  }, [running, mode]);

  // Timer principal
  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            handleFinish();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleFinish = () => {
    stopAmbience();
    playBowl(audioCtxRef.current);
    setTimeout(() => setScreen("done"), 500);
  };

  const startAmbience = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
      ambienceRef.current = createAmbience(audioCtxRef.current);
      setAmbience(true);
    } catch {}
  };

  const stopAmbience = () => {
    try {
      ambienceRef.current?.source?.stop();
      setAmbience(false);
    } catch {}
  };

  const startMode = (m) => {
    // Inicializar AudioContext desde tap del usuario para iOS
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    setMode(m);
    setTimeLeft(MODES[m].duration);
    setScreen("active");
    setRunning(true);
  };

  const togglePause = () => {
    setRunning(r => !r);
    if (!running && ambience) startAmbience();
    if (running) stopAmbience();
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const totalDuration = mode ? MODES[mode].duration : 1;
  const progress = mode ? 1 - timeLeft / totalDuration : 0;
  const circumference = 2 * Math.PI * 90;

  if (screen === "choose") return (
    <div style={{
      minHeight:"100dvh", background:"#6b1535",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"40px 28px", fontFamily:"DM Sans, sans-serif",
      color:"#f5ede6", textAlign:"center"
    }}>
      <p style={{fontSize:"10px", letterSpacing:"0.4em", color:"#c9607a", marginBottom:"16px", textTransform:"uppercase"}}>
        NYLA · Antes de empezar
      </p>
      <h1 style={{fontFamily:"Cormorant Garamond, serif", fontSize:"36px", fontWeight:"300", marginBottom:"12px", lineHeight:"1.2"}}>
        Este momento<br/>es para ti.
      </h1>
      <p style={{fontSize:"13px", color:"rgba(244,175,200,0.5)", marginBottom:"48px", lineHeight:"1.7"}}>
        Dedica unos minutos a prepararte.<br/>Tu cuerpo ya está aquí. Ahora llega tu mente.
      </p>

      <div style={{display:"flex", flexDirection:"column", gap:"12px", width:"100%", maxWidth:"320px"}}>
        {Object.entries(MODES).map(([key, m]) => (
          <button key={key} onClick={() => startMode(key)} style={{
            padding:"20px", borderRadius:"16px",
            background:"rgba(0,0,0,0.3)",
            border:"1px solid rgba(244,175,200,0.25)",
            color:"#f5ede6", cursor:"pointer", textAlign:"left",
            transition:"all 0.2s"
          }}>
            <p style={{fontSize:"16px", fontFamily:"Cormorant Garamond, serif", marginBottom:"4px"}}>{m.label}</p>
            <p style={{fontSize:"11px", color:"rgba(244,175,200,0.45)"}}>{m.desc}</p>
          </button>
        ))}
      </div>

      <button onClick={() => navigate("/workout")} style={{
        marginTop:"32px", background:"none", border:"none",
        color:"rgba(244,175,200,0.35)", cursor:"pointer",
        fontSize:"12px", letterSpacing:"0.15em"
      }}>
        Omitir →
      </button>
    </div>
  );

  if (screen === "active") return (
    <div style={{
      minHeight:"100dvh", background:"#6b1535",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"40px 28px", fontFamily:"DM Sans, sans-serif",
      color:"#f5ede6", textAlign:"center"
    }}>
      {/* Círculo que respira */}
      <div style={{position:"relative", marginBottom:"40px"}}>
        <svg width="220" height="220" style={{transform:"rotate(-90deg)"}}>
          <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(244,175,200,0.08)" strokeWidth="2"/>
          <circle cx="110" cy="110" r="90" fill="none" stroke="#c9607a" strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:`translate(-50%, -50%) scale(${circleScale})`,
          width:"120px", height:"120px", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(201,96,122,0.2) 0%, rgba(201,96,122,0.05) 70%)",
          transition:"transform 0.5s ease-in-out",
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <p style={{fontSize:"28px", fontFamily:"Cormorant Garamond, serif", fontWeight:"300"}}>
            {fmt(timeLeft)}
          </p>
        </div>
      </div>

      {mode === "breathing" && (
        <p style={{
          fontSize:"22px", fontFamily:"Cormorant Garamond, serif",
          fontWeight:"300", marginBottom:"8px", letterSpacing:"0.05em",
          transition:"all 0.5s ease"
        }}>
          {breathPhase === "inhala" ? "Inhala..." : "Exhala..."}
        </p>
      )}

      {mode === "meditation" && (
        <p style={{fontSize:"14px", color:"rgba(244,175,200,0.5)", marginBottom:"8px"}}>
          Cierra los ojos. Solo respira.
        </p>
      )}

      <div style={{display:"flex", gap:"16px", marginTop:"32px"}}>
        <button onClick={togglePause} style={{
          padding:"12px 28px", borderRadius:"12px",
          background:"rgba(201,96,122,0.15)",
          border:"1px solid rgba(201,96,122,0.3)",
          color:"#f4afc8", cursor:"pointer", fontSize:"13px"
        }}>
          {running ? "Pausar" : "Continuar"}
        </button>
<button onClick={() => ambience ? stopAmbience() : startAmbience()} style={{
          padding:"12px 28px", borderRadius:"12px",
          background: ambience ? "rgba(201,96,122,0.15)" : "rgba(244,175,200,0.05)",
          border:"1px solid rgba(244,175,200,0.25)",
          color: ambience ? "#f4afc8" : "rgba(244,175,200,0.4)",
          cursor:"pointer", fontSize:"13px"
        }}>
          {ambience ? "🔊 Sonido" : "🔇 Silencio"}
        </button>
      </div>

      <button onClick={() => { stopAmbience(); setScreen("choose"); setRunning(false); }} style={{
        marginTop:"24px", background:"none", border:"none",
        color:"rgba(244,175,200,0.25)", cursor:"pointer", fontSize:"12px"
      }}>
        Cancelar
      </button>
    </div>
  );

  if (screen === "done") return (
    <div style={{
      minHeight:"100dvh", background:"#6b1535",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"40px 28px", fontFamily:"DM Sans, sans-serif",
      color:"#f5ede6", textAlign:"center",
      animation:"fadeIn 1s ease"
    }}>
      <div style={{
        width:"80px", height:"80px", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(201,96,122,0.3), transparent)",
        marginBottom:"32px",
        animation:"pulse 3s ease-in-out infinite"
      }}/>
      <p style={{
        fontFamily:"Cormorant Garamond, serif", fontSize:"28px",
        fontWeight:"300", lineHeight:"1.6", marginBottom:"48px",
        color:"rgba(244,175,200,0.9)"
      }}>
        Respira. Estás presente.<br/>
        <span style={{fontSize:"22px", color:"rgba(244,175,200,0.6)"}}>
          Ahora comienza tu entrenamiento.
        </span>
      </p>
      <button onClick={() => navigate("/workout")} style={{
        padding:"18px 40px", borderRadius:"16px",
        background:"linear-gradient(135deg, #8b2840, #c9607a)",
        color:"#fff", border:"none", cursor:"pointer",
        fontSize:"12px", letterSpacing:"0.3em", textTransform:"uppercase",
        boxShadow:"0 8px 24px rgba(201,96,122,0.3)"
      }}>
        Comenzar entrenamiento
      </button>
    </div>
  );
}
