export type MatHire = {
  id: string
  amount: number
  paymentMethod: "stripe" | "cash" | "card"
  createdAt: Date
}
