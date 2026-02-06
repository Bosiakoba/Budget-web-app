'use server'

import { z } from 'zod'

const transactionSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.number().min(0.01, { message: 'Amount must be greater than 0' }),
  type: z.enum(['income', 'expense'])
});

let transactions = [
    { id: 1, description: 'Salary', amount: 5000, type: 'income' },
    { id: 2, description: 'Rent', amount: 1500, type: 'expense' },
    { id: 3, description: 'Groceries', amount: 300, type: 'expense' },
    { id: 4, description: 'Freelance Work', amount: 1000, type: 'income' },
  ];

export async function addTransaction(prevState: any, formData: FormData) {
    const validatedFields = transactionSchema.safeParse({
        description: formData.get('description'),
        amount: parseFloat(formData.get('amount') as string),
        type: formData.get('type')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const newTransaction = {
        id: transactions.length + 1,
        ...validatedFields.data
    }

    if (newTransaction.type === 'expense') {
      newTransaction.amount = newTransaction.amount * -1;
    }

    transactions.push(newTransaction);

    return { message: 'Success!' };
}

export async function getTransactions() {
    return transactions;
}
