import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, TrendingUp, Info } from 'lucide-react';

const currentYear = new Date().getFullYear();

// Tax brackets by year
function getTaxBrackets(year) {
  // 2024 Tax Brackets
  const brackets2024 = {
    single: [
      { min: 0, max: 11600, rate: 0.10, base: 0 },
      { min: 11600, max: 47150, rate: 0.12, base: 1160 },
      { min: 47150, max: 100525, rate: 0.22, base: 5426 },
      { min: 100525, max: 191950, rate: 0.24, base: 17168.50 },
      { min: 191950, max: 243725, rate: 0.32, base: 39110.50 },
      { min: 243725, max: 609350, rate: 0.35, base: 55678.50 },
      { min: 609350, max: Infinity, rate: 0.37, base: 183647.25 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10, base: 0 },
      { min: 23200, max: 94300, rate: 0.12, base: 2320 },
      { min: 94300, max: 201050, rate: 0.22, base: 10852 },
      { min: 201050, max: 383900, rate: 0.24, base: 34337 },
      { min: 383900, max: 487450, rate: 0.32, base: 78221 },
      { min: 487450, max: 731200, rate: 0.35, base: 111357 },
      { min: 731200, max: Infinity, rate: 0.37, base: 196669.50 },
    ],
    hoh: [
      { min: 0, max: 16550, rate: 0.10, base: 0 },
      { min: 16550, max: 63100, rate: 0.12, base: 1655 },
      { min: 63100, max: 100500, rate: 0.22, base: 7241 },
      { min: 100500, max: 191950, rate: 0.24, base: 15469 },
      { min: 191950, max: 243700, rate: 0.32, base: 37417 },
      { min: 243700, max: 609350, rate: 0.35, base: 53977 },
      { min: 609350, max: Infinity, rate: 0.37, base: 181954.50 },
    ],
  };

  // For current year, return the most recent brackets available
  // In production, you'd update this with new IRS data each year
  return brackets2024;
}

function getStandardDeduction(year) {
  const deductions2024 = {
    single: 14600,
    married: 29200,
    hoh: 21900,
  };
  
  return deductions2024;
}

function getMedicareThresholds(year) {
  return {
    single: 200000,
    married: 250000,
    hoh: 200000,
  };
}

function calculateTaxDetails(income, filing, year) {
  const brackets = getTaxBrackets(year)[filing];
  const standardDeduction = getStandardDeduction(year)[filing];
  const medicareThresholds = getMedicareThresholds(year);
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, income - standardDeduction);
  
  // Calculate base tax
  let federalTax = 0;
  let topBracket = brackets[0];
  
  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      federalTax += taxableInBracket * bracket.rate;
      topBracket = bracket;
    }
  }

  // Calculate additional Medicare tax
  const medicareThreshold = medicareThresholds[filing];
  const additionalMedicareTax = income > medicareThreshold 
    ? (income - medicareThreshold) * 0.009 
    : 0;

  const totalTax = federalTax + additionalMedicareTax;
  
  // Effective tax rate
  const effectiveRate = income > 0 ? (federalTax / income) * 100 : 0;
  const marginalRate = topBracket.rate * 100;
  
  // Tax breakdown by bracket
  const bracketBreakdown = [];
  let remainingTaxable = taxableIncome;
  
  for (const bracket of brackets) {
    if (remainingTaxable <= 0) break;
    const amountInBracket = Math.min(remainingTaxable, bracket.max - bracket.min);
    if (amountInBracket > 0) {
      bracketBreakdown.push({
        rate: bracket.rate * 100,
        amount: amountInBracket,
        tax: amountInBracket * bracket.rate,
      });
      remainingTaxable -= amountInBracket;
    }
  }

  return {
    taxableIncome,
    federalTax,
    additionalMedicareTax,
    totalTax,
    effectiveRate,
    marginalRate,
    standardDeduction,
    bracketBreakdown,
    topBracket: topBracket.rate * 100,
  };
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDecimal = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function FederalIncomeTaxCalc() {
  const [income, setIncome] = useState(75000);
  const [filing, setFiling] = useState('single');
  const [showDetails, setShowDetails] = useState(false);

  const taxDetails = calculateTaxDetails(income, filing, currentYear);

  const filingOptions = [
    { val: 'single', label: 'Single', icon: '👤' },
    { val: 'married', label: 'Married Jointly', icon: '👫' },
    { val: 'hoh', label: 'Head of Household', icon: '👨‍👩‍👧' },
  ];

  return (
    <div className="bg-white rounded-xl border-2 p-6 shadow-lg" style={{ borderColor: '#FFD300' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
          <Calculator className="w-6 h-6" style={{ color: '#FFD300' }} />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">Federal Income Tax Calculator</h2>
          <p className="text-xs text-slate-500">{currentYear} Tax Year • IRS Tax Brackets</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {/* Income Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <DollarSign className="w-4 h-4" />
            Annual Gross Income ({currentYear})
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg font-semibold focus:outline-none focus:border-yellow-400 transition-colors"
            placeholder="Enter your annual income"
          />
          {/* Quick income buttons */}
          <div className="flex gap-2 mt-2">
            {[50000, 75000, 100000, 150000, 250000].map(amount => (
              <button
                key={amount}
                onClick={() => setIncome(amount)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  income === amount 
                    ? 'border-yellow-400 bg-yellow-50 text-slate-900 font-semibold' 
                    : 'border-gray-200 text-slate-500 hover:border-gray-300'
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* Filing Status */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <TrendingUp className="w-4 h-4" />
            Filing Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {filingOptions.map(({ val, label, icon }) => (
              <button
                key={val}
                onClick={() => setFiling(val)}
                className="p-3 rounded-lg text-center transition-all border-2"
                style={filing === val 
                  ? { backgroundColor: '#FFD300', borderColor: '#FFD300', color: '#1a1a1a' } 
                  : { borderColor: '#e5e7eb', color: '#4b5563' }
                }
              >
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-xs font-semibold">{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Main Tax Result */}
        <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">{currentYear} Estimated Federal Tax</div>
              <div className="text-3xl font-bold" style={{ color: '#FFD300' }}>
                {formatCurrency(taxDetails.federalTax)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Effective Rate</div>
              <div className="text-2xl font-bold text-white">
                {taxDetails.effectiveRate.toFixed(1)}%
              </div>
            </div>
          </div>
          
          {/* Tax breakdown bars */}
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Marginal Tax Rate</span>
              <span className="text-white font-semibold">{taxDetails.marginalRate}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full" 
                style={{ 
                  width: `${Math.min(taxDetails.marginalRate, 100)}%`,
                  backgroundColor: '#FFD300'
                }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-slate-400">Taxable Income</div>
              <div className="text-white font-semibold">{formatCurrency(taxDetails.taxableIncome)}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-slate-400">Std Deduction ({currentYear})</div>
              <div className="text-white font-semibold">{formatCurrency(taxDetails.standardDeduction)}</div>
            </div>
          </div>
        </div>

        {/* After-tax income */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">After-Tax Income</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(income - taxDetails.totalTax)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-slate-500">Monthly Take-Home</span>
            <span className="font-semibold text-slate-700">
              {formatCurrency((income - taxDetails.totalTax) / 12)}
            </span>
          </div>
        </div>

        {/* Toggle details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-700 py-2"
        >
          <Info className="w-3 h-3" />
          {showDetails ? 'Hide' : 'Show'} Tax Breakdown
        </button>

        {/* Detailed breakdown */}
        {showDetails && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">{currentYear} Tax Bracket Breakdown</h4>
            {taxDetails.bracketBreakdown.map((bracket, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD300' }} />
                  <span className="text-slate-600">{bracket.rate}% on {formatCurrency(bracket.amount)}</span>
                </div>
                <span className="font-semibold text-slate-800">{formatDecimal(bracket.tax)}</span>
              </div>
            ))}
            {taxDetails.additionalMedicareTax > 0 && (
              <div className="border-t pt-2 text-xs">
                <div className="flex justify-between text-orange-600">
                  <span>Additional Medicare Tax (0.9%)</span>
                  <span className="font-semibold">{formatDecimal(taxDetails.additionalMedicareTax)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 leading-relaxed">
          * This calculator provides estimates for the {currentYear} tax year. It does not include 
          state taxes, tax credits, AMT, NIIT, or other specific deductions. Consult a tax 
          professional for personalized advice.
        </p>
      </div>
    </div>
  );
}