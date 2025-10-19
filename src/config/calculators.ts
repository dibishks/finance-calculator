import type { CalculatorConfig } from '../types/calculator';

// SIP Calculator
export const sipCalculatorConfig: CalculatorConfig = {
  id: 'sip',
  title: 'SIP Calculator',
  description:
    'Calculate the future value of your Systematic Investment Plan (SIP) investments.',
  inputs: [
    {
      id: 'monthlyAmount',
      label: 'Monthly SIP Amount',
      type: 'currency',
      placeholder: '5000',
      required: true,
      min: 500,
      max: 100000,
      step: 500,
      prefix: '₹',
    },
    {
      id: 'annualReturn',
      label: 'Expected Annual Return',
      type: 'percentage',
      placeholder: '12',
      required: true,
      min: 1,
      max: 50,
      step: 0.5,
      suffix: '%',
    },
    {
      id: 'investmentPeriod',
      label: 'Investment Period',
      type: 'number',
      placeholder: '10',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
    },
  ],
  calculate: (inputs) => {
    const { monthlyAmount, annualReturn, investmentPeriod } = inputs;
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;

    // SIP Future Value Formula: A = P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue =
      monthlyAmount *
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate));
    const totalInvestment = monthlyAmount * totalMonths;
    const totalGains = futureValue - totalInvestment;

    return [
      {
        label: 'Total Investment',
        value: totalInvestment,
        format: 'currency',
        description: 'Total amount you will invest',
      },
      {
        label: 'Total Gains',
        value: totalGains,
        format: 'currency',
        description: 'Wealth created through compounding',
      },
      {
        label: 'Future Value',
        value: futureValue,
        format: 'currency',
        description: 'Final amount after investment period',
      },
    ];
  },
  formula: 'A = P × [((1 + r)^n - 1) / r] × (1 + r)',
  tips: [
    'Start early to benefit from the power of compounding',
    'Consider increasing your SIP amount annually with salary hikes',
    'Stay invested for the long term to maximize returns',
    'Review and rebalance your portfolio periodically',
  ],
};

// EMI Calculator
export const emiCalculatorConfig: CalculatorConfig = {
  id: 'emi',
  title: 'EMI Calculator',
  description: 'Calculate your Equated Monthly Installment (EMI) for loans.',
  inputs: [
    {
      id: 'principal',
      label: 'Loan Amount',
      type: 'currency',
      placeholder: '500000',
      required: true,
      min: 100000,
      max: 10000000,
      step: 50000,
      prefix: '₹',
    },
    {
      id: 'annualRate',
      label: 'Annual Interest Rate',
      type: 'percentage',
      placeholder: '10.5',
      required: true,
      min: 1,
      max: 30,
      step: 0.5,
      suffix: '%',
    },
    {
      id: 'tenure',
      label: 'Loan Tenure',
      type: 'number',
      placeholder: '5',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      suffix: ' years',
    },
  ],
  calculate: (inputs) => {
    const { principal, annualRate, tenure } = inputs;
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = tenure * 12;

    // EMI Formula: EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    return [
      {
        label: 'Monthly EMI',
        value: emi,
        format: 'currency',
        description: 'Amount to pay every month',
      },
      {
        label: 'Total Interest',
        value: totalInterest,
        format: 'currency',
        description: 'Total interest over loan tenure',
      },
      {
        label: 'Total Payment',
        value: totalPayment,
        format: 'currency',
        description: 'Total amount to be paid',
      },
    ];
  },
  formula: 'EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]',
  tips: [
    'Compare interest rates from multiple lenders',
    'Consider prepayment options to reduce interest burden',
    "Ensure EMI doesn't exceed 40% of your monthly income",
    'Factor in additional costs like processing fees and insurance',
  ],
};

// CAGR Calculator
export const cagrCalculatorConfig: CalculatorConfig = {
  id: 'cagr',
  title: 'CAGR Calculator',
  description: 'Calculate the Compound Annual Growth Rate of your investments.',
  inputs: [
    {
      id: 'beginningValue',
      label: 'Beginning Value',
      type: 'currency',
      placeholder: '100000',
      required: true,
      min: 500,
      max: 1000000,
      step: 50000,
      prefix: '₹',
    },
    {
      id: 'endingValue',
      label: 'Ending Value',
      type: 'currency',
      placeholder: '200000',
      required: true,
      min: 500,
      max: 30000000,
      step: 100000,
      prefix: '₹',
    },
    {
      id: 'years',
      label: 'Number of Years',
      type: 'number',
      placeholder: '5',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
    },
  ],
  calculate: (inputs) => {
    const { beginningValue, endingValue, years } = inputs;

    // CAGR Formula: CAGR = (Ending Value / Beginning Value)^(1/Years) - 1
    const cagr = Math.pow(endingValue / beginningValue, 1 / years) - 1;
    const totalReturn = endingValue - beginningValue;
    const totalReturnPercentage = (totalReturn / beginningValue) * 100;

    return [
      {
        label: 'CAGR',
        value: cagr * 100,
        format: 'percentage',
        description: 'Compound Annual Growth Rate',
      },
      {
        label: 'Total Return',
        value: totalReturn,
        format: 'currency',
        description: 'Absolute return on investment',
      },
      {
        label: 'Total Return %',
        value: totalReturnPercentage,
        format: 'percentage',
        description: 'Total return percentage',
      },
    ];
  },
  formula: 'CAGR = (Ending Value / Beginning Value)^(1/Years) - 1',
  tips: [
    'CAGR smooths out volatility and shows average annual growth',
    'Use CAGR to compare different investment options',
    "Remember that CAGR doesn't account for market volatility",
    'Consider the time period when interpreting CAGR results',
  ],
};

// Target & Stop Loss Calculator
export const targetStopLossCalculatorConfig: CalculatorConfig = {
  id: 'target-stop-loss',
  title: 'Target & Stop Loss Calculator',
  description:
    'Calculate target and stop loss prices for your share investments.',
  inputs: [
    {
      id: 'shareQuantity',
      label: 'Share Quantity',
      type: 'number',
      placeholder: '100',
      required: true,
      //min: 1,
      //max: 1000000,
      //step: 1
    },
    {
      id: 'purchasePrice',
      label: 'Purchase Price',
      type: 'currency',
      placeholder: '100',
      required: true,
      //min: 1,
      //max: 10000,
      //step: 0.01,
      prefix: '₹',
    },
    {
      id: 'currentPrice',
      label: 'Current Price',
      type: 'currency',
      placeholder: '105',
      required: true,
      //min: 1,
      //max: 10000,
      //step: 0.01,
      prefix: '₹',
    },
  ],
  calculate: (inputs) => {
    const { shareQuantity, purchasePrice, currentPrice } = inputs;

    // Generate target prices for 1% to 10% increases
    const targetResults = [];
    const stopLossResults = [];

    for (let i = 1; i <= 10; i++) {
      const targetPrice = purchasePrice * (1 + i / 100);
      const profitPerShare = targetPrice - purchasePrice;
      const totalProfit = profitPerShare * shareQuantity;

      targetResults.push({
        percentage: i,
        targetPrice: targetPrice,
        profitPerShare: profitPerShare,
        totalProfit: totalProfit,
      });

      const stopLossPrice = purchasePrice * (1 - i / 100);
      const lossPerShare = stopLossPrice - purchasePrice;
      const totalLoss = lossPerShare * shareQuantity;

      stopLossResults.push({
        percentage: i,
        stopLossPrice: stopLossPrice,
        lossPerShare: lossPerShare,
        totalLoss: totalLoss,
      });
    }

    return {
      targetResults,
      stopLossResults,
      currentPrice,
      purchasePrice,
      shareQuantity,
    };
  },
  formula: 'Target Price = Purchase Price × (1 ± Percentage/100)',
  tips: [
    'Consider your risk tolerance when setting stop losses',
    'Use technical analysis to validate percentage levels',
    'Monitor your positions regularly',
    'Consider market volatility when choosing percentages',
  ],
};

// Position Sizing Calculator
export const positionCalculatorConfig: CalculatorConfig = {
  id: 'position-sizing',
  title: 'Position Sizing Calculator',
  description:
    'Calculate profit/loss scenarios for different price movements from your purchase price to plan your exit strategy.',
  inputs: [
    {
      id: 'purchasePrice',
      label: 'Purchase Price per Share',
      type: 'currency',
      placeholder: '100',
      required: true,
      min: 0.01,
      max: 10000,
      step: 0.01,
      prefix: '₹',
    },
    {
      id: 'quantity',
      label: 'Number of Shares',
      type: 'number',
      placeholder: '100',
      required: true,
      min: 1,
      max: 1000000,
      step: 1,
      suffix: ' shares',
    },
  ],
  calculate: (inputs) => {
    const { purchasePrice, quantity } = inputs;
    const results = [];

    // Target (Profit) Table - 1% to 10% from purchase price
    for (let i = 1; i <= 10; i++) {
      const targetPrice = purchasePrice * (1 + i / 100);
      const profitPerShare = targetPrice - purchasePrice;
      const totalProfit = profitPerShare * quantity;

      results.push({
        label: `+${i}% Target`,
        value: `${i}%`,
        format: 'text',
        description: `Target: ₹${targetPrice.toFixed(2)} | Profit/Share: ₹${profitPerShare.toFixed(2)} | Total: ₹${totalProfit.toFixed(2)}`,
      });
    }

    // Stop Loss Table - 1% to 10% from purchase price
    for (let i = 1; i <= 10; i++) {
      const stopLossPrice = purchasePrice * (1 - i / 100);
      const lossPerShare = stopLossPrice - purchasePrice;
      const totalLoss = lossPerShare * quantity;

      results.push({
        label: `-${i}% Stop Loss`,
        value: `${i}%`,
        format: 'text',
        description: `Stop Loss: ₹${stopLossPrice.toFixed(2)} | Loss/Share: ₹${lossPerShare.toFixed(2)} | Total: ₹${totalLoss.toFixed(2)}`,
      });
    }

    return results;
  },
  formula: 'Target Price = Purchase Price × (1 ± Percentage/100)',
  tips: [
    'Use this to plan your exit strategy before entering a position',
    'Set realistic profit targets based on market conditions',
    'Always set stop losses to limit downside risk',
    'Consider position size relative to your total portfolio',
  ],
};

// Export all calculator configs
export const calculatorConfigs = {
  sip: sipCalculatorConfig,
  emi: emiCalculatorConfig,
  cagr: cagrCalculatorConfig,
  'target-stop-loss': targetStopLossCalculatorConfig,
  'position-sizing': positionCalculatorConfig,
  // Add more calculators here as we build them
};
