import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, subscription, notifHour, timezone } = req.body;

    if (!email || !subscription) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .upsert(
        {
          email,
          subscription,
          notif_hour: notifHour ?? 8,
          timezone: timezone || "America/Mexico_City",
        },
        { onConflict: "email" }
      );

    if (error) throw error;

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error guardando suscripción:", err);
    res.status(500).json({ error: err.message });
  }
}
