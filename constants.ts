
export enum TransactionCategory {
  OfficeSupplies = 'Oficina',
  Transport = 'Transporte',
  Food = 'Comida',
  Services = 'Servicios',
  Marketing = 'Marketing',
  Salary = 'Salario',
  Utilities = 'Utilidades',
  Other = 'Otros',
}

export const expenseCategories: TransactionCategory[] = [
  TransactionCategory.OfficeSupplies,
  TransactionCategory.Transport,
  TransactionCategory.Food,
  TransactionCategory.Services,
  TransactionCategory.Marketing,
  TransactionCategory.Utilities,
  TransactionCategory.Other,
];

export const incomeCategories: TransactionCategory[] = [
    TransactionCategory.Salary,
    TransactionCategory.Other
];
