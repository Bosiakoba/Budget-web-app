import React from 'react';

const Balance = ({ total }: { total: number }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-600">Current Balance</h2>
      <p className="text-3xl font-bold text-gray-800">${total.toFixed(2)}</p>
    </div>
  );
};

export default Balance;
