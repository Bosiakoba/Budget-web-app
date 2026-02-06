import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const TransactionList = async ({transactions}: {transactions: any[]}) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center mb-4 pb-2 border-b last:border-b-0">
            <div className="flex items-center">
              {transaction.amount > 0 ? (
                <ArrowUpCircle className="text-green-500 mr-3" />
              ) : (
                <ArrowDownCircle className="text-red-500 mr-3" />
              )}
              <span>{transaction.description}</span>
            </div>
            <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
