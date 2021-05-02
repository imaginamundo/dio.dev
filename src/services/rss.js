import fs from 'fs';

export function generateRSSFeed(posts) {
  const items = generateRSSItems(posts);

  const options = {
    title: 'dio.dev',
    language: 'pt-br',
    link: 'https://dio.dev',
    description: 'Blog com artigos sobre desenvolvimento, na maior parte do tempo.',
    lastestPostDate: new Date(posts[0].createdAt.iso).toUTCString(),
    managingEditor: 'diogos.go@gmail.com (Diogo Ferreira Fernandes)',
    webMaster: 'diogos.go@gmail.com'
  }

  console.log({
    posts,
    items,
    options
  });

  const rss = `<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${ options.title }</title>
        <link>${ options.link }</link>
        <description>${ options.description }</description>
        <language>${ options.language }</language>
        <managingEditor>${ options.managingEditor }</managingEditor>
        <lastBuildDate>${ new Date(options.lastestPostDate).toUTCString() }</lastBuildDate>
        <atom:link href="https://dio.dev/rss.xml" rel="self" type="application/rss+xml" />${ items }
    </channel>
  </rss>`;

  fs.writeFileSync('./public/rss.xml', rss);

  return;
};

function generateRSSItems(posts) {
  let items = '';

  posts.forEach(post => {
    items += `
        <item>
          <title>${ post.title }</title>
          <guid isPermaLink="true">${ `https://dio.dev/${ post.slug }` }</guid>
          <link>${ `https://dio.dev/${ post.slug }` }</link>
          <pubDate>${ new Date(post.createdAt.iso).toUTCString() }</pubDate>
          <description>${ post.summary }</description>
        </item>`;
  })

  return items;
};

