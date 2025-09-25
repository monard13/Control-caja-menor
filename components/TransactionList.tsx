
import React from 'react';
import { Transaction } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Historial de Transacciones</h2>
      <div className="space-y-3">
        {transactions.length > 0 ? (
            transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                           {transaction.type === 'income' ? 
                           ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> ) :
                           ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg> ) }
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{formatDate(transaction.date)} - {transaction.category}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                        </span>
                         <button onClick={() => onDeleteTransaction(transaction.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-500 py-8">No hay transacciones todavía.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
