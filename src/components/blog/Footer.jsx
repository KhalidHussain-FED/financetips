import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Mail, MapPin } from 'lucide-react';

const TOPIC_LINKS = [
  { label: 'Accounting', href: '/accounting' },
  { label: 'Payroll', href: '/payroll' },
  { label: 'Taxes', href: '/taxes' },
  { label: 'Bookkeeping', href: '/bookkeeping' },
  { label: 'Financial Planning', href: '/financial-planning' },
];

export default function Footer({ isAdmin }) {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <footer className="mt-16" style={{ backgroundColor: '#1a1a1a', color: '#ccc' }}>
      {/* Yellow top bar */}
      <div className="py-3 text-center text-sm font-bold text-slate-900" style={{ backgroundColor: '#FFD300' }}>
        🇺🇸 Practical Financial Guidance for Every US Small Business Owner
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFD300' }}>
                <TrendingUp className="w-5 h-5 text-slate-900" />
              </div>
              <div className="leading-tight">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-white font-bold text-lg">Finance</span>
                  <span className="font-heading font-bold text-lg" style={{ color: '#FFD300' }}>Ledger</span>
                  <span className="font-heading text-slate-400 font-semibold">Tips</span>
                </div>
                <span className="text-[9px] text-slate-500 tracking-widest uppercase">USA Financial Resources</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
              Your trusted source for practical guidance on Accounting, Payroll, Taxes, and Bookkeeping — helping small businesses and individuals across the United States manage their finances with confidence.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" style={{ color: '#FFD300' }} /> info@financeledgertips.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" style={{ color: '#FFD300' }} /> United States</div>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FFD300' }}>Topics</h4>
            <div className="space-y-2.5">
              {TOPIC_LINKS.map(({ label, href }) => (
                <Link key={label} to={href} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FFD300' }}>Quick Links</h4>
            <div className="space-y-2.5 mb-6">
              <Link to="/" className="block text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link to="/blog" className="block text-sm text-slate-400 hover:text-white transition-colors">Blogs</Link>
              <Link to="/tax-calculators" className="block text-sm text-slate-400 hover:text-white transition-colors">Tax Calculators</Link>
              <Link to="/about" className="block text-sm text-slate-400 hover:text-white transition-colors">About Us</Link>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FFD300' }}>Legal</h4>
            <div className="space-y-2.5">
              <Link to="/privacy-policy" className="block text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="block text-sm text-slate-400 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/disclaimer" className="block text-sm text-slate-400 hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Admin section: Checkbox OR New Post button */}
        {isAdmin && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            {!showNewPost ? (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showNewPost}
                  onChange={(e) => setShowNewPost(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: '#FFD300' }}
                />
                <span className="text-xs font-semibold text-slate-400">New Post</span>
              </label>
            ) : (
              <Link 
                to="/admin" 
                className="inline-block px-4 py-2 text-sm font-bold rounded-md shadow-sm transition-colors hover:opacity-90" 
                style={{ backgroundColor: '#FFD300', color: '#1a1a1a' }}
              >
                + New Post
              </Link>
            )}
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Finance Ledger Tips. All rights reserved.</p>
          <p>For educational purposes only. Not professional financial or legal advice.</p>
        </div>
      </div>
    </footer>
  );
}