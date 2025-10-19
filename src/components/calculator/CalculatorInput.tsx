import React from 'react';
import type { CalculatorInputConfig } from '../../types/calculator';

interface CalculatorInputProps {
  input: CalculatorInputConfig;
  value: number | string;
  onChange: (value: number | string) => void;
  error?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  input,
  value,
  onChange,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // For numeric-like inputs, keep the raw string while typing so users can enter
    // long numbers, decimals, or clear the field. Parsing to number should happen
    // on form submit or inside the page logic.
    onChange(raw);
  };

  // Show the raw value in the input. Do not format here (formatting breaks typing).
  const formatValue = (val: number | string) => val;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {input.label}
        {input.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {input.prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {input.prefix}
            </span>
          </div>
        )}

        <input
          type={input.type === 'text' ? 'text' : 'text'}
          value={formatValue(value)}
          onChange={handleChange}
          placeholder={input.placeholder}
          // keep min/max attributes only if explicitly set (they don't restrict length in uncontrolled way)
          {...(input.min !== undefined ? { min: input.min } : {})}
          {...(input.max !== undefined ? { max: input.max } : {})}
          {...(input.step !== undefined ? { step: input.step } : {})}
          required={input.required}
          className={`
            w-full px-4 py-3 border rounded-lg transition-colors duration-200
            ${input.prefix ? 'pl-8' : ''}
            ${input.suffix ? 'pr-8' : ''}
            ${
              error
                ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
            }
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder-gray-500 dark:placeholder-gray-400
          `}
        />

        {input.suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {input.suffix}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default CalculatorInput;
