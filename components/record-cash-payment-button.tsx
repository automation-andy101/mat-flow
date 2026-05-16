'use client'

import { useTransition } from 'react'
import { createCashPayment } from '@/app/actions/createCashPayment'

export default function RecordCashPaymentButton() {

  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await createCashPayment()
        })
      }
      disabled={isPending}
      className="w-full bg-black text-white py-4 rounded-2xl font-medium disabled:opacity-50"
    >
      {isPending
        ? 'Recording Payment...'
        : '+ Record £2 Cash Payment'}
    </button>
  )
}
