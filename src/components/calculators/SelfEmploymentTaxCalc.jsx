import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';

const currentYear = new Date().getFullYear();

// IRS rates by year
function getSETaxConstants(year) {
  // 2024 constants
  const constants2024 = {
    ssWageBase: 168600,
    additionalMedicareThreshold: 200000,
    ssRate: 0.124, // 12.4%
    medicareRate: 0.029, // 2.9%
    additionalMedicareRate: 0.009, // 0.9%
    netEarningsFactor: 0.9235, // 92.35%
  };

  // For now, return 2024 constants
  // Update with new IRS data for future years
  return constants2024;
}

function calculateSETax(netIncome, year) {
  const constants = getSETaxConstants(year);
  
  // 92.35% of net self-employment income is subject to SE tax
  const netEarnings = netIncome * constants.netEarningsFactor;
  
  // Social Security: 12.4% on first wage base
  const socialSecurityTax = Math.min(netEarnings, constants.ssWageBase) * constants.ssRate;
  
  // Medicare: 2.9% on all net earnings
  const medicareTax = netEarnings * constants.medicareRate;
  
  // Additional Medicare: 0.9% on earnings above threshold
  const additionalMedicareTax = Math.max(0, netEarnings - constants.additionalMedicareThreshold) * constants.additionalMedicareRate;
  
  const totalSETax = socialSecurityTax + medicareTax + additionalMedicareTax;
  const deduction = totalSETax / 2;
  const effectiveRate = netIncome > 0 ? (totalSETax / netIncome) * 100 : 0;
  
  return {
    netEarnings,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    totalSETax,
    deduction,
    effectiveRate,
    isOverSSWageBase: netEarnings > constants.ssWageBase,
    isOverMedicareThreshold: netEarnings > constants.additionalMedicareThreshold,
    constants,
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

export default function SelfEmploymentTaxCalc() {
  const [income, setIncome] = useState('');
  const [showBreakdown, setShowBreakdown] = useState(true);

  const netIncome = parseFloat(income.replace(/,/g, '')) || 0;
  const taxDetails = calculateSETax(netIncome, currentYear);
  const constants = getSETaxConstants(currentYear);

  return (
    <div className="bg-white rounded-xl border-2 p-6 shadow-lg flex flex-col" style={{ borderColor: '#FFD300' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
          <Calculator className="w-6 h-6" style={{ color: '#FFD300' }} />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">Self-Employment Tax</h2>
          <p className="text-xs text-slate-500">{currentYear} IRS Rates • Form 1040-SE</p>
        </div>
      </div>

      {/* Tax Rate Info */}
      <div className="bg-gray-50 rounded-lg p-3 mb-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <Info className="w-4 h-4" />
          Current SE Tax Rates ({currentYear})
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <div className="text-slate-500">Social Security</div>
            <div className="font-bold text-slate-800">12.4%</div>
            <div className="text-slate-400">Up to {formatCurrency(constants.ssWageBase)}</div>
          </div>
          <div className="bg-white rounded p-2">
            <div className="text-slate-500">Medicare</div>
            <div className="font-bold text-slate-800">2.9%</div>
            <div className="text-slate-400">All earnings</div>
          </div>
        </div>
        {netIncome > constants.additionalMedicareThreshold && (
          <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
            <div className="text-xs font-semibold text-amber-700">
              +0.9% Additional Medicare Tax applies
            </div>
            <div className="text-xs text-amber-600">
              On earnings above {formatCurrency(constants.additionalMedicareThreshold)}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <DollarSign className="w-4 h-4" />
          Net Self-Employment Income ({currentYear})
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
          <input
            type="text"
            value={income}
            onChange={e => setIncome(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="Enter your net income"
            className="w-full pl-7 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg font-semibold focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>
        <div className="flex gap-2 mt-2">
          {[50000, 100000, 150000, 250000].map(amount => (
            <button
              key={amount}
              onClick={() => setIncome(amount.toString())}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                netIncome === amount 
                  ? 'border-yellow-400 bg-yellow-50 text-slate-900 font-semibold' 
                  : 'border-gray-200 text-slate-500 hover:border-gray-300'
              }`}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {netIncome > 0 && (
        <div className="space-y-4 flex-1">
          {/* Main Result */}
          <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
            <div className="text-sm text-slate-400 mb-2">{currentYear} Total Self-Employment Tax</div>
            <div className="text-3xl font-bold mb-3" style={{ color: '#FFD300' }}>
              {formatCurrency(taxDetails.totalSETax)}
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/10 rounded p-2">
                <div className="text-slate-400">Effective Rate</div>
                <div className="text-white font-semibold">{taxDetails.effectiveRate.toFixed(1)}%</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-slate-400">Tax Deduction</div>
                <div className="text-green-400 font-semibold">{formatCurrency(taxDetails.deduction)}</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-slate-400">Net Earnings</div>
                <div className="text-white font-semibold">{formatCurrency(taxDetails.netEarnings)}</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-slate-400">Quarterly Payment</div>
                <div className="text-white font-semibold">{formatCurrency(taxDetails.totalSETax / 4)}</div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div>
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 mb-3"
            >
              {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {currentYear} Tax Breakdown
            </button>
            
            {showBreakdown && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Net Earnings (×92.35%)</span>
                    <span className="font-semibold">{formatCurrency(taxDetails.netEarnings)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Social Security (12.4%)</span>
                    <div className="text-right">
                      <span className="font-semibold">{formatCurrency(taxDetails.socialSecurityTax)}</span>
                      {taxDetails.isOverSSWageBase && (
                        <div className="text-xs text-amber-600">Capped at wage base</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Medicare (2.9%)</span>
                    <span className="font-semibold">{formatCurrency(taxDetails.medicareTax)}</span>
                  </div>
                  
                  {taxDetails.additionalMedicareTax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-700">Additional Medicare (0.9%)</span>
                      <span className="font-semibold text-amber-700">
                        {formatCurrency(taxDetails.additionalMedicareTax)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">Total SE Tax</span>
                    <span style={{ color: '#b8860b' }}>{formatCurrency(taxDetails.totalSETax)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Above-line Deduction (50%)</span>
                    <span className="font-semibold">-{formatCurrency(taxDetails.deduction)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded p-3 text-xs">
                  <div className="font-semibold text-blue-800 mb-1">💡 Tax Tip</div>
                  <p className="text-blue-700">
                    You can deduct half of your SE tax as an above-the-line deduction on Form 1040. 
                    This reduces your adjusted gross income (AGI).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Warnings */}
          {(taxDetails.isOverSSWageBase || taxDetails.isOverMedicareThreshold) && (
            <div className="space-y-2">
              {taxDetails.isOverSSWageBase && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
                  ⚠️ Social Security tax capped at {formatCurrency(constants.ssWageBase)} wage base ({currentYear})
                </div>
              )}
              {taxDetails.isOverMedicareThreshold && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                  ⚠️ Additional 0.9% Medicare tax applies on income above {formatCurrency(constants.additionalMedicareThreshold)}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-slate-400">
            * This is an estimate for {currentYear}. File Schedule SE with Form 1040. Consult a tax professional for personalized advice.
          </p>
        </div>
      )}
    </div>
  );
}