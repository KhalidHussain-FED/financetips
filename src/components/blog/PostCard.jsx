import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const CAT_COLORS = {
  Accounting: 'bg-yellow-100 text-yellow-800',
  Payroll: 'bg-green-100 text-green-800',
  Taxes: 'bg-orange-100 text-orange-800',
  Bookkeeping: 'bg-purple-100 text-purple-800',
  'Financial Planning': 'bg-teal-100 text-teal-800',
  Outreach: 'bg-rose-100 text-rose-800',
};

export default function PostCard({ post, featured = false }) {
  const slug = post.slug || post.id;
  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700';

  // Fallback excerpt: generate from content if excerpt is missing
  const getExcerpt = () => {
    if (post.excerpt && post.excerpt.trim() !== '') {
      return post.excerpt;
    }
    if (post.content) {
      // Strip HTML tags and get first 150 characters
      const plainText = post.content.replace(/<[^>]*>/g, '');
      return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
    }
    return null;
  };

  const displayExcerpt = getExcerpt();

  // Read time fallback
  const readTime = post.read_time || Math.ceil((post.content?.split(' ').length || 0) / 200);

  if (featured) {
    return (
      <article className="grid md:grid-cols-5 gap-0 rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="md:col-span-3 aspect-[16/9] md:aspect-auto overflow-hidden bg-muted min-h-[240px]">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-heading font-bold text-muted-foreground/20">
              FL
            </div>
          )}
        </div>

        <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center bg-white">
          {post.category && (
            <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold mb-3 w-fit ${catColor}`}>
              {post.category}
            </span>
          )}

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground leading-tight mb-3">
            {post.title}
          </h2>

          {displayExcerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
              {displayExcerpt}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
            {post.author_name && <span>{post.author_name}</span>}
            {post.created_date && (
              <span>{format(new Date(post.created_date), 'MMM d, yyyy')}</span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>

          <Link
            to={`/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-heading font-bold text-muted-foreground/20">
            FL
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {post.category && (
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 w-fit ${catColor}`}>
            {post.category}
          </span>
        )}

        <h3 className="font-heading text-base font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {post.title}
        </h3>

        {displayExcerpt && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {displayExcerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {post.created_date && (
              <span>{format(new Date(post.created_date), 'MMM d, yyyy')}</span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>

          <Link
            to={`/${slug}`}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
          >
            Read <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}