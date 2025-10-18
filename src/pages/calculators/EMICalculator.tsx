import React from 'react';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import CalculatorForm from '../../components/calculator/CalculatorForm';
import { emiCalculatorConfig } from '../../config/calculators';

const EMICalculator: React.FC = () => {
  return (
    <CalculatorLayout config={emiCalculatorConfig}>
      <CalculatorForm config={emiCalculatorConfig} />
    </CalculatorLayout>
  );
};

export default EMICalculator;




