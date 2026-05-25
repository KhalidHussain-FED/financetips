import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { base44 } from '@/api/base44Client';

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-4">
          <Skeleton className="w-full h-[400px] rounded-xl" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-3/4" />
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
  const bannerImage = post.featured_image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80";

  return (
    <article className="bg-white min-h-screen" itemScope itemType="https://schema.org/Article">

      {/* ========== FULL BANNER - TEXT STARTS FROM MIDDLE ========== */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Banner Image */}
        <img
          src={bannerImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          itemProp="image"
        />
        
        {/* Gradient Overlay - Darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

        {/* Content - Starts from vertical center */}
        <div className="absolute inset-0 flex flex-col justify-center pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-white/70 flex-wrap mb-5" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <Link to="/blog" className="hover:text-yellow-300 transition-colors">Blog</Link>
              {post.category && (
                <>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                  <Link to={catHref} className="hover:text-yellow-300 transition-colors">{post.category}</Link>
                </>
              )}
            </nav>

            {/* Category Badge */}
            {post.category && (
              <Link to={catHref} className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5 ${catColor} hover:opacity-90 transition-opacity`}>
                {post.category}
              </Link>
            )}

            {/* Title */}
           <h1 
  className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white drop-shadow-lg mb-6"
  itemProp="headline"
>
  {post.title}
</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
              {post.author_name && (
                <span className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span itemProp="name">{post.author_name}</span>
                </span>
              )}
              {post.created_date && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <time dateTime={post.created_date} itemProp="datePublished">
                    {format(new Date(post.created_date), 'MMMM d, yyyy')}
                  </time>
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  {post.read_time} min read
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========== ARTICLE CONTENT ========== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10" itemProp="articleBody">
        {post.content && (
          <div
            className="prose prose-lg max-w-none 
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 
              prose-headings:mt-10 prose-headings:mb-4
              prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-xl prose-h4:text-lg
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-ul:my-5 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-5 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-slate-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 
              prose-blockquote:bg-yellow-50 prose-blockquote:px-6 prose-blockquote:py-4 
              prose-blockquote:rounded-r-xl prose-blockquote:text-slate-700
              prose-img:rounded-xl prose-img:shadow-md
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-table:w-full prose-table:border-collapse
              prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>

      {/* ========== TAGS ========== */}
      {post.tags && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
          <div className="pt-6 border-t border-gray-200">
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
        </div>
      )}

      {/* ========== SHARE + BACK ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90" style={{ backgroundColor: '#1877F2' }}>FB</a>
                      <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 bg-black">X</a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90" style={{ backgroundColor: '#0A66C2' }}>in</a>
                      <a href={`mailto:?subject=${title}&body=Check out this article: ${url}`} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 bg-slate-600">Email</a>
                    </>
                  );
                })()}
              </div>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}