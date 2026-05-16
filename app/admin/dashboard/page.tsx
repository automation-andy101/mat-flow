import { createCashPayment } from '@/app/actions/createCashPayment'
import RecordCashPaymentButton from '@/components/record-cash-payment-button'
import connectDB from '@/lib/db'
import MatHireModel from '@/lib/models/MatHire'

export default async function DashboardPage() {

  await connectDB()

  const startOfToday = new Date()

  startOfToday.setHours(0, 0, 0, 0)

  const hiresToday = await MatHireModel.countDocuments({
    createdAt: {
      $gte: startOfToday,
    },
  })

  const paymentsToday = await MatHireModel.find({
    createdAt: {
      $gte: startOfToday,
    },
  })

  const revenueToday = paymentsToday.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  const stripePayments = await MatHireModel.countDocuments({
    paymentMethod: 'stripe',
    createdAt: {
      $gte: startOfToday,
    },
  })

  const cashPayments = await MatHireModel.countDocuments({
    paymentMethod: 'cash',
    createdAt: {
      $gte: startOfToday,
    },
  })

  const recentPayments = await MatHireModel
    .find({
      createdAt: {
        $gte: startOfToday,
      },
    })
    .sort({ createdAt: -1 })
    .limit(10)

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-12">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold">
          MatFlow Dashboard
        </h1>

        <p className="text-stone-500 mt-2">
          Today’s studio activity
        </p>

        <p className="text-stone-400 mt-1 text-sm">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Cash payment button */}
      <div className="sticky top-4 z-10 mt-8 max-w-md mx-auto space-y-3">
        <RecordCashPaymentButton />

        <a
          href="/qr"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-white border border-stone-200 py-4 rounded-2xl font-medium hover:bg-stone-100 transition"
        >
          Open QR Code
        </a>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 max-w-md mx-auto">

        {/* Mats Hired */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Total Mat Rentals Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {hiresToday}
          </h2>
        </div>

        {/* Payments */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Payments Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {paymentsToday.length}
          </h2>
        </div> */}

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Revenue Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            £{(revenueToday / 100).toFixed(2)}
          </h2>
        </div>

        {/* Stripe Payments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Stripe Payments
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {stripePayments}
          </h2>
        </div>

        {/* Cash Payments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Cash Payments
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {cashPayments}
          </h2>
        </div>

      </div>

      {/* <div className="mt-8 max-w-md mx-auto">
          <RecordCashPaymentButton />
      </div> */}

      <div className="mt-10 max-w-md mx-auto">

        <h2 className="text-lg font-semibold mb-4">
          Recent Payments
        </h2>

        {/* Empty State */}
        {recentPayments.length === 0 && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center text-stone-500">
            No payments yet today
          </div>
        )}

        <div className="space-y-3">

          {recentPayments.map((payment) => (
            <div
              key={payment._id.toString()}
              className="bg-white rounded-2xl p-4 border border-stone-200 flex items-center justify-between"
            >

              <div>
                <p className="font-medium capitalize">
                  <span className="flex items-center gap-2">

                    <span
                      className={`w-2 h-2 rounded-full ${
                        payment.paymentMethod === 'cash'
                          ? 'bg-orange-400'
                          : 'bg-green-500'
                      }`}
                    />

                    {payment.paymentMethod}

                  </span>
                </p>

                <p className="text-sm text-stone-500">
                  {new Date(payment.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <p className="font-semibold">
                £{(payment.amount / 100).toFixed(2)}
              </p>

            </div>

          ))}

        </div>

      </div>

      

    </div>
  )
}