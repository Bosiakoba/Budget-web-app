'use client'

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { addTransaction, FormState } from '@/app/actions';

const initialState: FormState = {
  errors: {},
  message: '',
};

const AddTransaction = () => {
  const [state, formAction] = useFormState(addTransaction, initialState);
  const [type, setType] = useState('income');

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">Add New Transaction</h3>
      <form action={formAction}>
        <input type="hidden" name="type" value={type} />
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 mb-2">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter description..."
          />
          {state.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description[0]}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount..."
          />
          {state.errors?.amount && <p className="text-red-500 text-sm mt-1">{state.errors.amount[0]}</p>}
        </div>
        <div className="mb-4 flex justify-around">
          <button type="button" onClick={() => setType('income')} className={`w-full text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${type === 'income' ? 'bg-green-600 ring-green-500' : 'bg-green-400'}`}>Income</button>
          <div className="w-4"></div>
          <button type="button" onClick={() => setType('expense')} className={`w-full text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${type === 'expense' ? 'bg-red-600 ring-red-500' : 'bg-red-400'}`}>Expense</button>
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Add Transaction</button>
        {state.message && Object.keys(state.errors).length === 0 && <p className="text-green-500 text-sm mt-2">{state.message}</p>}
        {state.message && Object.keys(state.errors).length > 0 && <p className="text-red-500 text-sm mt-2">{state.message}</p>}
      </form>
    </div>
  );
};

export default AddTransaction;
