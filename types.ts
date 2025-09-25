import { TransactionCategory } from './constants';

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  // FIX: Changed type from a union of enum members to the enum type itself
  // for better type compatibility with string literals. This resolves the type
  // error in App.tsx when creating a new transaction object.
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}
