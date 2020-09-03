const fs = require('fs');
const globby = require('globby');

function addPage(page) {
  console.log(page);
  const path = page
    .replace('src/pages', '')
    .replace('.jsx', '')
    .replace('.js', '')
    .replace('.mdx', '');

  const route = path === '/index' ? '' : path;

  return `  <url>
    <loc>https://dio.dev${ route }</loc>
    <changefreq>weekly</changefreq>
  </url>`;
}

function addPost(post) {
  const path = post
    .replace('src/posts', '')
    .replace('.md', '');

  return `  <url>
    <loc>https://dio.dev${ path }</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>`;
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*.jsx',
    '!src/pages/_*.jsx',
    '!src/pages/404.jsx',
    '!src/pages/[*.jsx',
    '!src/pages/**/[*.jsx',
    '!src/pages/api'
  ]);

  const posts = await globby([
    'src/posts/*',
  ]);

  const items = [
    ...pages.map(addPage),
    ...posts.map(addPost)
  ];
  
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ items.join('\n') }
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();