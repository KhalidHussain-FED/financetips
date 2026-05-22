import React from 'react';
import { Link } from 'react-router-dom';
import SelfEmploymentTaxCalc from '@/components/calculators/SelfEmploymentTaxCalc';
import FederalIncomeTaxCalc from '@/components/calculators/FederalIncomeTaxCalc';
import QuarterlyTaxCalc from '@/components/calculators/QuarterlyTaxCalc';
import { ChevronRight } from 'lucide-react';

export default function TaxCalculators() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFDF4' }}>
      {/* Hero with banner image */}
      <div className="relative text-white py-14 sm:py-20 overflow-hidden" style={{ minHeight: 280 }}>
        <img
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1600&q=80"
          alt="Tax calculator banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,20,40,0.75)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="text-xs text-slate-300 mb-5 flex items-center gap-1">
            <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: '#FFD300' }}>Tax Calculators</span>
          </nav>
          <div className="text-3xl mb-3">🧾</div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Free {new Date().getFullYear()} US Tax Calculators<br />
            <span style={{ color: '#FFD300' }}>For Self-Employed & Small Businesses</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Instantly estimate your Self-Employment Tax, Federal Income Tax, and Quarterly Estimated Payments — powered by real {new Date().getFullYear()} IRS brackets and rates.
          </p>
        </div>
      </div>

      {/* Calculators - 2 per row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Row 1: Self Employment + Federal Income Tax */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <SelfEmploymentTaxCalc />
          <FederalIncomeTaxCalc />
        </div>
        
        {/* Row 2: Quarterly Tax + Additional Info/CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuarterlyTaxCalc />
          
          {/* Additional Info Card */}
          <div className="bg-white rounded-xl border-2 p-6 shadow-lg flex flex-col justify-center" style={{ borderColor: '#FFD300' }}>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                Need More Help?
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Our calculators provide estimates, but every tax situation is unique. 
                Explore our guides for detailed explanations of tax rules, deductions, and strategies.
              </p>
              <div className="space-y-3">
                <Link
                  to="/blog"
                  className="block w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: '#FFD300', color: '#1a1a1a' }}
                >
                  📝 Browse Tax Guides
                </Link>
                <Link
                  to="/taxes"
                  className="block w-full py-3 rounded-lg text-sm font-semibold border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#FFD300', color: '#1a1a1a' }}
                >
                  🧾 Tax Resources
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">15.3%</div>
                    <div className="text-xs text-slate-500">SE Tax Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">$14.6K</div>
                    <div className="text-xs text-slate-500">Std Deduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">4x</div>
                    <div className="text-xs text-slate-500">Quarterly Payments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-300 rounded-xl p-5 text-sm text-amber-900">
          <strong>⚠️ Disclaimer:</strong> These calculators provide estimates for educational purposes only based on {new Date().getFullYear()} IRS rates. They do not account for all deductions, credits, or state taxes. Consult a licensed CPA or tax professional for advice specific to your situation.
        </div>
      </div>
    </div>
  );
}