export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  optimizations: number;
  scoreChecks: number;
  linkedinMessages: number;
  guidedBuilds: number;
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
  scoreChecksUsed: number;
  scoreChecksTotal: number;
  linkedinMessagesUsed: number;
  linkedinMessagesTotal: number;
  guidedBuildsUsed: number;
  guidedBuildsTotal: number;
  scoreChecksUsed: number;
  scoreChecksTotal: number;
  linkedinMessagesUsed: number;
  linkedinMessagesTotal: number;
  guidedBuildsUsed: number;
  guidedBuildsTotal: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

class PaymentService {
  private plans: SubscriptionPlan[] = [
    {
      id: 'pro_resume_kit',
      name: 'Pro Resume Kit',
      price: 299,
      duration: 'One-time',
      features: [
        '5 JD-based Optimizations',
        '2 Resume Score Checks',
        'AI-powered Guided Builder',
        'Exclusive Resume Templates'
      ],
      optimizations: 5,
      scoreChecks: 2,
      linkedinMessages: 0,
      guidedBuilds: 1,
      tag: 'Best for Quick Resumes',
      tagColor: 'text-purple-500',
      gradient: 'from-purple-500 to-indigo-500',
      icon: 'zap'
    },
    {
      id: 'career_boost_plus',
      name: 'Career Boost+',
      price: 999,
      duration: '3 Months',
      features: [
        '25 JD-based Optimizations',
        '10 Resume Score Checks',
        '15 LinkedIn Messages',
        'Unlimited Guided Builds'
      ],
      popular: true,
      optimizations: 25,
      scoreChecks: 10,
      linkedinMessages: 15,
      guidedBuilds: 9999,
      tag: 'Most Popular',
      tagColor: 'text-blue-500',
      gradient: 'from-blue-500 to-indigo-500',
      icon: 'crown'
    },
    {
      id: 'career_pro_max',
      name: 'Career Pro Max',
      price: 1999,
      duration: '6 Months',
      features: [
        'Unlimited JD-based Optimizations',
        'Unlimited Resume Score Checks',
        '50 LinkedIn Messages',
        'Unlimited Guided Builds'
      ],
      optimizations: 9999,
      scoreChecks: 9999,
      linkedinMessages: 50,
      guidedBuilds: 9999,
      tag: 'Best Value for Job Seekers',
      tagColor: 'text-red-500',
      gradient: 'from-red-500 to-pink-500',
      icon: 'award'
    },
    {
      id: 'linkedin_add_on_10',
      name: 'LinkedIn Messages Add-on',
      price: 200,
      duration: 'One-time',
      features: [
        'Adds 10 LinkedIn Messages to your account.'
      ],
      optimizations: 0,
      scoreChecks: 0,
      linkedinMessages: 10,
      guidedBuilds: 0,
      tag: 'Top-up your credits',
      tagColor: 'text-gray-500',
      gradient: 'from-slate-500 to-gray-500',
      icon: 'message_circle'
    }
  ];

  private addOns: AddOn[] = [
    {
      id: 'add_on_optimizations_5',
      name: '5 JD Optimizations',
      price: 150,
      type: 'optimizations',
      quantity: 5
    },
    {
      id: 'add_on_score_checks_5',
      name: '5 Score Checks',
      price: 100,
      type: 'scoreChecks',
      quantity: 5
    },
    {
      id: 'add_on_linkedin_10',
      name: '10 LinkedIn Messages',
      price: 200,
      type: 'linkedinMessages',
      quantity: 10
    }
  ];

  public getPlans(): SubscriptionPlan[] {
    return this.plans;
  }

  public getAddOns(): AddOn[] {
    return this.addOns;
  }

  public getPlanById(planId: string): SubscriptionPlan | undefined {
    return this.plans.find(p => p.id === planId);
  }

  // This method would be called to initiate a payment
  public initiatePayment(paymentData: PaymentData): Promise<RazorpayResponse> {
    // This is a mock implementation. In a real application, you would
    // call a backend service to create a Razorpay order.
    console.log("Initiating payment with data:", paymentData);

    return new Promise((resolve, reject) => {
      // Mock order ID and payment details
      const mockOrderId = `order_${Date.now()}`;
      const mockPaymentId = `pay_${Date.now()}`;

      // Simulate a successful payment response
      setTimeout(() => {
        resolve({
          razorpay_payment_id: mockPaymentId,
          razorpay_order_id: mockOrderId,
          razorpay_signature: 'mock_signature'
        });
      }, 2000);
    });
  }

  // This method would be used to finalize the payment and update the subscription in the backend
  public async finalizePayment(paymentResponse: RazorpayResponse, planId: string, userId: string): Promise<Subscription> {
    console.log("Finalizing payment for user:", userId, "with plan:", planId);
    console.log("Payment response:", paymentResponse);

    const plan = this.getPlanById(planId);
    if (!plan) {
      throw new Error("Plan not found");
    }

    // Mock API call to update the user's subscription on the backend
    const newSubscription: Subscription = {
      id: 'sub_' + Date.now(),
      userId: userId,
      planId: plan.id,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(), // Mock a 3-month plan
      optimizationsUsed: 0,
      optimizationsTotal: plan.optimizations,
      scoreChecksUsed: 0,
      scoreChecksTotal: plan.scoreChecks,
      linkedinMessagesUsed: 0,
      linkedinMessagesTotal: plan.linkedinMessages,
      guidedBuildsUsed: 0,
      guidedBuildsTotal: plan.guidedBuilds,
      paymentId: paymentResponse.razorpay_payment_id
    };

    console.log("Subscription created:", newSubscription);
    return newSubscription;
  }
}

export const paymentService = new PaymentService();
