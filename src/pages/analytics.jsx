import React from 'react';
import Head from 'next/head';
import Breadcrumb from 'components/Breadcrumb.jsx';
import Analytics from 'components/Analytics.jsx';

export default function Page() {
  const meta = {
    title: 'dio.dev · Analytics',
    description: 'Análise de visitas do blog dio.dev.'
  };

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="Description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:url" content="https://dio.dev/analytics" />
        <meta property="og:type" content="blog" />
        <meta name="twitter:image:alt" content={ meta.title } />
      </Head>
      <Breadcrumb items={ [ { current: true, href: '/analytics', label: 'Analytics' } ] } />
      <Analytics />
    </>
  );
}