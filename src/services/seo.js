export function generatePostSchema(post) {
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://dio.dev/'
    },
    'headline': post.title,
    'datePublished': `${ year }-${ month }-${ day }`,
    'dateModified': `${ year }-${ month }-${ day }`,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'description': post.summary
  };
}