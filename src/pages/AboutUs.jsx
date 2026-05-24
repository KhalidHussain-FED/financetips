import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Target, Users, Shield, Star, Mail, CheckCircle } from 'lucide-react';

const ABOUT_SECTIONS = [
  {
    id: 'our-story',
    icon: BookOpen,
    title: 'Our Story',
    subtitle: 'Why We Started Finance Ledger Tips',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    imageAlt: 'Professional team working on financial documents and planning',
    content: [
      'Finance Ledger Tips was founded in 2024 with a simple mission: to make financial knowledge accessible to everyone. We recognized that most small business owners, freelancers, and individuals struggle with accounting, payroll, taxes, and bookkeeping — not because they lack intelligence, but because available resources are often too technical, expensive, or hidden behind paywalls.',
      'Our team brings together certified accountants, payroll specialists, tax professionals, and experienced financial writers who share a common goal: creating practical, accurate, and easy-to-understand guides that anyone can use. We believe that financial literacy is not a privilege — it\'s a fundamental right that empowers people to make better decisions for their businesses and personal lives.',
      'Every article on our platform is thoroughly researched, fact-checked, and written in plain English. We avoid jargon, break down complex topics into digestible steps, and provide real-world examples that our readers can apply immediately.'
    ]
  },
  {
    id: 'our-mission',
    icon: Target,
    title: 'Our Mission',
    subtitle: 'Making Financial Knowledge Accessible to Everyone',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    imageAlt: 'Small business owner reviewing financial reports and planning',
    content: [
      'Our mission is to democratize financial education by providing free, high-quality content on the topics that matter most to real people running real businesses. We are committed to publishing well-researched articles, guides, and resources that help our readers navigate the complexities of business finance with confidence.',
      'We focus on five core areas: Accounting (financial statements, reconciliations, reporting), Payroll (processing, deductions, compliance), Taxes (planning, filing, deductions), Bookkeeping (record-keeping, best practices), and Financial Planning (budgeting, cash flow, long-term strategy).',
      'Whether you\'re a freelancer managing self-employment taxes for the first time, a small business owner setting up payroll, or an entrepreneur planning for growth, Finance Ledger Tips is here to support your journey with reliable, actionable information.'
    ]
  },
  {
    id: 'who-we-serve',
    icon: Users,
    title: 'Who We Serve',
    subtitle: 'Built for Small Business Owners, Freelancers & Entrepreneurs',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    imageAlt: 'Diverse group of business professionals collaborating in a modern office',
    content: [
      'Our readers are the backbone of the American economy — small business owners, freelancers, independent contractors, and entrepreneurs who wear multiple hats every day. They come to Finance Ledger Tips seeking practical guidance they can trust, without the high costs of professional consultation.',
      'We serve a diverse community that includes: startup founders learning to manage their first business finances, established small business owners optimizing their payroll and tax strategies, freelance professionals navigating quarterly estimated taxes, bookkeepers seeking best practices and industry updates, and individuals planning for long-term financial health.',
      'Every piece of content we create is designed with these readers in mind — practical, actionable, and written for people who need to make informed financial decisions today, not just understand abstract concepts.'
    ]
  },
  {
    id: 'our-values',
    icon: Shield,
    title: 'Our Values',
    subtitle: 'Trust, Accuracy & Transparency',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    imageAlt: 'Professional reviewing documents for accuracy and quality assurance',
    content: [
      'Trust is the foundation of everything we do at Finance Ledger Tips. We understand that financial information carries significant responsibility, which is why we maintain rigorous editorial standards for every article we publish.',
      'Our content is independently researched and written by qualified professionals. We clearly distinguish between editorial content and any sponsored or affiliate partnerships. When we recommend tools, services, or strategies, it\'s because we genuinely believe they provide value to our readers.',
      'We are committed to transparency in all our operations. Our editorial process, content policies, and any potential conflicts of interest are openly disclosed. If we ever make an error, we correct it promptly and transparently.'
    ]
  },
  {
    id: 'what-we-cover',
    icon: Star,
    title: 'Topics We Cover',
    subtitle: 'Comprehensive Coverage of Small Business Finance',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop',
    imageAlt: 'Financial planning workspace with calculator and documents',
    content: [
      'Our content library spans the full spectrum of small business finance, organized into five main categories:',
      '• Accounting: Financial statements, chart of accounts, reconciliations, financial reporting, and accounting software guides.',
      '• Payroll: Employee classification, payroll processing, deductions, compliance requirements, and payroll service comparisons.',
      '• Taxes: Tax planning strategies, filing requirements, deductions and credits, IRS guidelines, and state-specific tax information.',
      '• Bookkeeping: Record-keeping systems, receipt management, ledger maintenance, and bookkeeping best practices.',
      '• Financial Planning: Budgeting strategies, cash flow management, business financial planning, and long-term wealth building.',
      'We publish new articles regularly and update existing content to ensure it remains accurate and relevant as regulations and best practices evolve.'
    ]
  }
];

const WHY_TRUST_US = [
  {
    title: 'Expert Writers',
    description: 'Our content is created by certified accountants, tax professionals, and experienced financial writers.',
    icon: CheckCircle
  },
  {
    title: 'Thorough Research',
    description: 'Every article is fact-checked and reviewed for accuracy before publication.',
    icon: CheckCircle
  },
  {
    title: 'Regular Updates',
    description: 'We continuously update our content to reflect the latest regulations and best practices.',
    icon: CheckCircle
  },
  {
    title: 'Reader-First Approach',
    description: 'We write for real people, not academics. Clear language, practical examples, actionable advice.',
    icon: CheckCircle
  }
];

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          About Finance Ledger Tips
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Your trusted resource for practical financial guidance. We help small business owners, freelancers, and entrepreneurs across the United States navigate accounting, payroll, taxes, and bookkeeping with confidence.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-16 mb-16">
        {ABOUT_SECTIONS.map((section, index) => {
          const Icon = section.icon;
          const isEven = index % 2 === 0;
          
          return (
            <section key={section.id} className="scroll-mt-20">
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center`}>
                {/* Image Side */}
                <div className={`${!isEven ? 'md:order-2' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-slate-100 aspect-[4/3]">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-slate-100', 'to-slate-200');
                        const placeholder = document.createElement('div');
                        placeholder.className = 'text-center p-8';
                        placeholder.innerHTML = `
                          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center">
                            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p class="text-sm text-slate-500">${section.imageAlt}</p>
                        `;
                        parent.appendChild(placeholder);
                      }}
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${!isEven ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">
                      {section.title}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    {section.subtitle}
                  </h2>
                  
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-slate-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Why Trust Us Section */}
      <div className="bg-gradient-to-br from-slate-50 to-yellow-50 rounded-2xl p-8 sm:p-12 mb-16">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">
            Why Trust Finance Ledger Tips?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We take our responsibility seriously. Here's what sets us apart and why thousands of readers rely on our content.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_TRUST_US.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <ItemIcon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-white mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you. Our team reads every message and typically responds within 2-3 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@financeledgertips.com"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@financeledgertips.com
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              Contact Form
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-yellow-400 rounded-2xl p-8 sm:p-12">
        <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">
          Ready to Master Your Finances?
        </h2>
        <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
          Browse our free library of expert-written guides on Accounting, Payroll, Taxes, Bookkeeping, and Financial Planning.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/tax-calculators"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Try Our Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Finance Ledger Tips</strong> — Practical Financial Guidance for Small Businesses Across the USA
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Content is for informational and educational purposes only. Not professional financial, tax, or legal advice.
            </p>
          </div>
          <Link
            to="/disclaimer"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium whitespace-nowrap"
          >
            Read Full Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}