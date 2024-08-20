import { buffer } from 'micro';
import Stripe from 'stripe';
import { db } from "@/firebase";
import { doc, setDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const planId = subscription.items.data[0].plan.id;

      let planName;
      if (planId === 'your_basic_plan_id') {
        planName = 'basic';
      } else if (planId === 'your_pro_plan_id') {
        planName = 'pro';
      }

      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, { subscription: planName }, { merge: true });
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}