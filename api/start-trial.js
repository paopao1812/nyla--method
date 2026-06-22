
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

  // Enviar email con Resend
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "NYLA <onboarding@resend.dev>",
      to:  "paolavalenciavictoria@gmail.com",
      subject: `Nueva usuaria en prueba gratis: ${email}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;background:#160a10;color:#f5e8ef;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:32px;font-weight:300;color:#f4afc8;margin-bottom:8px;letter-spacing:.2em;">NYLA</h1>
          <p style="font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#c4607a;margin-bottom:32px;">Tu acceso gratuito está listo</p>
          <h2 style="font-size:26px;font-weight:300;font-style:italic;color:#f5e8ef;line-height:1.3;margin-bottom:16px;">Tienes 7 días para descubrir lo que NYLA puede hacer por ti.</h2>
          <p style="font-size:15px;color:#9a7080;line-height:1.8;margin-bottom:32px;">Entra con el email con el que te registraste y crea tu cuenta. Tu semana gratis ya está activada — sin tarjeta, sin compromiso.</p>
          <a href="https://nyla-real.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#8b2840,#c4607a);color:#fff;text-decoration:none;padding:16px 32px;border-radius:60px;font-family:sans-serif;font-size:13px;letter-spacing:.15em;text-transform:uppercase;font-weight:500;">Entrar a NYLA →</a>
          <p style="font-size:13px;color:#4a2535;margin-top:32px;line-height:1.7;">Tu acceso caduca en 7 días. Después, si quieres continuar, son solo €39/año.</p>
          <p style="font-size:12px;color:#4a2535;margin-top:24px;">— Pao, creadora de NYLA</p>
        </div>
      `
    })
  });

  res.status(200).json({ success: true });
}