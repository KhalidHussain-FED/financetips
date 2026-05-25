import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, Share2, BookOpen, Copy, Check, LinkIcon } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const bySlug = await base44.entities.BlogPost.filter({ slug, status: 'published' });
      if (bySlug.length > 0) return bySlug[0];
      const all = await base44.entities.BlogPost.filter({ status: 'published' });
      return all.find(p => p.id === slug) || null;
    },
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
  
  // Social media share URLs
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);
  const shareDescription = encodeURIComponent(post.excerpt || post.title);

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

      {/* ========== COMPLETE SOCIAL SHARE SECTION ========== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="pt-6 border-t border-gray-200">
          
          {/* Share Header */}
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-bold text-slate-800">Share This Article</h3>
          </div>
          
          {/* Social Media Share Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#1877F2' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
              Facebook
            </a>

            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#000000' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#0A66C2' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            {/* Pinterest */}
            <a
              href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#E60023' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
              Pinterest
            </a>

            {/* Reddit */}
            <a
              href={`https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#FF4500' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.205 12.96c-.058 0-.116.012-.173.012-.928 0-1.76-.52-2.139-1.273-1.786.753-3.87 1.098-6.003 1.098-2.133 0-4.217-.345-6.003-1.098-.379.753-1.211 1.273-2.139 1.273-.058 0-.116-.012-.173-.012-1.055 0-1.912.857-1.912 1.912s.857 1.912 1.912 1.912c.637 0 1.197-.313 1.543-.794.407.291.865.537 1.369.737 1.42.563 3.183.882 5.103.882s3.683-.319 5.103-.882c.504-.2.962-.446 1.369-.737.346.481.906.794 1.543.794 1.055 0 1.912-.857 1.912-1.912s-.857-1.912-1.912-1.912zm-12.205 2.678c-.635 0-1.15-.516-1.15-1.151s.515-1.151 1.15-1.151 1.15.516 1.15 1.151-.515 1.151-1.15 1.151zm6 0c-.635 0-1.15-.516-1.15-1.151s.515-1.151 1.15-1.151 1.15.516 1.15 1.151-.515 1.151-1.15 1.151zm-2.5-4.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
              </svg>
              Reddit
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#26A5E4' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.54.26l.19-2.93 5.32-4.81c.23-.21-.05-.33-.36-.13l-6.58 4.14-2.84-.88c-.62-.19-.63-.62.13-.92l11.08-4.27c.51-.19.96.13.8.92z"/>
              </svg>
              Telegram
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=${shareTitle}&body=Check out this article:%0A%0A${shareUrl}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: '#6B7280' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
              style={{ backgroundColor: copied ? '#10B981' : '#3B82F6' }}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Back to Blog Link */}
          <div className="flex justify-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}