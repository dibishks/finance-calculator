import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PiggyBank, 
  DollarSign, 
  CreditCard, 
  Target, 
  Calculator, 
  Car, 
  Banknote, 
  Gift, 
  Percent, 
  TrendingDown 
} from 'lucide-react';

interface CalculatorCard {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  hoverGradient: string;
}

const calculators: CalculatorCard[] = [
  {
    id: 'intraday-position',
    name: 'Intraday Position Sizing Calculator',
    icon: TrendingUp,
    gradient: 'from-emerald-400 to-emerald-600',
    hoverGradient: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'swing-position',
    name: 'Swing Position Sizing Calculator',
    icon: BarChart3,
    gradient: 'from-blue-400 to-blue-600',
    hoverGradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    icon: PiggyBank,
    gradient: 'from-green-400 to-green-600',
    hoverGradient: 'from-green-500 to-green-700'
  },
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    icon: DollarSign,
    gradient: 'from-yellow-400 to-yellow-600',
    hoverGradient: 'from-yellow-500 to-yellow-700'
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    icon: CreditCard,
    gradient: 'from-purple-400 to-purple-600',
    hoverGradient: 'from-purple-500 to-purple-700'
  },
  {
    id: 'goal-based',
    name: 'Goal Based Calculator',
    icon: Target,
    gradient: 'from-red-400 to-red-600',
    hoverGradient: 'from-red-500 to-red-700'
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    icon: Calculator,
    gradient: 'from-indigo-400 to-indigo-600',
    hoverGradient: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'car-buying',
    name: 'Car Buying Calculator',
    icon: Car,
    gradient: 'from-orange-400 to-orange-600',
    hoverGradient: 'from-orange-500 to-orange-700'
  },
  {
    id: 'fixed-deposit',
    name: 'Fixed Deposit Calculator',
    icon: Banknote,
    gradient: 'from-teal-400 to-teal-600',
    hoverGradient: 'from-teal-500 to-teal-700'
  },
  {
    id: 'gratuity',
    name: 'Gratuity Calculator',
    icon: Gift,
    gradient: 'from-pink-400 to-pink-600',
    hoverGradient: 'from-pink-500 to-pink-700'
  },
  {
    id: 'flat-vs-reducing',
    name: 'Flat vs Reducing Rate Calculator',
    icon: Percent,
    gradient: 'from-cyan-400 to-cyan-600',
    hoverGradient: 'from-cyan-500 to-cyan-700'
  },
  {
    id: 'step-up-sip',
    name: 'Step Up SIP Calculator',
    icon: TrendingDown,
    gradient: 'from-violet-400 to-violet-600',
    hoverGradient: 'from-violet-500 to-violet-700'
  }
];

const CalculatorSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Investment Calculators
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Make informed financial decisions with our comprehensive suite of investment and financial calculators. 
            From SIP planning to position sizing, we've got you covered.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {calculators.map((calculator) => {
            const IconComponent = calculator.icon;
            return (
              <div
                key={calculator.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${calculator.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${calculator.gradient} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Calculator Name */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                    {calculator.name}
                  </h3>

                  {/* Try It Button */}
                  <button
                    onClick={() => {
                      // Placeholder for future navigation
                      console.log(`Navigate to ${calculator.id} calculator`);
                    }}
                    className="inline-block bg-transparent border-2 border-gray-400 dark:border-gray-300 text-gray-700 dark:text-gray-200 font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:border-gray-600 dark:hover:border-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-300/50"
                  >
                    Try It
                  </button>
                </div>

                {/* Subtle border glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${calculator.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Need help choosing the right calculator for your needs?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50">
            Get Financial Guidance
          </button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
