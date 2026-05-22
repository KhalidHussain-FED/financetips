import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, AlertCircle, Clock } from 'lucide-react';

const today = new Date();
const currentYear = today.getFullYear();
const taxYear = currentYear; // Use current year for tax calculations

// Dynamically calculate quarterly due dates for current year
function getQuarterlyDueDates(year) {
  return [
    { 
      label: `Q1 ${year}`, 
      due: `${year}-04-15`, 
      months: `Jan – Mar ${year}` 
    },
    { 
      label: `Q2 ${year}`, 
      due: `${year}-06-15`, 
      months: `Apr – May ${year}` 
    },
    { 
      label: `Q3 ${year}`, 
      due: `${year}-09-15`, 
      months: `Jun – Aug ${year}` 
    },
    { 
      label: `Q4 ${year}`, 
      due: `${year + 1}-01-15`, 
      months: `Sep – Dec ${year}` 
    },
  ];
}

// Adjust due dates for weekends/holidays (simplified - IRS rules)
function adjustDueDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay();
  
  // If Saturday (6), move to Monday
  if (day === 6) {
    date.setDate(date.getDate() + 2);
  }
  // If Sunday (0), move to Monday
  else if (day === 0) {
    date.setDate(date.getDate() + 1);
  }
  
  return date.toISOString().split('T')[0];
}

const QUARTERS = getQuarterlyDueDates(taxYear).map(q => ({
  ...q,
  due: adjustDueDate(q.due)
}));

// 2024 IRS Tax Brackets (will be updated based on current year)
function getTaxBrackets(year) {
  // For now, using 2024 brackets as base
  // In production, you'd fetch or calculate based on IRS inflation adjustments
  const brackets2024 = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
  };
  
  // For future years, you could apply inflation adjustments
  // For now, return 2024 brackets
  return brackets2024;
}

function getStandardDeduction(year) {
  // 2024 standard deductions
  const deductions2024 = {
    single: 14600,
    married: 29200,
    hoh: 21900,
  };
  
  return deductions2024;
}

const SS_WAGE_BASE = 168600; // 2024 - adjust for future years

function calcSETax(net) {
  const netEarnings = net * 0.9235;
  const ssTax = Math.min(netEarnings, SS_WAGE_BASE) * 0.124;
  const medicareTax = netEarnings * 0.029;
  const additionalMedicare = Math.max(0, netEarnings - 200000) * 0.009;
  return ssTax + medicareTax + additionalMedicare;
}

function calcFederalTax(taxable, filing) {
  const brackets = getTaxBrackets(taxYear)[filing];
  let tax = 0;
  for (const b of brackets) {
    if (taxable <= b.min) break;
    tax += (Math.min(taxable, b.max) - b.min) * b.rate;
  }
  return tax;
}

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function QuarterlyTaxCalc() {
  const [income, setIncome] = useState('');
  const [isSelfEmployed, setIsSelfEmployed] = useState(true);
  const [filing, setFiling] = useState('single');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const STD_DED = getStandardDeduction(taxYear);

  const annual = parseFloat(income.replace(/,/g, '')) || 0;
  const seTax = isSelfEmployed ? calcSETax(annual) : 0;
  const seDed = seTax / 2;
  const agi = annual - seDed;
  const taxable = Math.max(0, agi - STD_DED[filing]);
  const fedTax = calcFederalTax(taxable, filing);
  const totalTax = seTax + fedTax;
  const quarterly = totalTax / 4;
  const safeHarbor = totalTax * 1.1 / 4;

  const dueDates = QUARTERS.map(q => new Date(q.due));
  const nextDueIdx = dueDates.findIndex(d => d > currentTime);
  const nextQuarter = nextDueIdx >= 0 ? QUARTERS[nextDueIdx] : null;

  const getDaysUntil = (dateStr) => {
    const due = new Date(dateStr);
    const diff = due - currentTime;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Format current date
  const formattedCurrentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl border-2 p-6 shadow-lg flex flex-col h-full" style={{ borderColor: '#FFD300' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1a1a1a' }}>
          <Calendar className="w-5 h-5" style={{ color: '#FFD300' }} />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900">Quarterly Estimated Tax</h2>
          <p className="text-xs text-slate-500">IRS Form 1040-ES • {taxYear}</p>
        </div>
      </div>

      {/* Current Date Display */}
      <div className="bg-gray-50 rounded-lg p-2.5 mb-4 flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs text-slate-600">Today: {formattedCurrentDate}</span>
      </div>

      {/* Inputs */}
      <div className="space-y-3 mb-5">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            Expected Annual Income ({taxYear})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
            <input
              type="text"
              value={income}
              onChange={e => setIncome(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="0"
              className="w-full pl-7 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[50000, 100000, 150000, 200000].map(amount => (
              <button
                key={amount}
                onClick={() => setIncome(amount.toString())}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  annual === amount 
                    ? 'border-yellow-400 bg-yellow-50 text-slate-900 font-semibold' 
                    : 'border-gray-200 text-slate-500 hover:border-gray-300'
                }`}
              >
                {fmt(amount)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {[['single', '👤 Single'], ['married', '👫 Married']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFiling(val)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold border-2 transition-all"
              style={filing === val 
                ? { backgroundColor: '#FFD300', borderColor: '#FFD300', color: '#1a1a1a' } 
                : { borderColor: '#e5e7eb', color: '#4b5563' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2.5">
          <span className="text-xs font-medium text-slate-700">Self-Employed</span>
          <button
            onClick={() => setIsSelfEmployed(!isSelfEmployed)}
            className="w-10 h-5 rounded-full transition-colors relative flex-shrink-0"
            style={{ backgroundColor: isSelfEmployed ? '#FFD300' : '#d1d5db' }}
          >
            <span 
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" 
              style={{ transform: isSelfEmployed ? 'translateX(20px)' : 'translateX(2px)' }}
            />
          </button>
        </div>
      </div>

      {/* Results */}
      {annual > 0 && (
        <div className="space-y-3 flex-1">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-xs">
            {isSelfEmployed && (
              <div className="flex justify-between text-slate-600">
                <span>SE Tax</span>
                <span className="font-semibold">{fmt(seTax)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Federal Income Tax</span>
              <span className="font-semibold">{fmt(fedTax)}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-bold border-t border-gray-200 pt-1.5 text-sm">
              <span>Total Annual Tax</span>
              <span style={{ color: '#b8860b' }}>{fmt(totalTax)}</span>
            </div>
          </div>

          {/* Quarterly Payment */}
          <div className="rounded-lg p-4 text-white" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
            <div className="text-xs text-slate-400 mb-1">Pay Each Quarter</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold" style={{ color: '#FFD300' }}>{fmt(quarterly)}</span>
              <span className="text-xs text-slate-400">/quarter</span>
            </div>
            <div className="flex justify-between text-xs mt-2 pt-2 border-t border-white/20">
              <span className="text-slate-400">Safe Harbor (110%)</span>
              <span className="text-white font-semibold">{fmt(safeHarbor)}</span>
            </div>
          </div>

          {/* Next Due Date */}
          {nextQuarter ? (
            <div className="rounded-lg p-3 border-2 flex items-start gap-2" style={{ backgroundColor: '#fffbe6', borderColor: '#FFD300' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
              <div className="text-xs">
                <div className="font-semibold text-slate-800">
                  Next: {nextQuarter.label}
                </div>
                <div className="text-slate-600 mt-0.5">
                  Due {new Date(nextQuarter.due).toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="font-semibold mt-0.5" style={{ color: '#b8860b' }}>
                  {getDaysUntil(nextQuarter.due)} days remaining
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg p-3 border-2 bg-gray-50 border-gray-200">
              <p className="text-xs text-slate-500 text-center">
                All {taxYear} quarterly payments have passed
              </p>
            </div>
          )}

          {/* Quarterly Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {QUARTERS.map((q, i) => {
              const daysUntil = getDaysUntil(q.due);
              const isPast = daysUntil < 0;
              const isNext = i === nextDueIdx;
              
              return (
                <div
                  key={q.label}
                  className="rounded-lg p-2.5 border-2"
                  style={isNext 
                    ? { backgroundColor: '#fffbe6', borderColor: '#FFD300' } 
                    : { backgroundColor: isPast ? '#f9fafb' : '#ffffff', borderColor: isPast ? '#e5e7eb' : '#e5e7eb' }
                  }
                >
                  <div className="flex justify-between items-start mb-0.5">
                    <span className={`text-xs font-bold ${isPast ? 'text-gray-400' : isNext ? 'text-amber-700' : 'text-slate-600'}`}>
                      {q.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{fmt(quarterly)}</span>
                  </div>
                  <p className="text-xs text-slate-400">{q.months}</p>
                  <p className={`text-xs font-medium mt-0.5 ${
                    isPast ? 'text-red-500' : isNext ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                    {isPast ? '⚠ Past Due' : isNext ? `${daysUntil}d remaining` : `Due ${new Date(q.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Note:</strong> Estimates based on {taxYear} tax brackets. 
              State taxes not included. Due dates adjusted for weekends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}