import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [{
      price_data: {
        currency: "eur",
        product_data: { name: "NYLA Premium — Acceso anual · Precio de lanzamiento" },
        unit_amount: 3900,
      },
      quantity: 1,
    }],
    success_url: "https://nyla-real.vercel.app/success",
    cancel_url: "https://nyla-real.vercel.app/",
  });

  res.status(200).json({ url: session.url });
}