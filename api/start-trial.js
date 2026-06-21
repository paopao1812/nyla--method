
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);

  const { error } = await supabase.from("customers").upsert({
    email: email.toLowerCase(),
    premium: false,
    trial_end_date: trialEnd.toISOString(),
  }, { onConflict: "email" });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true });
}