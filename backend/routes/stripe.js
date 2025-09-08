// routes/stripe.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const cartItems = req.body.items;

  console.log("🔄 Received cart items:", cartItems);

  if (!cartItems || !Array.isArray(cartItems)) {
    console.error("❌ Invalid cart items:", cartItems);
    return res.status(400).json({ error: "Invalid cart items" });
  }

  try {
    const line_items = cartItems.map((item) => {
      if (!item.name || !item.price || !item.image || !item.quantity) {
        throw new Error("Missing item fields");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: 'https://flower-app-frontend.onrender.com/success',
      cancel_url: 'https://flower-app-frontend.onrender.com/cart',
    });

    console.log("✅ Stripe session created:", session.id);
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe session error:", error.message);
    res.status(500).json({ error: error.message || "Failed to create Stripe session" });
  }
});

module.exports = router;
