import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import PostCard from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO/SEO';     // ← Import SEO

const CATEGORY_MAP = {
  '/accounting': 'Accounting',
  '/payroll': 'Payroll',
  '/taxes': 'Taxes',
  '/bookkeeping': 'Bookkeeping',
  '/financial-planning': 'Financial Planning',
};

const CATEGORY_DESC = { /* ... your existing descriptions */ };

const CAT_ICONS = { /* ... your existing icons */ };

export default function CategoryPage() {
  const { pathname } = useLocation();
  const category = CATEGORY_MAP[pathname];
  
  // Extract slug from pathname (e.g., "accounting")
  const slug = pathname.replace('/', '');   // "accounting", "payroll", etc.

  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-cat', category],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published', category }, '-created_date', 100),
    enabled: !!category,
  });

  const filtered = posts.filter(post => {
    const q = search.toLowerCase();
    return !q || post.title?.toLowerCase().includes(q) || post.excerpt?.toLowerCase().includes(q) || post.tags?.toLowerCase().includes(q);
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  if (!category) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-heading text-2xl font-bold mb-3 text-slate-800">Category Not Found</p>
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: '#b8a000' }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Component - Added Here */}
      <SEO pageType="category" slug={slug} />

      <div className="bg-gray-50 min-h-screen">
        {/* Page hero */}
        <div className="relative text-white py-14 sm:py-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
            alt={category}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(10,20,40,0.72)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <nav className="text-xs text-slate-400 mb-5 flex items-center gap-1">
              <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blog" className="hover:text-yellow-300 transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-300">{category}</span>
            </nav>
            <div className="text-3xl mb-3">{CAT_ICONS[category]}</div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">{category}</h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">{CATEGORY_DESC[category]}</p>
          </div>
        </div>

        {/* Rest of your content remains the same */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center border border-gray-200 rounded-full overflow-hidden mb-8 shadow-sm bg-white max-w-lg">
            <Search className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={`Search ${category} articles...`}
              className="flex-1 px-3 py-3 text-sm outline-none bg-transparent text-slate-800"
            />
            <button type="submit" className="px-6 py-3 text-sm font-bold transition-colors rounded-full text-slate-900 hover:opacity-90" style={{ backgroundColor: '#FFD300' }}>
              Search
            </button>
          </form>

          {/* Results count */}
          {!isLoading && (
            <p className="text-xs text-slate-500 mb-6 font-medium">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="text-center py-24 text-slate-400 bg-white rounded-xl border border-gray-100">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
              <p className="font-heading text-lg font-bold mb-2 text-slate-600">No articles found</p>
              <p className="text-sm">Try a different search term or check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}