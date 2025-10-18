import React from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import CalculatorForm from '../../components/calculator/CalculatorForm';
import { cagrCalculatorConfig } from '../../config/calculators';

const CAGRCalculator: React.FC = () => {
  return (
    <CalculatorLayout config={cagrCalculatorConfig}>
      <CalculatorForm config={cagrCalculatorConfig} />
    </CalculatorLayout>
  );
};

export default CAGRCalculator;




