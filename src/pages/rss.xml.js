import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'dio.dev',
    description: 'Blog com artigos sobre desenvolvimento, na maior parte do tempo.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map(post => ({
      // Assumes all RSS feed item properties are in post frontmatter
      title: post.data.title,
      pubDate: new Date(post.data.publishedAt.iso),
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      // Generate a `url` from each post `slug`
      // This assumes all blog posts are rendered as `/blog/[slug]` routes
      // https://docs.astro.build/en/guides/content-collections/#generating-pages-from-content-collections
      link: `/${post.slug}/`,
    }))
  });
}
