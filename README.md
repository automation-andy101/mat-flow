# 🧘‍♂️ MatFlow

**MatFlow** is a simple QR-based yoga mat hire system for studios.  
Users can instantly hire a mat for £2 using Apple Pay, Google Pay, or card — no login required.

Built for speed, simplicity, and seamless studio flow.

---

## ✨ What MatFlow does

- 📱 Users scan a QR code in the studio
- 💳 Pay £2 instantly via Stripe checkout
- 🧾 Receive confirmation of mat hire
- 📊 Admin dashboard tracks all payments and revenue

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) – App Router (frontend + backend)
- [MongoDB](https://www.mongodb.com/) – Database for transactions
- [Stripe](https://stripe.com/) – Payment processing
- Tailwind CSS – Styling
- TypeScript (optional but recommended)

---

## 🏗️ Project Structure

```text
app/
  (public)/
    mat-hire/
    success/
    (auth)/
  (admin)/
    dashboard/
  api/
    checkout/
    stripe-webhook/

lib/
  db.ts
  auth.ts
  utils.ts
  models/
    MatHire.ts
```

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/matflow.git
cd matflow
```

## 2. Install dependencies
```bash
npm install
```

## 3. Add environment variables
```bash
Create a .env.local file:

STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_URL=http://localhost:3000
MONGODB_URI=your_mongo_connection
```

## 4. Run the development server
```bash
npm run dev
```








