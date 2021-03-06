import React from 'react';
import Head from 'next/head';

import { getAllPosts } from 'services/api.js';

import Breadcrumb from 'components/Breadcrumb.jsx';
import HomeHeader from 'components/HomeHeader.jsx';
import PostsList from 'components/PostsList.jsx';

function Page({ posts }) {
  const meta = {
    title: 'dio.dev · Blog de um desenvolvedor frontend',
    description: 'Blog pessoal do Diogo Ferreira Fernandes, para compartilhar conteúdos sobre tecnologia, desenvolvimento entre outros.'
  };

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="Description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:url" content="https://dio.dev" />
        <meta property="og:type" content="blog" />
        <meta name="twitter:image:alt" content={ meta.title } />
      </Head>
      <Breadcrumb />
      <HomeHeader />
      <PostsList posts={ posts } />
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts([
    'icon',
    'title',
    'summary',
    'createdAt',
    'slug'
  ]);

  return {
    props: { posts }
  };
}

export default Page;