import React from 'react';
import Head from 'next/head';

import { getPost, getAllPosts } from 'services/api.js';
import markdown from 'services/markdown.js';

import Post from 'components/Post.jsx';

function Page({ post }) {
  return (
    <>
      <Head>
        <title>{ post.title } · dio.dev</title>
        <meta name="Description" content={ post.summary } />
        <meta property="og:title" content={ `${ post.title } · dio.dev` } />
        <meta property="og:description" content={ post.summary } />
        <meta property="og:url" content={ `https://dio.dev/${ post.slug }` } />
        <meta property="og:type" content="article" />
        {
          post.seo?.ogImage &&
          <>
            <meta property="og:image" content={ `https://dio.dev/${ post.seo.ogImage }` } />
            <meta name="twitter:image:alt" content={ post.title } />
          </>
        }
      </Head>
      <Post post={ post } />
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug, [
    'icon',
    'title',
    'summary',
    'date',
    'slug',
    'content'
  ]);

  const content = await markdown.toHTML(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      }
    }
  };
}

export function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  };
}

export default Page;