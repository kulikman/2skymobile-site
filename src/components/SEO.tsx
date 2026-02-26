import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { 
  seoConfig, 
  breadcrumbConfig,
  organizationData,
  SITE_NAME, 
  SITE_URL, 
  DEFAULT_OG_IMAGE,
  type SEOConfig 
} from "@/lib/seo-config";

interface FAQItem {
  question: string;
  answer: string;
  id?: string;
}

interface SEOProps extends Partial<SEOConfig> {
  children?: React.ReactNode;
  faq?: FAQItem[];
}

export const SEO = ({ 
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  noIndex = false,
  article,
  breadcrumbs,
  faq,
  children 
}: SEOProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Get config from seoConfig or use provided props
  const config: SEOConfig = seoConfig[path] || {
    title: SITE_NAME,
    description: "",
  };
  const pageTitle = title || config.title;
  const pageDescription = description || config.description;
  const pageCanonical = canonical || `${SITE_URL}${path}`;
  const pageOgType = ogType || config.ogType || "website";
  const pageOgImage = ogImage || config.ogImage || DEFAULT_OG_IMAGE;
  

  // Organization schema (included on every page)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationData.name,
    "url": organizationData.url,
    "logo": organizationData.logo,
    "description": organizationData.description,
    "sameAs": organizationData.sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      ...organizationData.contactPoint,
    },
    "address": {
      "@type": "PostalAddress",
      ...organizationData.address,
    },
  };

  // WebSite schema (only on homepage)
  const websiteSchema = path === "/" ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  } : null;

  // Article/NewsArticle schema
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": article.isNews ? "NewsArticle" : "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": pageOgImage,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    ...(article.wordCount && { "wordCount": article.wordCount }),
    "author": {
      "@type": "Organization",
      "name": organizationData.name,
      "url": organizationData.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": organizationData.name,
      "logo": {
        "@type": "ImageObject",
        "url": organizationData.logo,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url || pageCanonical,
    },
    "articleSection": article.section,
  } : null;

  // Use custom breadcrumbs if provided, otherwise use config
  const breadcrumbItems = breadcrumbs || breadcrumbConfig[path] || [];
  const breadcrumbSchemaData = breadcrumbItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.path}`,
    })),
  } : null;

  // FAQPage schema
  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageCanonical} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:type" content={pageOgType} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
      <meta name="twitter:site" content="@2skymobile" />
      
      {/* Article specific OG tags */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      
      {breadcrumbSchemaData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaData)}
        </script>
      )}
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEO;
