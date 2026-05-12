import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import MatHire from '@/lib/models/MatHire'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()

  const signature = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed.', err)

    return new NextResponse('Webhook Error', {
      status: 400,
    })
  }

  // Successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Connect MongoDB
      await connectDB()

      // Save transaction
      await MatHire.create({
        sessionId: session.id,
        amount: session.amount_subtotal,
        currency: session.currency,
        paymentStatus: session.payment_status,
        createdAt: new Date(),
      })

      console.log('✅ Payment successful!', session)

    } catch (error) {
      console.error('Database save error:', error)

      return new NextResponse('Database Error', {
        status: 500,
      })
    }
  }

  return NextResponse.json({
    received: true,
  })
}