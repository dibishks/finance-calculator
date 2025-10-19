import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import CalculatorInput from '../../components/calculator/CalculatorInput';
import TargetStopLossResults from '../../components/calculator/TargetStopLossResults';
import { targetStopLossCalculatorConfig } from '../../config/calculators';

const TargetStopLossCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<Record<string, number | string>>({});
  const [results, setResults] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize inputs with default values
  useEffect(() => {
    const initialInputs: Record<string, number | string> = {};
    targetStopLossCalculatorConfig.inputs.forEach((input) => {
      initialInputs[input.id] = '';
    });
    setInputs(initialInputs);
  }, []);

  const handleInputChange = (inputId: string, value: number | string) => {
    setInputs((prev) => ({ ...prev, [inputId]: value }));

    // Clear error for this input
    if (errors[inputId]) {
      setErrors((prev) => ({ ...prev, [inputId]: '' }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    targetStopLossCalculatorConfig.inputs.forEach((input) => {
      const value = inputs[input.id];

      if (
        input.required &&
        (value === '' || value === undefined || value === null)
      ) {
        newErrors[input.id] = `${input.label} is required`;
        return;
      }

      // If value is a non-empty string, try to parse into a number for min/max checks
      const numeric =
        typeof value === 'number' ? value : parseFloat(value as string);
      if (!isNaN(numeric)) {
        if (input.min !== undefined && numeric < input.min) {
          newErrors[input.id] = `${input.label} must be at least ${input.min}`;
        }
        if (input.max !== undefined && numeric > input.max) {
          newErrors[input.id] = `${input.label} must be at most ${input.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const numericInputs: Record<string, number> = {};
      targetStopLossCalculatorConfig.inputs.forEach((input) => {
        const raw = inputs[input.id];
        const num = typeof raw === 'number' ? raw : parseFloat(raw as string);
        numericInputs[input.id] = isNaN(num) ? 0 : num;
      });

      const calculatedResults =
        targetStopLossCalculatorConfig.calculate(numericInputs);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const handleReset = () => {
    const resetInputs: Record<string, number | string> = {};
    targetStopLossCalculatorConfig.inputs.forEach((input) => {
      resetInputs[input.id] = '';
    });
    setInputs(resetInputs);
    setResults(null);
    setErrors({});
  };

  return (
    <CalculatorLayout config={targetStopLossCalculatorConfig}>
      <div className="p-6 lg:p-8">
        {/* Input Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Enter Your Share Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetStopLossCalculatorConfig.inputs.map((input) => (
              <CalculatorInput
                key={input.id}
                input={input}
                value={inputs[input.id] || input.min || 0}
                onChange={(value) => handleInputChange(input.id, value)}
                error={errors[input.id]}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {results && <TargetStopLossResults results={results} />}
      </div>
    </CalculatorLayout>
  );
};

export default TargetStopLossCalculator;
