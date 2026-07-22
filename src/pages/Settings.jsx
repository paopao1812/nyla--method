import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VAPID_PUBLIC_KEY = "BICHU6u1icSRgNQrRxUQEIdhos8xTdhZ0bCBj3nU4HA0OchdUwIlSqe-7VOWAup2SW08AFAlbbNH0J0nAHifOTY";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Settings() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nylaUserName") || "tú";
  const userEmail = localStorage.getItem("nylaUserEmail") || "";
  const [notificationsOn, setNotificationsOn] = useState(() =>
    localStorage.getItem("nylaNotifications") === "true"
  );
  const [notifHour, setNotifHour] = useState(() =>
    localStorage.getItem("nylaNotifHour") || "09:00"
  );
  const [permissionStatus, setPermissionStatus] = useState("default");
  const [saved, setSaved] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

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

  const subscribeToPush = async (hour) => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push no soportado en este navegador.");
      return false;
    }
    if (!userEmail) {
      console.warn("No hay email guardado, no se puede suscribir a push.");
      return false;
    }

    setSubscribing(true);
    try {
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      const [h] = hour.split(":").map(Number);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await fetch("/api/save-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          subscription,
          notifHour: h,
          timezone,
        }),
      });

      if (!response.ok) throw new Error("Error guardando suscripción en el servidor");

      setSubscribing(false);
      return true;
    } catch (err) {
      console.error("Error suscribiendo a push:", err);
      setSubscribing(false);
      return false;
    }
  };

  const handleToggle = async () => {
    if (!notificationsOn) {
      const granted = await requestPermission();
      if (granted) {
        const success = await subscribeToPush(notifHour);
        if (success) {
          setNotificationsOn(true);
          localStorage.setItem("nylaNotifications", "true");
        } else {
          alert("Hubo un problema activando las notificaciones. Intenta de nuevo.");
        }
      }
    } else {
      setNotificationsOn(false);
      localStorage.setItem("nylaNotifications", "false");
    }
  };

  const handleSave = async () => {
    localStorage.setItem("nylaNotifHour", notifHour);
    if (notificationsOn) {
      await subscribeToPush(notifHour);
    }
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
              Te avisamos cada día a la hora que elijas, con un mensaje distinto cada vez
            </p>
          </div>
          <button onClick={handleToggle} disabled={subscribing} style={{
            width:"48px", height:"28px", borderRadius:"14px",
            background: notificationsOn ? "#c9607a" : "rgba(244,175,200,0.2)",
            border:"none", cursor: subscribing ? "wait" : "pointer", position:"relative", transition:"all 0.2s",
            opacity: subscribing ? 0.6 : 1
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
            <button onClick={handleSave} disabled={subscribing} style={{
              width:"100%", padding:"12px", borderRadius:"12px",
              background:"linear-gradient(135deg, #8b2840, #c9607a)",
              color:"#fff", border:"none", cursor: subscribing ? "wait" : "pointer",
              fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase",
              opacity: subscribing ? 0.6 : 1
            }}>
              {subscribing ? "Guardando..." : saved ? "✓ Guardado" : "Guardar hora"}
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
          fontSize:"13px", letterSpacing:"0.1em", marginBottom:"10px"
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
          Cada día recibirás un mensaje distinto: de amor propio, motivación, disciplina o constancia — con un recordatorio para entrenar.
        </p>
      </div>
    </div>
  );
}
