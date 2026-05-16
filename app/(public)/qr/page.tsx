import QRCode from "react-qr-code"

export default function QRPage() {

  const matHireUrl = process.env.NEXT_PUBLIC_APP_URL + "/mat-hire"

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">

      {/* Brand */}
      <h1 className="text-5xl font-semibold tracking-tight">
        MatFlow
      </h1>

      <p className="mt-3 text-stone-600 text-lg">
        Yoga Mat Hire
      </p>

      {/* QR Code */}
      <div className="bg-white p-6 rounded-3xl shadow-sm mt-10">

        <QRCode
          value={matHireUrl}
          size={260}
        />

      </div>

      {/* Instructions */}
      <div className="mt-10 space-y-3">

        <p className="text-2xl font-medium">
          Scan to hire a yoga mat
        </p>

        <p className="text-stone-500">
          £2 • Apple Pay • Card
        </p>

        <p className="text-stone-400 text-sm">
          No app download required
        </p>

        <p className="mt-6 text-xs text-stone-400 text-center">
          Staff access ·{" "}
          <a
            href="/sign-in"
            className="underline hover:text-stone-600 hover:bg-stone-200/50 px-1 py-0.5 rounded transition"
          >
            Sign in
          </a>
        </p>

      </div>

      <p className="text-xs text-stone-400 text-center mt-8">
        Powered by Divine Development
      </p>
    </div>
    
  )
}