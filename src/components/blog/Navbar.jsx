import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOPICS = [
  { label: 'Accounting', href: '/accounting' },
  { label: 'Payroll', href: '/payroll' },
  { label: 'Taxes', href: '/taxes' },
  { label: 'Bookkeeping', href: '/bookkeeping' },
  { label: 'Financial Planning', href: '/financial-planning' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const { pathname } = useLocation();

  const activeStyle = { backgroundColor: '#FFD300', color: '#1a1a1a' };
  const hoverClass = "text-slate-800 hover:bg-yellow-100 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#FFD300' }}>
      {/* Top strip - Black with white text */}
      <div className="bg-black text-white text-xs py-1.5 text-center tracking-wider font-semibold">
        🇺🇸 Trusted Financial Guidance for Small Businesses Across the USA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-colors" style={{ backgroundColor: '#1a1a1a' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#FFD300' }} />
            </div>
            <div className="leading-tight">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-slate-900 font-bold text-lg tracking-tight">Finance</span>
                <span className="font-heading font-bold text-lg tracking-tight" style={{ color: '#5a4a00' }}>Ledger</span>
                <span className="font-heading text-slate-700 font-semibold text-base">Tips</span>
              </div>
              <span className="text-[9px] text-slate-600 tracking-widest uppercase">USA Financial Resources</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* 1. Home */}
            <Link
              to="/"
              className={cn("px-3.5 py-2 text-sm font-semibold rounded-md transition-all", pathname === '/' ? "" : hoverClass)}
              style={pathname === '/' ? activeStyle : {}}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <Link
              to="/about"
              className={cn("px-3.5 py-2 text-sm font-semibold rounded-md transition-all", pathname === '/about' ? "" : hoverClass)}
              style={pathname === '/about' ? activeStyle : {}}
            >
              About Us
            </Link>

            {/* 3. Topics dropdown */}
            <div className="relative" onMouseEnter={() => setTopicsOpen(true)} onMouseLeave={() => setTopicsOpen(false)}>
              <button
                className={cn("flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-md transition-all", TOPICS.some(t => t.href === pathname) ? "" : hoverClass)}
                style={TOPICS.some(t => t.href === pathname) ? activeStyle : {}}
              >
                Topics <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", topicsOpen && "rotate-180")} />
              </button>
              {topicsOpen && (
                <div className="absolute top-full left-0 mt-0 w-52 border rounded-lg shadow-xl py-1.5 z-50" style={{ backgroundColor: '#fff9e6', borderColor: '#e6be00' }}>
                  {TOPICS.map(({ label, href }) => (
                    <Link
                      key={label}
                      to={href}
                      className="block px-4 py-2 text-sm transition-colors text-slate-700 hover:bg-yellow-100 hover:text-slate-900 font-medium"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Blogs */}
            <Link
              to="/blog"
              className={cn("px-3.5 py-2 text-sm font-semibold rounded-md transition-all", pathname === '/blog' ? "" : hoverClass)}
              style={pathname === '/blog' ? activeStyle : {}}
            >
              Blogs
            </Link>

            {/* 5. Calculators */}
            <Link
              to="/tax-calculators"
              className={cn("px-3.5 py-2 text-sm font-semibold rounded-md transition-all", pathname === '/tax-calculators' ? "" : hoverClass)}
              style={pathname === '/tax-calculators' ? activeStyle : {}}
            >
              🧾 Calculators
            </Link>

            {/* 6. Contact Us */}
            <Link
              to="/contact"
              className={cn("px-3.5 py-2 text-sm font-semibold rounded-md transition-all", pathname === '/contact' ? "" : hoverClass)}
              style={pathname === '/contact' ? activeStyle : {}}
            >
              📧 Contact Us
            </Link>
          </nav>

          <button className="lg:hidden p-2 text-slate-800" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden border-t border-yellow-400 py-3 space-y-0.5 pb-4">
            {/* 1. Home */}
            <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors">Home</Link>
            
            {/* 2. About Us */}
            <Link to="/about" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors">About Us</Link>
            
            {/* 3. Topics */}
            {TOPICS.map(({ label, href }) => (
              <Link key={label} to={href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors pl-5">
                {label}
              </Link>
            ))}
            
            {/* 4. Blogs */}
            <Link to="/blog" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors">Blogs</Link>
            
            {/* 5. Calculators */}
            <Link to="/tax-calculators" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors">🧾 Tax Calculators</Link>
            
            {/* 6. Contact Us */}
            <Link to="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-yellow-200 rounded-md transition-colors">📧 Contact Us</Link>
          </nav>
        )}
      </div>
    </header>
  );
}