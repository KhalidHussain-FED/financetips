import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/seoConfig';

const SEO = ({ pageType = 'home', slug = null }) => {
  let seoData;

  if (pageType === 'category' && slug) {
    seoData = seoConfig.categories?.[slug];
  } else {
    seoData = seoConfig[pageType];
  }

  // Fallback to home if nothing found
  if (!seoData) seoData = seoConfig.home;

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://financeledgertips.com${window.location.pathname}`} />
    </Helmet>
  );
};

export default SEO;