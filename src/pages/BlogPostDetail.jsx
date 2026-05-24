import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, Share2, BookOpen } from 'lucide-react';
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
  const { slug } = useParams();

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
      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-56" />
          <div className="space-y-3 mt-8">
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h1 className="font-heading text-2xl font-bold mb-3 text-slate-800">Article Not Found</h1>
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
    <article className="bg-white min-h-screen" itemScope itemType="https://schema.org/Article">
      
      {/* ========== BREADCRUMB (Separated at top) ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
          {post.category && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link to={catHref} className="hover:text-slate-900 transition-colors">{post.category}</Link>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* ========== HEADER SECTION (Title + Description + Meta) ========== */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6 border-b border-gray-100">
        
        {/* Category Badge */}
        {post.category && (
          <Link to={catHref} className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${catColor} hover:opacity-80 transition-opacity`}>
            {post.category}
          </Link>
        )}

        {/* H1 Title */}
        <h1 
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900 mb-4"
          itemProp="headline"
        >
          {post.title}
        </h1>

        {/* Description (separated clearly) */}
        {post.excerpt && (
          <p 
            className="text-base sm:text-lg text-slate-600 leading-relaxed mb-5 max-w-2xl"
            itemProp="description"
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
          {post.author_name && (
            <span className="flex items-center gap-1.5" itemProp="author" itemScope itemType="https://schema.org/Person">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span itemProp="name">{post.author_name}</span>
            </span>
          )}
          {post.created_date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime={post.created_date} itemProp="datePublished">
                {format(new Date(post.created_date), 'MMMM d, yyyy')}
              </time>
            </span>
          )}
          {post.read_time && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.read_time} min read
            </span>
          )}
        </div>
      </header>

      {/* ========== CONTENT BODY ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" itemProp="articleBody">
        {post.content && (
          <div
            className="prose prose-lg max-w-none 
              prose-headings:font-heading 
              prose-headings:font-bold 
              prose-headings:text-slate-900 
              prose-headings:mt-10 
              prose-headings:mb-4
              prose-h2:text-2xl 
              prose-h2:border-b 
              prose-h2:border-gray-200 
              prose-h2:pb-3
              prose-h3:text-xl
              prose-h4:text-lg
              prose-p:text-slate-700 
              prose-p:leading-relaxed 
              prose-p:mb-5
              prose-a:text-blue-600 
              prose-a:no-underline 
              hover:prose-a:underline
              prose-strong:text-slate-900 
              prose-strong:font-semibold
              prose-ul:my-5 
              prose-ul:list-disc 
              prose-ul:pl-6
              prose-ol:my-5 
              prose-ol:list-decimal 
              prose-ol:pl-6
              prose-li:text-slate-700 
              prose-li:mb-2
              prose-blockquote:border-l-4 
              prose-blockquote:border-yellow-400 
              prose-blockquote:bg-yellow-50 
              prose-blockquote:px-5 
              prose-blockquote:py-3 
              prose-blockquote:rounded-r-lg 
              prose-blockquote:not-italic 
              prose-blockquote:text-slate-700
              prose-img:rounded-xl 
              prose-img:shadow-md
              prose-code:bg-gray-100 
              prose-code:px-1.5 
              prose-code:py-0.5 
              prose-code:rounded 
              prose-code:text-sm
              prose-table:w-full 
              prose-table:border-collapse
              prose-th:bg-slate-50 
              prose-th:px-4 
              prose-th:py-3 
              prose-th:text-left 
              prose-th:font-semibold 
              prose-th:text-slate-700
              prose-td:border 
              prose-td:border-gray-200 
              prose-td:px-4 
              prose-td:py-3 
              prose-td:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>

      {/* ========== FOOTER: TAGS + SHARE ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        
        {/* Tags */}
        {post.tags && (
          <div className="pt-6 border-t border-gray-200 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600 mr-1">Topics:</span>
              {post.tags.split(',').map(tag => (
                <Link
                  key={tag.trim()}
                  to={`/blog?q=${encodeURIComponent(tag.trim())}`}
                  className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-xs rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-slate-600"
                >
                  {tag.trim()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share + Back */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Social Share */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Share:
              </span>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const url = encodeURIComponent(window.location.href);
                  const title = encodeURIComponent(post.title);
                  return (
                    <>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#1877F2' }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                        FB
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90 bg-black">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        X
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#0A66C2' }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        in
                      </a>
                      <a href={`mailto:?subject=${title}&body=Check out this article: ${url}`} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90 bg-slate-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Email
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Back Link */}
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}