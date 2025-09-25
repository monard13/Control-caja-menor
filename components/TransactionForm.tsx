
import React, { useState } from 'react';
import { TransactionCategory, expenseCategories, incomeCategories } from '../constants';
import { TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (description: string, amount: number, type: 'income' | 'expense', category: TransactionCategory, date: string) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType.Income | TransactionType.Expense>(TransactionType.Expense);
  const [category, setCategory] = useState<TransactionCategory>(expenseCategories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleTypeChange = (newType: TransactionType.Income | TransactionType.Expense) => {
    setType(newType);
    if (newType === TransactionType.Income) {
      setCategory(incomeCategories[0]);
    } else {
      setCategory(expenseCategories[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Por favor, ingrese un monto válido.');
      return;
    }

    onAddTransaction(description, numericAmount, type, category, date);

    setDescription('');
    setAmount('');
    setType(TransactionType.Expense);
    setCategory(expenseCategories[0]);
    setDate(new Date().toISOString().split('T')[0]);
  };
  
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Transacción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ej: Suministros de oficina"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0"
          />
        </div>
        <div className="flex space-x-4">
          <button type="button" onClick={() => handleTypeChange(TransactionType.Expense)} className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Gasto
          </button>
          <button type="button" onClick={() => handleTypeChange(TransactionType.Income)} className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Ingreso
          </button>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Agregar Transacción
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
