import React, { useState, useRef } from 'react';

interface CalculatorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  error?: string;
  required?: boolean;
}

const CalculatorSlider: React.FC<CalculatorSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  onChange,
  formatValue,
  error,
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value) || 0;
    const clampedValue = Math.min(Math.max(inputValue, min), max);
    onChange(clampedValue);
  };

  const defaultFormatValue = (val: number) => {
    if (suffix === '%') {
      return val.toFixed(1);
    }
    if (prefix === '₹') {
      return val.toLocaleString();
    }
    return val.toString();
  };

  const displayValue = formatValue ? formatValue(value) : defaultFormatValue(value);
  const sliderPercentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
  
    setIsDragging(true);
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = min + (percentage * (max - min));
    const steppedValue = Math.round((newValue - min) / step) * step + min;
    const clampedValue = Math.min(Math.max(steppedValue, min), max);
    onChange(clampedValue);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = min + (percentage * (max - min));
    const steppedValue = Math.round((newValue - min) / step) * step + min;
    const clampedValue = Math.min(Math.max(steppedValue, min), max);
    onChange(clampedValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newValue = min + (percentage * (max - min));
      const steppedValue = Math.round((newValue - min) / step) * step + min;
      const clampedValue = Math.min(Math.max(steppedValue, min), max);
      onChange(clampedValue);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, min, max, step, onChange]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Value Display */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {prefix}{displayValue}{suffix}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Range: {prefix}{min.toLocaleString()}{suffix} - {prefix}{max.toLocaleString()}{suffix}
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <div 
          ref={sliderRef}
          className="relative h-6 cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Track */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          
          {/* Progress */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200"
            style={{ width: `${sliderPercentage}%` }}
          ></div>
          
          {/* Slider Thumb */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full shadow-lg transition-all duration-200 select-none ${
              isDragging ? 'scale-110 shadow-xl' : 'hover:scale-110'
            }`}
            style={{ left: `calc(${sliderPercentage}% - 12px)` }}
          ></div>
        </div>
        
        {/* Hidden range input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="sr-only"
          aria-label={label}
        />
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className={`
              w-full px-4 py-2 border rounded-lg transition-colors duration-200
              ${error 
                ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              }
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          />
        </div>
        {suffix && (
          <span className="text-gray-500 dark:text-gray-400 font-medium">{suffix}</span>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default CalculatorSlider;
