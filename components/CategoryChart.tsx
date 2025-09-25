
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d', '#4ddbff'];

const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.keys(expenseByCategory).map(category => ({
      name: category,
      value: expenseByCategory[category],
    }));
  }, [transactions]);
  
  if (expenseData.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500">No hay datos de gastos para mostrar.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                );
            }}
          >
            {expenseData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
