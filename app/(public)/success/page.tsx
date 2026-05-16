import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string
  }>
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {

  const { session_id } = await searchParams;

  if (!session_id) {
    return <div>Missing session</div>
  }

   const session = await stripe.checkout.sessions.retrieve(session_id);

  const reference = session.id.slice(-6).toUpperCase()

  const paidAt = new Date(session.created * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6 text-center">

      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        Payment Successful
      </h1>

      {/* Message */}
      <p className="mt-3 text-stone-600 max-w-sm">
        Your yoga mat hire has been confirmed.
      </p>

      {/* Receipt Card */}
      <div className="mt-8 w-full max-w-sm rounded-2xl bg-white border border-stone-200 p-5 shadow-sm">

        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Reference</span>
          <span className="font-medium">{reference}</span>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-stone-500">Paid</span>
          <span className="font-medium">{paidAt}</span>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-stone-500">Amount</span>
          <span className="font-medium">£2.00</span>
        </div>

      </div>

      {/* Reception Note */}
      <p className="mt-6 text-stone-500 text-sm">
        Please show this screen at reception.
      </p>

      {/* CTA */}
      <a
        href="/mat-hire"
        className="mt-10 bg-black text-white px-6 py-4 rounded-2xl text-lg w-full max-w-xs font-medium"
      >
        Hire Another Mat
      </a>

      {/* Footer */}
      <p className="mt-6 text-xs text-stone-400">
        Thank you for using MatFlow 🧘
      </p>

      <p className="text-xs text-stone-400 text-center mt-8">
        Powered by Divine Development
      </p>
    </div>
  )
}