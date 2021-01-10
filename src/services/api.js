import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src/posts');

function getMarkdownsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPost(slugOrFilename, fields = []) {
  const slug = slugOrFilename.slice(0, -3);
  const directory = join(postsDirectory, `${ slug }.md`);
  const markdownContent = fs.readFileSync(directory, 'utf8');
  const { data, content } = matter(markdownContent);

  const post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') post[field] = slug;
    if (field === 'content') post[field] = content;
    if (data[field]) post[field] = data[field];
  });

  return post;
}

export function getAllPosts(fields) {
  const markdowns = getMarkdownsFiles();
  const posts = markdowns
    .map(filename => getPost(filename, fields))
    // sort posts by date in descending order
    .sort((a, b) => new Date(b.date.iso) - new Date(a.date.iso));

  return posts;
}