import React from 'react';
import Head from 'next/head';

import Breadcrumb from 'components/Breadcrumb.jsx';
import Store from 'components/Store.jsx';

function Page({ posts }) {
  const meta = {
    title: 'dio.dev · Minha lojinha',
    description: 'Compre algumas besteiras que estou vendendo para juntar uma grana.'
  };

  const breadcrumb = [
    {
      label: 'Lojinha',
      href: '/lojinha',
      current: true
    }
  ];

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
      <Breadcrumb items={ breadcrumb }/>
      <Store />
    </>
  );
}

export default Page;