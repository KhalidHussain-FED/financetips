import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import PostCard from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, BookOpen } from 'lucide-react';

const CATEGORIES = ['All', 'Accounting', 'Payroll', 'Taxes', 'Bookkeeping', 'Financial Planning'];

export default function Blog() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('cat') || 'All');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const cat = searchParams.get('cat');
    const q = searchParams.get('q');
    if (cat) setCategory(cat);
    if (q) { setSearch(q); setInputVal(q); }
  }, [searchParams]);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date', 100),
  });

  const filtered = posts.filter(post => {
    const catMatch = category === 'All' || post.category === category;
    const q = search.toLowerCase();
    const searchMatch = !q || post.title?.toLowerCase().includes(q) || post.excerpt?.toLowerCase().includes(q) || post.tags?.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-1">Articles & Guides</h1>
        <p className="text-muted-foreground text-sm">Practical financial knowledge — Accounting, Payroll, Taxes, Bookkeeping and more.</p>
      </div>

      {/* Search bar (top, prominent) */}
      <form onSubmit={handleSearch} className="flex items-center border border-border rounded overflow-hidden mb-6 shadow-sm bg-white max-w-xl">
        <Search className="w-4 h-4 text-muted-foreground ml-3 flex-shrink-0" />
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Search articles by keyword, topic, or tag..."
          className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
        />
        <button type="submit" className="px-5 py-2.5 text-sm font-semibold transition-colors text-slate-900 hover:opacity-90" style={{ backgroundColor: '#FFD300' }}>
          Search
        </button>
      </form>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              category === cat
                ? 'border-yellow-400 text-slate-900'
                : 'bg-white text-slate-500 border-gray-200 hover:border-yellow-400 hover:text-slate-900'
            }`}
            style={category === cat ? { backgroundColor: '#FFD300' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground mb-5">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
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
        <div className="text-center py-24 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
          <p className="font-heading text-lg font-bold mb-2">No articles found</p>
          <p className="text-sm">Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
}