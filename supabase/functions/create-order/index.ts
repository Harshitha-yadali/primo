import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderRequest {
  planId: string
  couponCode?: string
  walletDeduction?: number
}

interface PlanConfig {
  id: string
  name: string
  price: number
  duration: string
  optimizations: number
  durationInHours: number
}

const plans: PlanConfig[] = [
  {
    id: 'career_pro_max',
    name: 'Career Pro Max',
    price: 1999,
    duration: 'One-time Purchase',
    optimizations: 30,
    durationInHours: 24 * 365 * 10 // 10 years for lifetime
  },
  {
    id: 'career_boost_plus',
    name: 'Career Boost+',
    price: 1499,
    duration: 'One-time Purchase',
    optimizations: 15,
    durationInHours: 24 * 365 * 10 // 10 years for anytime use
  },
  {
    id: 'pro_resume_kit',
    name: 'Pro Resume Kit',
    price: 999,
    duration: 'One-time Purchase',
    optimizations: 10,
    durationInHours: 24 * 365 * 10 // 10 years for anytime use
  },
  {
    id: 'smart_apply_pack',
    name: 'Smart Apply Pack',
    price: 499,
    duration: 'One-time Purchase',
    optimizations: 5,
    durationInHours: 24 * 365 * 10 // 10 years for anytime use
  },
  {
    id: 'resume_fix_pack',
    name: 'Resume Fix Pack',
    price: 199,
    duration: 'One-time Purchase',
    optimizations: 2,
    durationInHours: 24 * 365 * 10 // 10 years
  },
  {
    id: 'lite_check',
    name: 'Lite Check',
    price: 99,
    duration: 'One-time Purchase',
    optimizations: 1,
    durationInHours: 24 * 365 * 10 // 10 years
  },
  {
    id: 'free_trial',
    name: 'Free Trial',
    price: 0,
    duration: 'One-time Use',
    optimizations: 0,
    durationInHours: 24 * 365 * 10 // 10 years
  }
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planId, couponCode, walletDeduction }: OrderRequest = await req.json()

    // Get user from auth header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    // Get plan details
    const plan = plans.find(p => p.id === planId)
    if (!plan) {
      throw new Error('Invalid plan selected')
    }

    // Apply coupon logic (server-side validation)
    let finalAmount = plan.price
    let discountAmount = 0
    let appliedCoupon = null

    if (couponCode) {
      const normalizedCoupon = couponCode.toLowerCase().trim()
      
      // first100 coupon - free starter plan only
      if (normalizedCoupon === 'first100' && planId === 'starter') {
        finalAmount = 0
        discountAmount = plan.price
        appliedCoupon = 'first100'
      }
      // worthyone coupon - 50% off any plan
      else if (normalizedCoupon === 'worthyone') {
        discountAmount = Math.floor(plan.price * 0.5)
        finalAmount = plan.price - discountAmount
        appliedCoupon = 'worthyone'
      }
    }

    // Apply wallet deduction
    if (walletDeduction && walletDeduction > 0) {
      finalAmount = Math.max(0, finalAmount - walletDeduction)
    }

    // Create Razorpay order
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured')
    }

    const orderData = {
      amount: finalAmount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId: planId,
        planName: plan.name,
        originalAmount: plan.price,
        couponCode: appliedCoupon,
        discountAmount: discountAmount,
        walletDeduction: walletDeduction || 0
      }
    }

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Razorpay API error:', errorText)
      throw new Error('Failed to create payment order')
    }

    const order = await response.json()

    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: finalAmount,
        keyId: razorpayKeyId,
        currency: 'INR'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})