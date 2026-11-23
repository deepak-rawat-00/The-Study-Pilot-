import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  authorName?: string;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogType = 'website',
  imageUrl = 'https://thestudypilot.space/og-image.svg',
  publishDate,
  modifiedDate,
  authorName = 'The Study Pilot Editorial Team',
  breadcrumbs,
  jsonLd,
  noindex = false,
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Set standard meta tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. Update or create canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 5. Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'The Study Pilot');
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', title);

    if (ogType === 'article') {
      if (publishDate) {
        setMetaTag('property', 'article:published_time', publishDate);
      }
      if (modifiedDate || publishDate) {
        setMetaTag('property', 'article:modified_time', modifiedDate || publishDate!);
      }
      if (authorName) {
        setMetaTag('property', 'article:author', authorName);
      }
    }

    // 6. Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // 7. Inject Structured Data JSON-LD
    const jsonLdScripts: HTMLScriptElement[] = [];

    // Optional breadcrumb list schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-type', 'breadcrumbs');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
      jsonLdScripts.push(script);
    }

    // Custom or article schema
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, idx) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-type', `custom-${idx}`);
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        jsonLdScripts.push(script);
      });
    }

    // Cleanup added dynamic json-ld scripts on unmount / change
    return () => {
      jsonLdScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [
    title,
    description,
    canonicalUrl,
    keywords,
    ogType,
    imageUrl,
    publishDate,
    modifiedDate,
    authorName,
    breadcrumbs,
    jsonLd,
    noindex,
  ]);

  return null;
};
