import React from 'react';
import type { CalculatorResult } from '../../types/calculator';

interface PositionResultsProps {
  results: CalculatorResult[];
}

const PositionResults: React.FC<PositionResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  // Separate target and stop loss results
  const targetResults = results.filter(result => result.label.includes('Target'));
  const stopLossResults = results.filter(result => result.label.includes('Stop Loss'));

  return (
    <div className="space-y-8">
      {/* Target (Profit) Table */}
      {targetResults.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Target Prices (Profit Table)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-200 dark:border-green-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-green-800 dark:text-green-200">Target %</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-green-800 dark:text-green-200">Target Price (₹)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-green-800 dark:text-green-200">Profit/Share (₹)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-green-800 dark:text-green-200">Total Profit (₹)</th>
                </tr>
              </thead>
              <tbody>
                {targetResults.map((result, index) => {
                  const parts = result.description?.split(' | ') || [];
                  const targetPrice = parts[0]?.replace('Target: ₹', '') || '';
                  const profitPerShare = parts[1]?.replace('Profit/Share: ₹', '') || '';
                  const totalProfit = parts[2]?.replace('Total: ₹', '') || '';
                  
                  return (
                    <tr key={index} className="border-b border-green-100 dark:border-green-800/50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">+{result.value}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{targetPrice}</td>
                      <td className="py-3 px-4 text-sm text-green-600 dark:text-green-400 font-medium">+{profitPerShare}</td>
                      <td className="py-3 px-4 text-sm text-green-600 dark:text-green-400 font-medium">+{totalProfit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stop Loss Table */}
      {stopLossResults.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Stop Loss Prices (Loss Table)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-200 dark:border-red-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-red-800 dark:text-red-200">Stop Loss %</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-red-800 dark:text-red-200">Stop Loss Price (₹)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-red-800 dark:text-red-200">Loss/Share (₹)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-red-800 dark:text-red-200">Total Loss (₹)</th>
                </tr>
              </thead>
              <tbody>
                {stopLossResults.map((result, index) => {
                  const parts = result.description?.split(' | ') || [];
                  const stopLossPrice = parts[0]?.replace('Stop Loss: ₹', '') || '';
                  const lossPerShare = parts[1]?.replace('Loss/Share: ₹', '') || '';
                  const totalLoss = parts[2]?.replace('Total: ₹', '') || '';
                  
                  return (
                    <tr key={index} className="border-b border-red-100 dark:border-red-800/50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">-{result.value}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{stopLossPrice}</td>
                      <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400 font-medium">{lossPerShare}</td>
                      <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400 font-medium">{totalLoss}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionResults;
