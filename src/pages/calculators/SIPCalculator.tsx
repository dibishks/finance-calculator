import React from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import CalculatorForm from '../../components/calculator/CalculatorForm';
import { sipCalculatorConfig } from '../../config/calculators';

const SIPCalculator: React.FC = () => {
  return (
    <CalculatorLayout config={sipCalculatorConfig}>
      <CalculatorForm config={sipCalculatorConfig} />
    </CalculatorLayout>
  );
};

export default SIPCalculator;




