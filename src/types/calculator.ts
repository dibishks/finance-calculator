export interface CalculatorInputConfig {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage' | 'text';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
}

export interface CalculatorResult {
  label: string;
  value: number | string;
  format: 'currency' | 'number' | 'percentage';
  description?: string;
}

export interface CalculatorConfig {
  id: string;
  title: string;
  description: string;
  inputs: CalculatorInputConfig[];
  calculate: (inputs: Record<string, number>) => CalculatorResult[] | any;
  formula?: string;
  tips?: string[];
}

export interface CalculatorPageProps {
  config: CalculatorConfig;
}
