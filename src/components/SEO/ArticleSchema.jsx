const ArticleSchema = ({ post }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    author: {
      "@type": "Organization",
      name: "Finance Ledger Tips",
    },
    publisher: {
      "@type": "Organization",
      name: "Finance Ledger Tips",
      logo: {
        "@type": "ImageObject",
        url: "https://financeledgertips.com/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default ArticleSchema;