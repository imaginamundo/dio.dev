import remark from 'remark';
import highlight from 'remark-highlight.js';
import footnotes from 'remark-footnotes';
import html from 'remark-html';

export function toHTML(markdown) {
  return remark()
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
    .process(markdown)
    .toString();
}

export default { toHTML };