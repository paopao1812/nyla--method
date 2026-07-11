import { supabase } from "../supabase";

const THROTTLE_MS = 5 * 60 * 1000;

export async function trackActivity() {
  try {
    const email = localStorage.getItem("nylaUserEmail");
    if (!email) return;

    const lastTracked = localStorage.getItem("nylaLastTracked");
    const now = Date.now();
    if (lastTracked && now - parseInt(lastTracked) < THROTTLE_MS) return;

    const { error } = await supabase
      .from("customers")
      .update({ last_active_at: new Date().toISOString() })
      .eq("email", email.toLowerCase());

    if (!error) {
      localStorage.setItem("nylaLastTracked", String(now));
    }
  } catch {}
}
