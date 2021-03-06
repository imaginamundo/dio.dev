export function generatePostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": post.title,
    "datePublished": post.createdAt.iso,
    "dateModified": post.updatedAt?.iso || post.createdAt.iso,
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const breadcrumb = { 
        "@type": "ListItem",
        "position": 1,
        "name": item.label,
        
      }
      if (!item.current) breadcrumb.item = `https://dio.dev${ item.href }`;

      return breadcrumb;
    })
  };
}