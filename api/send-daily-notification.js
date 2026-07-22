import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getLocalHour(timezone) {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    });
    return parseInt(formatter.format(new Date()));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("*");

    if (error) throw error;

    const dayOfYear = getDayOfYear(new Date());
    const messagesModule = await import("../src/data/dailyMessages.js");
    const message = messagesModule.getMessageForDay(dayOfYear);

    const payload = JSON.stringify({
      title: "NYLA Method 💪",
      body: message.text,
      url: "/workout",
    });

    let sent = 0;
    let failed = 0;
    let skipped = 0;

    for (const sub of subscriptions || []) {
      const localHour = getLocalHour(sub.timezone || "America/Mexico_City");
      const preferredHour = sub.notif_hour ?? 8;

      if (localHour !== preferredHour) {
        skipped++;
        continue;
      }

      try {
        await webpush.sendNotification(sub.subscription, payload);
        sent++;
      } catch (err) {
        failed++;
        if (err.statusCode === 410 || err.statusCode === 404) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("email", sub.email);
        }
      }
    }

    res.status(200).json({
      ok: true,
      sent,
      failed,
      skipped,
      total: subscriptions?.length || 0,
    });
  } catch (err) {
    console.error("Error enviando notificaciones:", err);
    res.status(500).json({ error: err.message });
  }
}
