// ============================================================
// PayPal Configuration
// ============================================================

export const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture' as const,
};

export interface PayPalProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
}

export interface PayPalSubscriptionPlan {
  id: string;
  name: string;
  description: string;
  planId: string;
  price: string;
  currency: string;
  interval: 'MONTH' | 'YEAR';
}

export const PRODUCTS: PayPalProduct[] = [
  {
    id: 'kspot-weekly-map',
    name: 'K-Spot Weekly Map',
    description: 'Weekly Seongsu popup route map & curated food list',
    price: '9.99',
    currency: 'USD',
  },
  {
    id: 'kspot-pro-membership',
    name: 'K-Spot Premium Sub',
    description: 'Real-time Naver-filtered maps, K-slang guides & private Discord feed',
    price: '29.99',
    currency: 'USD',
  },
];

export const SUBSCRIPTION_PLANS: PayPalSubscriptionPlan[] = [
  {
    id: 'connect-ai-monthly',
    name: 'Connect AI Monthly',
    description: 'Monthly access to full neural-AI suite',
    planId: 'YOUR_PAYPAL_PLAN_ID',
    price: '49.99',
    currency: 'USD',
    interval: 'MONTH',
  },
  {
    id: 'connect-ai-yearly',
    name: 'Connect AI Yearly',
    description: 'Annual access -- save 20%',
    planId: 'YOUR_PAYPAL_YEARLY_PLAN_ID',
    price: '479.99',
    currency: 'USD',
    interval: 'YEAR',
  },
];
