import React from 'react';

const IncomeExpense = ({ income, expense }: { income: number; expense: number }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-around">
      <div>
        <h3 className="text-lg font-semibold text-green-500">Income</h3>
        <p className="text-2xl font-bold text-green-500">${income.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-red-500">Expense</h3>
        <p className="text-2xl font-bold text-red-500">${Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
