// src/pages/CategoryPage.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronRight } from 'lucide-react';

import { base44 } from '@/api/base44Client';
import PostCard from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO/SEO';

const CATEGORY_MAP = {
  '/accounting': 'Accounting',
  '/payroll': 'Payroll',
  '/taxes': 'Taxes',
  '/bookkeeping': 'Bookkeeping',
  '/financial-planning': 'Financial Planning',
};

export default function CategoryPage() {
  const { pathname } = useLocation();
  const category = CATEGORY_MAP[pathname];
  const slug = pathname.replace('/', '');

  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-cat', category],
    queryFn: () =>
      base44.entities.BlogPost.filter(
        { status: 'published', category },
        '-created_date',
        100
      ),
    enabled: !!category,
  });

  const filtered = posts.filter((post) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;

    return (
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      (post.tags && post.tags.toLowerCase().includes(q))
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputVal.trim());
  };

  if (!category) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Category Not Found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            style={{ color: '#b8a000' }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO pageType="category" slug={slug} />

      <div className="bg-gray-50 min-h-screen">
        {/* HERO */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
              <ChevronRight size={14} />
              <span className="text-black font-medium">{category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {category} Articles
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              Explore the latest guides, tips, and insights about {category.toLowerCase()}.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={`Search ${category} articles...`}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[420px] rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">No Articles Found</h2>
              <p className="text-gray-600">Try a different search term.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-sm text-gray-500">
                Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}