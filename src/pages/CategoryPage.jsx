import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import PostCard from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronRight } from 'lucide-react';

// ✅ FIXED IMPORT (THIS WAS YOUR ERROR)
import SEO from '../components/SEO/SEO';

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

  const filtered = posts.filter(post => {
    const q = search.toLowerCase();
    return (
      !q ||
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      post.tags?.toLowerCase().includes(q)
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  if (!category) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-heading text-2xl font-bold mb-3 text-slate-800">
            Category Not Found
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
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
      {/* SEO */}
      <SEO pageType="category" slug={slug} />

      <div className="bg-gray-50 min-h-screen">
        {/* rest of your code stays SAME */}
      </div>
    </>
  );
}