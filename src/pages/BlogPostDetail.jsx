import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const CAT_COLORS = { /* ... keep your existing colors */ };

const CAT_SLUG = { /* ... keep your existing slugs */ };

export default function BlogPostDetail() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      // ... your existing query logic
    },
  });

  if (isLoading) {
    return (/* ... your skeleton */);
  }

  if (!post) {
    return (/* ... not found */);
  }

  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700';
  const catHref = CAT_SLUG[post.category] || '/blog';
  const bannerImage = post.featured_image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80";

  return (
    <article className="bg-white min-h-screen" itemScope itemType="https://schema.org/Article">
      
      {/* ========== 1. HERO BANNER WITH OVERLAY TEXT ========== */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={bannerImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          itemProp="image"
        />
        
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-white/80 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              {post.category && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <Link to={catHref} className="hover:text-white transition-colors">{post.category}</Link>
                </>
              )}
            </nav>

            {/* Category Badge */}
            {post.category && (
              <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${catColor}`}>
                {post.category}
              </div>
            )}

            {/* Title */}
            <h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-md"
              itemProp="headline"
            >
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ========== 2. DESCRIPTION / EXCERPT ========== */}
      {post.excerpt && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <p 
              className="text-lg md:text-xl text-slate-600 leading-relaxed"
              itemProp="description"
            >
              {post.excerpt}
            </p>
          </div>
        </div>
      )}

      {/* ========== 3. META INFORMATION ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
          {post.author_name && (
            <span className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
              <User className="w-4 h-4" />
              <span itemProp="name">{post.author_name}</span>
            </span>
          )}
          {post.created_date && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.created_date} itemProp="datePublished">
                {format(new Date(post.created_date), 'MMMM d, yyyy')}
              </time>
            </span>
          )}
          {post.read_time && (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.read_time} min read
            </span>
          )}
        </div>
      </div>

      {/* ========== 4. ARTICLE CONTENT ========== */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12" itemProp="articleBody">
        {post.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 prose-blockquote:bg-yellow-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>

      {/* ========== 5. FOOTER: TAGS + SHARE ========== */}
      {/* ... keep your existing footer code ... */}

    </article>
  );
}