import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    // Verificar si ya tiene premium o trial
    const { data: existing } = await supabase
      .from("customers")
      .select("premium, trial_end_date, expiration_date")
      .eq("email", email.toLowerCase())
      .single();

    const now = new Date();
    const yaTienePremium = existing?.premium === true && 
      existing?.expiration_date && 
      new Date(existing.expiration_date) > now;
    const trialActivo = existing?.trial_end_date && 
      new Date(existing.trial_end_date) > now;

    if (yaTienePremium || trialActivo) {
      return res.status(200).json({ 
        authorized: true, 
        trial: trialActivo && !yaTienePremium,
        existing: true
      });
    }

    // Crear trial de 14 días
    const trialEnd = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const { error } = await supabase
      .from("customers")
      .upsert({
        email: email.toLowerCase(),
        trial_end_date: trialEnd.toISOString(),
        last_active_at: now.toISOString(),
        premium: false,
      }, { onConflict: "email" });

    if (error) {
      console.error("Error creating trial:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      authorized: true, 
      trial: true,
      trial_end: trialEnd.toISOString()
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}
