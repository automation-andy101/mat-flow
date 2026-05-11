'use client'

export default function MatHirePage() {
  const handlePay = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
    })

    const data = await res.json()

    window.location.href = data.url
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6 text-center">

      {/* Brand */}
      <h1 className="text-3xl font-semibold">MatFlow</h1>
      <p className="text-stone-600 mt-1">Yoga Mat Hire</p>

      {/* Price */}
      <div className="mt-8 text-5xl font-semibold tracking-tight">£2.00</div>
      <p className="text-stone-500 mt-2">per mat</p>

      {/* Benefits */}
      <div className="mt-6 text-sm text-stone-600 space-y-1">
        <p>✔ Instant hire</p>
        <p>✔ Apple Pay / Card</p>
        <p>✔ No account needed</p>
      </div>

      {/* CTA */}
      <button
        onClick={handlePay}
        className="mt-10 bg-black text-white px-6 py-4 rounded-2xl text-lg w-full max-w-xs font-medium"
      >
        Pay £2 & Get Mat
      </button>

      {/* Footer note */}
      <p className="mt-6 text-xs text-stone-400">
        Show confirmation at reception
      </p>
    </div>
  )
}