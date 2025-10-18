import React, { useState, useEffect } from 'react';
import type { CalculatorConfig } from '../../types/calculator';
import CalculatorInput from './CalculatorInput';
import CalculatorSlider from './CalculatorSlider';
import CalculatorResults from './CalculatorResults';

interface CalculatorFormProps {
  config: CalculatorConfig;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ config }) => {
  const [inputs, setInputs] = useState<Record<string, number | string>>({});
  const [results, setResults] = useState<ReturnType<CalculatorConfig['calculate']>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize inputs with default values
  useEffect(() => {
    const initialInputs: Record<string, number | string> = {};
    config.inputs.forEach(input => {
      if (input.type === 'text') {
        initialInputs[input.id] = '';
      } else {
        // Use min value as default for sliders, or 0 for regular inputs
        initialInputs[input.id] = input.min || 0;
      }
    });
    setInputs(initialInputs);
  }, [config.inputs]);

  const handleInputChange = (inputId: string, value: number | string) => {
    setInputs(prev => ({ ...prev, [inputId]: value }));
    
    // Clear error for this input
    if (errors[inputId]) {
      setErrors(prev => ({ ...prev, [inputId]: '' }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    config.inputs.forEach(input => {
      const value = inputs[input.id];
      
      if (input.required && (value === '' || value === 0)) {
        newErrors[input.id] = `${input.label} is required`;
        return;
      }
      
      if (typeof value === 'number') {
        if (input.min !== undefined && value < input.min) {
          newErrors[input.id] = `${input.label} must be at least ${input.min}`;
        }
        if (input.max !== undefined && value > input.max) {
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
      config.inputs.forEach(input => {
        numericInputs[input.id] = typeof inputs[input.id] === 'number' 
          ? inputs[input.id] as number 
          : parseFloat(inputs[input.id] as string) || 0;
      });
      
      const calculatedResults = config.calculate(numericInputs);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const handleReset = () => {
    const resetInputs: Record<string, number | string> = {};
    config.inputs.forEach(input => {
      if (input.type === 'text') {
        resetInputs[input.id] = '';
      } else {
        // Use min value as default for sliders, or 0 for regular inputs
        resetInputs[input.id] = input.min || 0;
      }
    });
    setInputs(resetInputs);
    setResults([]);
    setErrors({});
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Input Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Enter Your Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.inputs.map((input) => {
            // Use slider for SIP, EMI, CAGR, and Target & Stop Loss calculator inputs
            if ((config.id === 'sip' || config.id === 'emi' || config.id === 'cagr' || config.id === 'target-stop-loss') && input.type !== 'text') {
              return (
                <CalculatorSlider
                  key={input.id}
                  label={input.label}
                  value={inputs[input.id] as number || input.min || 0}
                  min={input.min || 0}
                  max={input.max || 100}
                  step={input.step || 1}
                  prefix={input.prefix}
                  suffix={input.suffix}
                  onChange={(value) => handleInputChange(input.id, value)}
                  error={errors[input.id]}
                  required={input.required}
                />
              );
            }
            
            return (
              <CalculatorInput
                key={input.id}
                input={input}
                value={inputs[input.id] || (input.type === 'text' ? '' : 0)}
                onChange={(value) => handleInputChange(input.id, value)}
                error={errors[input.id]}
              />
            );
          })}
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
      {results.length > 0 && (
        <CalculatorResults results={results} />
      )}
    </div>
  );
};

export default CalculatorForm;
