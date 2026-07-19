import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nylaUserName") || "tú";
  const [notificationsOn, setNotificationsOn] = useState(() =>
    localStorage.getItem("nylaNotifications") === "true"
  );
  const [notifHour, setNotifHour] = useState(() =>
    localStorage.getItem("nylaNotifHour") || "09:00"
  );
  const [permissionStatus, setPermissionStatus] = useState("default");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones.");
      return false;
    }
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    return permission === "granted";
  };

  const scheduleNotification = (hour) => {
    if (!("serviceWorker" in navigator)) return;
    const [h, m] = hour.split(":").map(Number);
    const now = new Date();
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const delay = next.getTime() - now.getTime();

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("NYLA Method 💪", {
          body: `Hola ${userName}, es hora de entrenar. ¡Vamos, te estoy esperando! ✦`,
          icon: "/icon-192.png",
        });
      }
      scheduleNotification(hour);
    }, delay);
  };

  const handleToggle = async () => {
    if (!notificationsOn) {
      const granted = await requestPermission();
      if (granted) {
        setNotificationsOn(true);
        localStorage.setItem("nylaNotifications", "true");
        scheduleNotification(notifHour);
      }
    } else {
      setNotificationsOn(false);
      localStorage.setItem("nylaNotifications", "false");
    }
  };

  const handleSave = () => {
    localStorage.setItem("nylaNotifHour", notifHour);
    if (notificationsOn) scheduleNotification(notifHour);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#6b1535",
      padding: "52px 22px 110px",
      maxWidth: "430px",
      margin: "0 auto",
      fontFamily: "DM Sans, sans-serif",
      color: "#f5ede6",
    }}>
      <button onClick={() => navigate(-1)} style={{
        background:"none", border:"none", color:"#f4afc8",
        fontSize:"14px", cursor:"pointer", marginBottom:"24px",
        padding:"0", display:"flex", alignItems:"center", gap:"6px"
      }}>
        ← Volver
      </button>
      <h1 style={{fontFamily:"Cormorant Garamond, serif", fontSize:"32px", marginBottom:"8px"}}>
        Ajustes
      </h1>
      <p style={{fontSize:"13px", opacity:0.5, marginBottom:"32px"}}>
        Personaliza tu experiencia en NYLA
      </p>

      {/* NOTIFICACIONES */}
      <div style={{
        background:"rgba(0,0,0,0.25)", borderRadius:"16px",
        padding:"20px", marginBottom:"16px",
        border:"1px solid rgba(244,175,200,0.15)"
      }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px"}}>
          <div>
            <p style={{fontSize:"15px", fontWeight:"500"}}>Recordatorio de entrenamiento</p>
            <p style={{fontSize:"12px", opacity:0.5, marginTop:"3px"}}>
              Te avisamos cada día a la hora que elijas
            </p>
          </div>
          <button onClick={handleToggle} style={{
            width:"48px", height:"28px", borderRadius:"14px",
            background: notificationsOn ? "#c9607a" : "rgba(244,175,200,0.2)",
            border:"none", cursor:"pointer", position:"relative", transition:"all 0.2s"
          }}>
            <div style={{
              width:"22px", height:"22px", borderRadius:"50%", background:"#fff",
              position:"absolute", top:"3px",
              left: notificationsOn ? "23px" : "3px",
              transition:"left 0.2s"
            }}/>
          </button>
        </div>

        {notificationsOn && (
          <>
            {permissionStatus === "denied" && (
              <p style={{fontSize:"12px", color:"#f4afc8", marginBottom:"12px"}}>
                ⚠️ Has bloqueado las notificaciones. Actívalas en los ajustes de tu navegador.
              </p>
            )}
            <p style={{fontSize:"12px", opacity:0.6, marginBottom:"8px"}}>
              Hora del recordatorio
            </p>
            <input
              type="time"
              value={notifHour}
              onChange={e => setNotifHour(e.target.value)}
              style={{
                background:"rgba(0,0,0,0.2)", border:"1px solid rgba(244,175,200,0.2)",
                borderRadius:"10px", padding:"10px 14px", color:"#f5ede6",
                fontSize:"16px", width:"100%", marginBottom:"12px",
                fontFamily:"DM Sans, sans-serif",
                boxSizing:"border-box", maxWidth:"100%",
                WebkitAppearance:"none", appearance:"none"
              }}
            />
            <button onClick={handleSave} style={{
              width:"100%", padding:"12px", borderRadius:"12px",
              background:"linear-gradient(135deg, #8b2840, #c9607a)",
              color:"#fff", border:"none", cursor:"pointer",
              fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase"
            }}>
              {saved ? "✓ Guardado" : "Guardar hora"}
            </button>
          </>
        )}
      </div>

      {/* PERFIL */}
      <div style={{
        background:"rgba(0,0,0,0.15)", borderRadius:"16px",
        padding:"16px", border:"1px solid rgba(244,175,200,0.1)",
        marginBottom:"16px"
      }}>
        <p style={{fontSize:"15px", fontWeight:"500", marginBottom:"4px"}}>Tu perfil</p>
        <p style={{fontSize:"12px", opacity:0.5, marginBottom:"12px"}}>Actualiza tus objetivos, nivel y ciclo</p>
        <button onClick={() => navigate("/onboarding")} style={{
          width:"100%", padding:"12px", borderRadius:"12px",
          background:"rgba(0,0,0,0.2)", color:"#f4afc8",
          border:"1px solid rgba(244,175,200,0.2)", cursor:"pointer",
          fontSize:"13px", letterSpacing:"0.1em"
        }}>
          Editar perfil →
        </button>
      </div>

      {/* INFO */}
      <div style={{
        background:"rgba(0,0,0,0.15)", borderRadius:"16px",
        padding:"16px", border:"1px solid rgba(244,175,200,0.1)"
      }}>
        <p style={{fontSize:"12px", opacity:0.5, lineHeight:"1.6"}}>
          El mensaje que recibirás será:<br/>
          <em style={{color:"#f4afc8"}}>
            "Hola {userName}, es hora de entrenar. ¡Vamos, te estoy esperando! ✦"
          </em>
        </p>
      </div>
    </div>
  );
}
