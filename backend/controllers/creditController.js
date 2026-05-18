import Transaction from "../models/Transaction.js";
import Stripe from "stripe";

const plans = [
  {
    _id: "basic",
    name: "Basic",
    price: 10,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic models",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 20,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 30,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access to premium models",
      "Dedicated account manager",
    ],
  },
];

// API controller for getting all plans
export const getPlans = async (req, res) => {
  try {
    return res.json({ success: true, plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// API controller for purchasing a plan
export const purchasePlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const { planId } = req.body;

    // Find the selected plan
    const selectedPlan = plans.find((plan) => plan._id === planId);
    if (!selectedPlan) {
      return res.status(400).json({ success: false, message: "Invalid plan" });
    }

    // Create new Transaciton
    const transaction = await Transaction.create({
      userId,
      planId: selectedPlan._id,
      amount: selectedPlan.price,
      credits: selectedPlan.credits,
      isPaid: false,
    });

    const { origin } = req.headers;
    const session = await stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: selectedPlan.price * 100,
            product_data: {
              name: `${selectedPlan.name} Plan`,
              description: `Purchase of ${selectedPlan.credits} credits for HackGPT`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loading`,
      cancel_url: `${origin}`,
      metadata: { transactionId: transaction._id.toString(), appId: "hackgpt" },
      expires_at: Math.floor(Date.now() / 1000) + 3600, // Session expires in 1 hour
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error purchasing plan:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
