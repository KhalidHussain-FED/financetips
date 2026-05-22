import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import PostCard from '@/components/blog/PostCard';
import { ArrowRight, Calculator, DollarSign, FileText, BookOpen, Search, TrendingUp, Shield, Users, Star, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const SERVICES = [
  { icon: Calculator, label: 'Accounting', desc: 'Financial statements, reconciliations, and reporting for US businesses.', href: '/accounting', color: 'border-yellow-300 hover:border-yellow-500', icon_bg: 'bg-yellow-500' },
  { icon: DollarSign, label: 'Payroll', desc: 'US payroll processing, W-2s, 1099s, and compliance guides.', href: '/payroll', color: 'border-green-200 hover:border-green-400', icon_bg: 'bg-green-600' },
  { icon: FileText, label: 'Taxes', desc: 'IRS filing, deductions, quarterly estimates, and tax strategy.', href: '/taxes', color: 'border-orange-200 hover:border-orange-400', icon_bg: 'bg-orange-500' },
  { icon: BookOpen, label: 'Bookkeeping', desc: 'Record-keeping, ledgers, and financial organization basics.', href: '/bookkeeping', color: 'border-purple-200 hover:border-purple-400', icon_bg: 'bg-purple-600' },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'IRS Compliant Tips' },
  { icon: Users, label: 'For US Small Businesses' },
  { icon: TrendingUp, label: 'Expert-Reviewed Content' },
  { icon: Star, label: 'Plain-English Guidance' },
];

const ANIMATED_WORDS = ['Accounting', 'Taxes', 'Bookkeeping', 'Payroll'];

const FAQS = [
  {
    question: 'What topics does Finance Ledger Tips cover?',
    answer: 'We cover Accounting, Payroll, Taxes, Bookkeeping, and Financial Planning. Our guides are written specifically for US small business owners, freelancers, and individuals who need practical, easy-to-understand financial information.',
  },
  {
    question: 'Is the information on Finance Ledger Tips free?',
    answer: 'Yes! All our articles, guides, and tax calculators are completely free. We believe financial knowledge should be accessible to everyone. No paywalls, no subscriptions — just practical financial guidance.',
  },
  {
    question: 'Who writes the content on Finance Ledger Tips?',
    answer: 'Our content is created by certified accountants, payroll specialists, tax professionals, and experienced financial writers. Every article is reviewed for accuracy before publication to ensure you get reliable information.',
  },
  {
    question: 'Can I use your tax calculators for filing?',
    answer: 'Our calculators provide estimates for educational purposes. While they use current IRS brackets and rates, they should not replace professional tax advice. Always consult a licensed CPA or tax professional for your specific situation.',
  },
  {
    question: 'How often do you publish new articles?',
    answer: 'We publish new articles regularly, covering timely topics like tax season preparation, payroll deadlines, and financial planning strategies. Check our blog or subscribe to stay updated.',
  },
  {
    question: 'Do you offer personalized financial advice?',
    answer: 'We provide general educational content, not personalized advice. For specific tax, accounting, or financial planning needs, we recommend consulting with a qualified professional who can review your individual circumstances.',
  },
  {
    question: 'How can I suggest a topic or article?',
    answer: 'We love hearing from our readers! You can suggest topics through our Contact Us page. Our editorial team reviews all suggestions and considers them for future content.',
  },
  {
    question: 'Is Finance Ledger Tips only for US businesses?',
    answer: 'Yes, our content focuses on US tax laws, IRS regulations, and financial practices relevant to American small businesses and individuals. International readers may find some concepts useful, but the specifics apply to the US.',
  },
];

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
      >
        <span className="text-sm font-semibold text-slate-800 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-xs text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function AnimatedHeading() {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ANIMATED_WORDS.length);
        setFade(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 max-w-4xl mx-auto text-white">
      Expert Guidance on<br />
      <span
        style={{
          color: '#FFD300',
          display: 'inline-block',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {ANIMATED_WORDS[wordIndex]}
      </span>
      {' '}& Finance
    </h1>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['home-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date', 7),
  });

  const featured = posts[0];
  const recent = posts.slice(1, 7);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/blog?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div style={{ backgroundColor: '#FEFDF4' }}>
      {/* Hero with banner image */}
      <section className="relative text-white py-20 sm:py-28 overflow-hidden" style={{ minHeight: 480 }}>
        {/* Banner image */}
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          alt="Finance banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,20,40,0.70)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-yellow-400/60 text-yellow-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase" style={{ backgroundColor: 'rgba(255,211,0,0.12)' }}>
            🇺🇸 Trusted by US Small Business Owners
          </div>
          <AnimatedHeading />
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Practical, plain-English articles to help American small businesses and individuals master their finances — from IRS filings to payroll compliance.
          </p>
          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex items-center bg-white rounded-full overflow-hidden shadow-2xl">
            <Search className="w-5 h-5 text-slate-400 ml-5 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles, tax tips, payroll guides..."
              className="flex-1 px-4 py-3.5 text-slate-800 text-sm outline-none bg-transparent"
            />
            <button type="submit" className="text-slate-900 px-7 py-3.5 text-sm font-bold hover:opacity-90 transition-colors rounded-full" style={{ backgroundColor: '#FFD300' }}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-yellow-200" style={{ backgroundColor: '#FFD300' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-900 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-slate-800" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="border-b border-gray-200" style={{ backgroundColor: '#FEFDF4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Browse by Topic</h2>
            <p className="text-slate-500 text-sm">Explore our comprehensive guides across key financial areas</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ icon: Icon, label, desc, href, color, icon_bg }) => (
              <Link key={label} to={href} className={`group rounded-xl border-2 bg-white p-6 hover:shadow-lg transition-all duration-200 ${color}`}>
                <div className={`w-11 h-11 rounded-lg ${icon_bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5">{label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                <div className="mt-3 flex items-center text-xs font-semibold gap-1 transition-all" style={{ color: '#b8a000' }}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-72 w-full rounded-xl" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-72 rounded-lg" />)}
            </div>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <span className="h-1 w-10 rounded-full inline-block" style={{ backgroundColor: '#FFD300' }} />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Featured Article</h2>
                </div>
                <PostCard post={featured} featured />
              </div>
            )}

            {recent.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-10 rounded-full inline-block" style={{ backgroundColor: '#FFD300' }} />
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Latest Articles</h2>
                  </div>
                  <Link to="/blog" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: '#b8a000' }}>
                    View All Blogs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recent.map(post => <PostCard key={post.id} post={post} />)}
                </div>
              </>
            )}

            {posts.length === 0 && (
              <div className="text-center py-24 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-heading text-xl font-bold mb-2">No articles published yet</p>
                <p className="text-sm">Check back soon for financial insights.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-200" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
              <HelpCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm">
              Find answers to common questions about Finance Ledger Tips
            </p>
          </div>

          <div className="bg-white rounded-xl border-2 shadow-sm" style={{ borderColor: '#FFD300' }}>
            {FAQS.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 mb-3">
              Still have questions? We're here to help!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#FFD300', color: '#1a1a1a' }}
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-slate-900 py-16" style={{ backgroundColor: '#FFD300' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-slate-700 text-base mb-8 leading-relaxed">
            Explore hundreds of articles on Accounting, Payroll, Taxes, and Bookkeeping — all written specifically for US small business owners.
          </p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
            Browse All Blogs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}