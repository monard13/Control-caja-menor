
import React from 'react';

interface BalanceSummaryProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ totalBalance, totalIncome, totalExpenses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
        <span className="text-lg font-medium opacity-80">Balance Total</span>
        <span className="text-4xl font-bold mt-2">{formatCurrency(totalBalance)}</span>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-600">Ingresos Totales</span>
        </div>
        <span className="text-3xl font-bold text-green-600 mt-2">{formatCurrency(totalIncome)}</span>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-600">Gastos Totales</span>
        </div>
        <span className="text-3xl font-bold text-red-600 mt-2">{formatCurrency(totalExpenses)}</span>
      </div>
    </div>
  );
};

export default BalanceSummary;
