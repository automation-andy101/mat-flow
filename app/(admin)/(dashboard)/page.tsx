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
      </div>

      {/* Stats */}
      <div className="mt-12 grid gap-6 max-w-md mx-auto">

        {/* Mats Hired */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Mats Hired Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {hiresToday}
          </h2>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Payments Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            {paymentsToday.length}
          </h2>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <p className="text-stone-500 text-sm">
            Revenue Today
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            £{(revenueToday / 100).toFixed(2)}
          </h2>
        </div>

      </div>

    </div>
  )
}