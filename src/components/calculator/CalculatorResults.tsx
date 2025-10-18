import React from 'react';
import type { CalculatorResult } from '../../types/calculator';

interface CalculatorResultsProps {
  results: CalculatorResult[];
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({ results }) => {
  const formatValue = (value: number | string, format: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'number':
        return value.toLocaleString('en-IN');
      default:
        return value.toString();
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Results
      </h3>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-center py-3 px-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{result.label}</p>
              {result.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatValue(result.value, result.format)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorResults;

