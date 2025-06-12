import env from '@env';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2024-11-20.acacia',
});

export default stripe;
