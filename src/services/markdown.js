import remark from 'remark';
import highlight from 'remark-highlight.js';
import footnotes from 'remark-footnotes';
import html from 'remark-html';

export async function toHTML(markdown) {
  const result = await remark()
    .use(highlight, {
      include: [
        'css',
        'html',
        'javascript',
        'markdown',
        'json',
        'bash'
      ]
    })
    .use(footnotes)
    .use(html)
    .process(markdown);

  return result.toString();
}

export default { toHTML };