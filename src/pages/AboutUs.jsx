import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, Target, Users, Shield, Mail } from 'lucide-react';

const ABOUT_CARDS = [
  {
    category: 'Our Story',
    catColor: 'bg-blue-100 text-blue-800',
    title: 'Why We Started Finance Ledger Tips',
    excerpt: 'Most people running small businesses struggle with accounting, payroll, taxes, and bookkeeping — yet the available resources are too technical, too expensive, or buried behind paywalls. We set out to change that.',
    content: 'Our team brings together certified accountants, payroll specialists, and experienced financial writers to create guides that are practical, accurate, and easy to understand — without heavy professional fees. Whether you\'re processing payroll for the first time, understanding your tax obligations as a freelancer, or just trying to keep your books organized, Finance Ledger Tips is here to help.',
    read_time: 2,
    author_name: 'Finance Ledger Editorial Team',
  },
  {
    category: 'Our Mission',
    catColor: 'bg-teal-100 text-teal-800',
    title: 'Making Financial Knowledge Accessible to Everyone',
    excerpt: 'We believe every small business owner and individual deserves access to clear, accurate financial guidance — in plain, jargon-free English.',
    content: 'Finance Ledger Tips was built on a single principle: financial literacy should not be a privilege. Our mission is to democratize financial knowledge by publishing free, well-researched content on the topics that matter most to real people running real businesses.',
    read_time: 2,
    author_name: 'Finance Ledger Editorial Team',
  },
  {
    category: 'Who We Serve',
    catColor: 'bg-green-100 text-green-800',
    title: 'Built for Small Business Owners, Freelancers & Entrepreneurs',
    excerpt: 'We write for the people who wear every hat in their business — including CFO. No jargon, no fluff, just practical financial knowledge you can apply today.',
    content: 'Our readers include freelancers managing self-employment taxes, small business owners learning payroll for the first time, bookkeepers looking for best practices, and entrepreneurs planning for long-term financial health. Every article we publish is designed with these readers in mind.',
    read_time: 3,
    author_name: 'Finance Ledger Editorial Team',
  },
  {
    category: 'Our Promise',
    catColor: 'bg-purple-100 text-purple-800',
    title: 'Honest, Well-Researched Content You Can Trust',
    excerpt: 'We never recommend products we do not believe in, and we always disclose when content is sponsored or contains affiliate links. Your trust is our most valuable asset.',
    content: 'Every article on Finance Ledger Tips is reviewed for accuracy before publication. We maintain strict editorial standards and clearly separate sponsored content from independent editorial content. When we link to external resources, we only link to sources we\'d use ourselves.',
    read_time: 2,
    author_name: 'Finance Ledger Editorial Team',
  },
  {
    category: 'Topics We Cover',
    catColor: 'bg-orange-100 text-orange-800',
    title: 'Accounting, Payroll, Taxes, Bookkeeping & Financial Planning',
    excerpt: 'From chart of accounts to quarterly tax estimates, our library covers the full spectrum of small business finance in practical, step-by-step guides.',
    content: 'Our content spans five core areas: Accounting (financial statements, reconciliations, reporting), Payroll (processing, deductions, compliance), Taxes (planning, filing, deductions, IRS tips), Bookkeeping (record-keeping, ledgers, receipts), and Financial Planning (budgeting, cash flow, long-term health). New articles are published regularly.',
    read_time: 3,
    author_name: 'Finance Ledger Editorial Team',
  },
  {
    category: 'Contact Us',
    catColor: 'bg-rose-100 text-rose-800',
    title: 'Get in Touch with the Finance Ledger Team',
    excerpt: 'Have a question, topic suggestion, or partnership inquiry? We\'d love to hear from you. Our editorial team reads every message.',
    content: 'You can reach us at contact@financeLedgertips.com. We welcome article suggestions, corrections, and collaboration inquiries. For advertising or sponsored content opportunities, please mention that in your subject line. We typically respond within 2–3 business days.',
    read_time: 1,
    author_name: 'Finance Ledger Editorial Team',
  },
];

const CAT_COLORS = {
  'Our Story': 'bg-blue-100 text-blue-800',
  'Our Mission': 'bg-teal-100 text-teal-800',
  'Who We Serve': 'bg-green-100 text-green-800',
  'Our Promise': 'bg-purple-100 text-purple-800',
  'Topics We Cover': 'bg-orange-100 text-orange-800',
  'Contact Us': 'bg-rose-100 text-rose-800',
};

function AboutCard({ card, featured = false }) {
  const catColor = CAT_COLORS[card.category] || 'bg-gray-100 text-gray-700';

  if (featured) {
    return (
      <article className="grid md:grid-cols-5 gap-0 rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="md:col-span-3 aspect-[16/9] md:aspect-auto overflow-hidden bg-gradient-to-br from-primary to-blue-900 min-h-[240px] flex items-center justify-center">
          <div className="text-center text-white px-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-60" />
            <span className="font-heading text-4xl font-bold opacity-20">FL</span>
          </div>
        </div>
        <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center bg-white">
          <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold mb-3 w-fit ${catColor}`}>
            {card.category}
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground leading-tight mb-3">
            {card.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{card.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
            <span>{card.author_name}</span>
            {card.read_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{card.read_time} min</span>}
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed border-t border-border pt-4">{card.content}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <span className="text-3xl font-heading font-bold text-muted-foreground/20">FL</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 w-fit ${catColor}`}>
          {card.category}
        </span>
        <h3 className="font-heading text-base font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {card.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">{card.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {card.read_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{card.read_time} min read</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AboutUs() {
  const [featured, ...rest] = ABOUT_CARDS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-1">About Finance Ledger Tips</h1>
        <p className="text-muted-foreground text-sm">Learn who we are, what we stand for, and why we're dedicated to making financial knowledge accessible to everyone.</p>
      </div>

      {/* Featured card */}
      <div className="mb-8">
        <AboutCard card={featured} featured />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {rest.map(card => (
          <AboutCard key={card.category} card={card} />
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-800 rounded-xl p-8 text-white text-center">
        <h2 className="font-heading text-2xl font-bold mb-2">Ready to Master Your Finances?</h2>
        <p className="text-blue-100 text-sm mb-5">Browse our free library of guides on Accounting, Payroll, Taxes, and Bookkeeping.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded font-semibold text-sm hover:bg-blue-50 transition-colors">
          Browse All Articles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center mt-8">
        Content on Finance Ledger Tips is for informational purposes only and does not constitute professional financial, tax, or legal advice.{' '}
        <Link to="/disclaimer" className="underline hover:text-foreground">Read full disclaimer</Link>
      </p>
    </div>
  );
}