'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache';

export interface FormState {
  errors: {
    description?: string[];
    amount?: string[];
    type?: string[];
  };
  message: string;
}

const transactionSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.coerce.number().min(0.01, { message: 'Amount must be greater than 0' }),
  type: z.enum(['income', 'expense'])
});

let transactions: { id: number; description: string; amount: number; type: string; }[] = [
    { id: 1, description: 'Salary', amount: 5000, type: 'income' },
    { id: 2, description: 'Rent', amount: -1500, type: 'expense' },
    { id: 3, description: 'Groceries', amount: -300, type: 'expense' },
    { id: 4, description: 'Freelance Work', amount: 1000, type: 'income' },
  ];

export async function addTransaction(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = transactionSchema.safeParse({
        description: formData.get('description'),
        amount: formData.get('amount'),
        type: formData.get('type')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed.'
        };
    }

    try {
        const { description, amount, type } = validatedFields.data;
        const newTransaction = {
            id: transactions.length + 1,
            description,
            amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            type,
        };

        transactions.push(newTransaction);
        revalidatePath('/');

        return { message: 'Transaction added successfully.', errors: {} };
    } catch (error) {
        return {
            errors: {},
            message: 'An unexpected error occurred.'
        }
    }
}

export async function getTransactions() {
    return transactions;
}
