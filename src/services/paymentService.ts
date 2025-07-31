// src/services/paymentService.ts
import { SubscriptionPlan, PaymentData, RazorpayOptions, RazorpayResponse, Subscription } from '../types/payment';
import { supabase } from '../lib/supabaseClient';

declare global {
  interface Window {
    Razorpay: any; // Declare Razorpay to be available on the window object
  }
}

class PaymentService {
  // Get Razorpay key from environment variables
  private readonly RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_U7N6E8ot31tiej';
  
  // Coupon codes
  private readonly COUPON_FIRST100_CODE = 'first100';
  private readonly COUPON_WORTHYONE_CODE = 'worthyone';

  // Updated subscription plans - New structure
  private readonly plans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: 49,
      duration: 'Lifetime Use',
      optimizations: 1,
      tag: 'Perfect for first-time users',
      gradient: 'from-green-500 to-emerald-500',
      icon: 'timer',
      features: [
        '1 Resume Credit',
        'Lifetime Use',
        'PDF Download Included',
        'GPT-4-based rewriting',
        'ATS score analysis',
        'Missing skills detection',
        'Job-specific project suggestions'
      ]
    },
    {
      id: 'smart_pack',
      name: 'Smart Pack',
      price: 99,
      duration: 'Use Anytime',
      optimizations: 3,
      tag: 'Apply smarter to multiple roles',
      gradient: 'from-blue-500 to-cyan-500',
      icon: 'target',
      features: [
        '3 Resume Credits',
        'Use Anytime',
        'Tailored JD Matching',
        'AI customization for each role',
        'Perfect alignment optimization'
      ]
    },
    {
      id: 'pro_pack',
      name: 'Pro Pack',
      price: 149,
      duration: 'Use Anytime',
      optimizations: 6,
      popular: true,
      tag: 'Our most popular plan',
      gradient: 'from-purple-500 to-indigo-500',
      icon: 'rocket',
      features: [
        '6 Credits',
        'Save 30% vs Starter',
        'Includes Full Rewrite + Scoring',
        'LinkedIn, Naukri optimization',
        'Referral-ready formats'
      ]
    },
    {
      id: 'growth_pack',
      name: 'Growth Pack',
      price: 249,
      duration: 'Use Anytime',
      optimizations: 10,
      tag: 'For serious job hunters',
      gradient: 'from-orange-500 to-red-500',
      icon: 'briefcase',
      features: [
        '10 Credits',
        'Best Value',
        'Role-Specific Optimization',
        'ATS Format',
        'Tech & non-tech roles',
        'Domain-specific optimization'
      ]
    }
  ];

  // Load Razorpay script
  private loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Get all subscription plans
  getPlans(): SubscriptionPlan[] {
    return this.plans;
  }

  // Get plan by ID
  getPlanById(planId: string): SubscriptionPlan | null {
    return this.plans.find(plan => plan.id === planId) || null;
  }

  // Apply coupon code
  applyCoupon(planId: string, couponCode: string): { finalAmount: number; discountAmount: number; couponApplied: string | null } {
    const plan = this.getPlanById(planId);
    if (!plan) {
      return { finalAmount: 0, discountAmount: 0, couponApplied: null };
    }

    const normalizedCoupon = couponCode.toLowerCase().trim();

    // first100 coupon - free starter plan only
    if (normalizedCoupon === this.COUPON_FIRST100_CODE && planId === 'starter') {
      return {
        finalAmount: 0,
        discountAmount: plan.price,
        couponApplied: this.COUPON_FIRST100_CODE
      };
    }

    // worthyone coupon - 50% off any plan
    if (normalizedCoupon === this.COUPON_WORTHYONE_CODE) {
      const discountAmount = Math.floor(plan.price * 0.5);
      return {
        finalAmount: plan.price - discountAmount,
        discountAmount: discountAmount,
        couponApplied: this.COUPON_WORTHYONE_CODE
      };
    }

    // Invalid or no coupon
    return {
      finalAmount: plan.price,
      discountAmount: 0,
      couponApplied: null
    };
  }

  // Create Razorpay order via backend
  private async createOrder(planId: string, couponCode?: string, walletDeduction?: number): Promise<{ orderId: string; amount: number; keyId: string }> {
    try {
      // This createOrder method still relies on its own getSession, which is generally fine
      // if it's called outside the problematic modal context.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          couponCode: couponCode || undefined,
          walletDeduction: walletDeduction || 0
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to create payment order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  /**
   * Verifies a Razorpay payment by calling a Supabase Edge Function.
   * This method now explicitly accepts the access token to ensure reliable authentication,
   * especially in mobile contexts where supabase.auth.getSession() might be flaky.
   */
  private async verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    accessToken: string // <--- NEW: Access token passed directly
  ): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    console.log('verifyPayment: STARTING FUNCTION EXECUTION (with explicit access token).'); // Absolute first log
    try {
      // REMOVED: supabase.auth.getSession() from here.
      // We are now relying on the 'accessToken' parameter passed from processPayment.

      console.log('verifyPayment: Checking provided access token parameter...');
      if (!accessToken) {
        console.error('verifyPayment: Access token NOT provided as a parameter. Throwing error.');
        throw new Error('User not authenticated: Access token missing');
      }
      console.log('verifyPayment: Access Token explicitly provided and present.');

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        console.error('verifyPayment: Supabase URL is not configured. Throwing error.');
        throw new Error('Supabase URL not configured');
      }

      const fullFunctionUrl = `${supabaseUrl}/functions/v1/verify-payment`;
      console.log('verifyPayment: Full function URL for fetch:', fullFunctionUrl);
      console.log('📱 Full function URL for mobile (using VITE_SUPABASE_URL):', fullFunctionUrl); // Bonus Debug Tip

      const response = await fetch(fullFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // <--- Using the passed accessToken
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        }),
      });

      console.log('verifyPayment: Received response from verify-payment Edge Function. Status:', response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('verifyPayment: Edge Function error response:', errorData);
        throw new Error(errorData.error || 'Payment verification failed');
      }

      const finalResult = await response.json();
      console.log('verifyPayment: Final verification result:', finalResult);
      return finalResult;
    } catch (error) {
      console.error('verifyPayment: Caught error in main try-catch block:', error);
      return { success: false, error: 'Payment verification failed due to network or server error.' };
    }
  }

  // Process payment
  async processPayment(
    paymentData: PaymentData,
    userEmail: string,
    userName: string,
    couponCode?: string,
    walletDeduction?: number
  ): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    try {
      // Load Razorpay script
      const scriptLoaded = await this.loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // CRITICAL: Get session BEFORE creating order or calling verifyPayment
      // This ensures we have the access token ready before the Razorpay modal handler fires.
      console.log('processPayment: Attempting to get user session for payment processing...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('processPayment: Raw getSession result:', { sessionData: session });

      if (!session || !session.access_token) {
        console.error('processPayment: User not authenticated or access token missing. Aborting payment process.');
        throw new Error('User not authenticated for payment processing. Please log in again.');
      }
      const userAccessToken = session.access_token; // Store the access token here

      // Create order via backend
      // The createOrder method still handles its own session retrieval, which is fine.
      const orderData = await this.createOrder(paymentData.planId, couponCode, walletDeduction);
      console.log('processPayment: Order created successfully:', orderData.orderId);

      return new Promise((resolve) => {
        const options: RazorpayOptions = {
          key: orderData.keyId,
          amount: orderData.amount, // Amount is already in paise from backend
          currency: paymentData.currency,
          name: 'Resume Optimizer',
          description: `Subscription for ${this.getPlanById(paymentData.planId)?.name}`,
          order_id: orderData.orderId,
          handler: async (response: RazorpayResponse) => {
            console.log('Razorpay handler fired. Response:', response); // Existing log
            try {
              console.log('Attempting to verify payment with Supabase Edge Function...');
              // IMPORTANT: Pass the pre-fetched access token to verifyPayment
              const verificationResult = await this.verifyPayment(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature,
                userAccessToken // <--- Passing the pre-fetched access token here
              );
              console.log('Verification result from verifyPayment:', verificationResult); // Existing log
              resolve(verificationResult);
            } catch (error) {
              console.error('Error during payment verification in handler:', error); // Existing log
              console.error('Detailed verification error:', error instanceof Error ? error.message : String(error));
              resolve({ success: false, error: 'Payment verification failed' });
            }
          },
          prefill: {
            name: userName,
            email: userEmail,
          },
          theme: {
            color: '#2563eb',
          },
          modal: {
            ondismiss: () => {
              console.log('Razorpay modal dismissed by user.'); // Existing log
              resolve({ success: false, error: 'Payment cancelled by user' });
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });
    } catch (error) {
      console.error('Payment processing error in processPayment:', error); // Existing log
      return { success: false, error: error instanceof Error ? error.message : 'Payment processing failed' };
    }
  }

  // New method to process free subscriptions
  async processFreeSubscription(planId: string, userId: string, couponCode?: string): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    try {
      const plan = this.getPlanById(planId);
      if (!plan) {
        return { success: false, error: 'Plan not found' };
      }

      const now = new Date();
      let endDate = new Date(now);

      // Determine end date based on plan duration
      if (plan.duration.toLowerCase().includes('lifetime')) {
        endDate.setFullYear(now.getFullYear() + 100);
      } else if (plan.duration.toLowerCase().includes('year')) {
        const years = parseInt(plan.duration.split(' ')[0]);
        endDate.setFullYear(now.getFullYear() + years);
      } else if (plan.duration.toLowerCase().includes('month')) {
        const months = parseInt(plan.duration.split(' ')[0]);
        endDate.setMonth(now.getMonth() + months);
      } else {
        endDate.setFullYear(now.getFullYear() + 1);
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: plan.id,
          status: 'active',
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          optimizations_used: 0,
          optimizations_total: plan.optimizations,
          payment_id: null,
          coupon_used: couponCode || null,
          created_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating free subscription:', error);
        throw new Error(error.message || 'Failed to create free subscription');
      }

      return { success: true, subscriptionId: data.id };

    } catch (error) {
      console.error('Error in processFreeSubscription:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to process free subscription' };
    }
  }

  // Get user's active subscription from Supabase
  async getUserSubscription(userId: string): Promise<Subscription | null> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gt('end_date', new Date().toISOString())
        .order('end_date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error getting subscription:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        userId: data.user_id,
        planId: data.plan_id,
        status: data.status,
        startDate: data.start_date,
        endDate: data.end_date,
        optimizationsUsed: data.optimizations_used,
        optimizationsTotal: data.optimizations_total,
        paymentId: data.payment_id,
        couponUsed: data.coupon_used
      };
    } catch (error) {
      console.error('Error getting user subscription:', error);
      return null;
    }
  }

  // Use optimization (decrement count)
  async useOptimization(userId: string): Promise<{ success: boolean; remaining: number }> {
    try {
      // Get active subscription
      const subscription = await this.getUserSubscription(userId);
      
      if (!subscription) {
        return { success: false, remaining: 0 };
      }

      const remaining = subscription.optimizationsTotal - subscription.optimizationsUsed;
      
      if (remaining <= 0) {
        return { success: false, remaining: 0 };
      }

      // Update optimization count
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          optimizations_used: subscription.optimizationsUsed + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);

      if (error) {
        console.error('Error using optimization:', error);
        return { success: false, remaining: 0 };
      }

      return { success: true, remaining: remaining - 1 };
    } catch (error) {
      console.error('Error using optimization:', error);
      return { success: false, remaining: 0 };
    }
  }

  // Check if user can optimize
  async canOptimize(userId: string): Promise<{ canOptimize: boolean; remaining: number; subscription?: Subscription }> {
    try {
      const subscription = await this.getUserSubscription(userId);
      
      if (!subscription) {
        return { canOptimize: false, remaining: 0 };
      }

      const remaining = subscription.optimizationsTotal - subscription.optimizationsUsed;
      
      return { 
        canOptimize: remaining > 0, 
        remaining,
        subscription
      };
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { canOptimize: false, remaining: 0 };
    }
  }

  // Get subscription history
  async getSubscriptionHistory(userId: string): Promise<Subscription[]> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting subscription history:', error);
        return [];
      }

      return data.map(sub => ({
        id: sub.id,
        userId: sub.user_id,
        planId: sub.plan_id,
        status: sub.status,
        startDate: sub.start_date,
        endDate: sub.end_date,
        optimizationsUsed: sub.optimizations_used,
        optimizationsTotal: sub.optimizations_total,
        paymentId: sub.payment_id,
        couponUsed: sub.coupon_used
      }));
    } catch (error) {
      console.error('Error getting subscription history:', error);
      return [];
    }
  }

  // Get payment transactions
  async getPaymentHistory(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting payment history:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      return [];
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', subscriptionId);

      if (error) {
        console.error('Error cancelling subscription:', error);
        return { success: false, error: 'Failed to cancel subscription' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return { success: false, error: 'Failed to cancel subscription' };
    }
  }
}

export const paymentService = new PaymentService();