import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, Share2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const CAT_COLORS = {
  Accounting: 'bg-blue-100 text-blue-800',
  Payroll: 'bg-green-100 text-green-800',
  Taxes: 'bg-orange-100 text-orange-800',
  Bookkeeping: 'bg-purple-100 text-purple-800',
  'Financial Planning': 'bg-teal-100 text-teal-800',
  Outreach: 'bg-rose-100 text-rose-800',
};

const CAT_SLUG = {
  Accounting: '/accounting',
  Payroll: '/payroll',
  Taxes: '/taxes',
  Bookkeeping: '/bookkeeping',
  'Financial Planning': '/financial-planning',
};

export default function BlogPostDetail() {
  const slug = window.location.pathname.split('/blog/')[1];

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const bySlug = await base44.entities.BlogPost.filter({ slug, status: 'published' });
      if (bySlug.length > 0) return bySlug[0];
      const all = await base44.entities.BlogPost.filter({ status: 'published' });
      return all.find(p => p.id === slug) || null;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-5 w-56" />
          <Skeleton className="aspect-video rounded-xl" />
          <div className="space-y-3 mt-6">
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-heading text-2xl font-bold mb-3 text-slate-800">Article Not Found</p>
          <p className="text-slate-500 text-sm mb-6">This article may have been moved or deleted.</p>
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700';
  const catHref = CAT_SLUG[post.category] || '/blog';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero header */}
      <div className="relative text-white py-12 sm:py-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          alt="Article banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,20,40,0.75)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-yellow-300 transition-colors">Blog</Link>
            {post.category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link to={catHref} className="hover:text-yellow-300 transition-colors">{post.category}</Link>
              </>
            )}
          </nav>

          {post.category && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${catColor}`}>{post.category}</span>
          )}

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            {post.author_name && <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-yellow-400" />{post.author_name}</span>}
            {post.created_date && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-yellow-400" />{format(new Date(post.created_date), 'MMMM d, yyyy')}</span>}
            {post.read_time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-yellow-400" />{post.read_time} min read</span>}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Featured image */}
        {post.featured_image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-md -mt-6">
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Excerpt pull quote */}
        {post.excerpt && (
          <blockquote className="border-l-4 pl-5 pr-4 py-4 rounded-r-lg text-base text-slate-700 italic mb-8 leading-relaxed" style={{ borderColor: '#FFD300', backgroundColor: '#FFFBE6' }}>
            {post.excerpt}
          </blockquote>
        )}

        {/* Content */}
        {post.content && (
          <div
            className="prose prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-slate-800 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Tags */}
        {post.tags && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {post.tags.split(',').map(tag => (
              <Link
                key={tag.trim()}
                to={`/blog?q=${encodeURIComponent(tag.trim())}`}
                className="px-3 py-1 bg-white border border-gray-200 text-xs rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-slate-600"
              >
                {tag.trim()}
              </Link>
            ))}
          </div>
        )}

        {/* Social Share */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600"><Share2 className="w-4 h-4" /> Share this article:</span>
            {(() => {
              const url = encodeURIComponent(window.location.href);
              const title = encodeURIComponent(post.title);
              return (
                <>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#1877F2' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#000' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X (Twitter)
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#0A66C2' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href={`https://wa.me/?text=${title}%20${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#25D366' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a href={`mailto:?subject=${title}&body=Check out this article: ${url}`} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90 bg-slate-600">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Email
                  </a>
                </>
              );
            })()}
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: '#b8a000' }}>
            <ArrowLeft className="w-4 h-4" /> Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}