
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction } from './types';
import { TransactionCategory } from './constants';
import Header from './components/Header';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [transactions]);

  const addTransaction = (description: string, amount: number, type: 'income' | 'expense', category: TransactionCategory, date: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      type,
      category,
      date,
    };
    setTransactions(prev => [...prev, newTransaction].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <BalanceSummary 
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Visualización de Gastos</h2>
               <CategoryChart transactions={transactions} />
            </div>
            <div className="mt-8">
              <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
