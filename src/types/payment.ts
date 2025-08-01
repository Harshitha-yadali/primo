export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  optimizations: number;
  tag: string;
  tagColor: string;
  gradient: string;
  icon: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
}

export interface PaymentData {
  planId: string;
  amount: number;
  currency: string;
  finalAmount: number;
  couponCode?: string;
  walletDeduction?: number;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  optimizationsUsed: number;
  optimizationsTotal: number;
  paymentId?: string;
  couponUsed?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}