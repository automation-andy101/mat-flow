'use server'

import connectDB from '@/lib/db'
import MatHireModel from '@/lib/models/MatHire'

import { revalidatePath } from 'next/cache'

export async function createCashPayment() {

    await connectDB()

    await MatHireModel.create({
        amount: 200,
        currency: 'gbp',
        paymentMethod: 'cash',
        paid: true,
    })

    // Refresh dashboard data
    revalidatePath('/admin/dashboard')
}
