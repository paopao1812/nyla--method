import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const { data, error } = await supabase
    .from("customers")
    .select("premium, expiration_date")
    .eq("email", email.toLowerCase())
    .single();

  if (error || !data) return res.status(200).json({ authorized: false });

  const now = new Date();
  const expired = data.expiration_date ? new Date(data.expiration_date) < now : false;

  res.status(200).json({
    authorized: data.premium && !expired,
  });
}