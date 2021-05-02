import React from 'react';
import Head from 'next/head';
import Breadcrumb from 'components/Breadcrumb.jsx';

function Page() {
  const meta = {
    title: 'dio.dev · Você está offline :(',
    description: 'Só para avisar que você está offline.'
  };

  return (
    <div className="content textCenter">
      <Head>
        <title>{ meta.title }</title>
        <meta name="Description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:url" content="https://dio.dev/offline" />
        <meta property="og:type" content="blog" />
        <meta name="twitter:image:alt" content={ meta.title } />
      </Head>
      <Breadcrumb items={ [ { current: true, href: '/offline', label: 'Offline' } ] } />
      <h1>Não conectado à internet.</h1>
      <figure>
        <img src="/fallback.png" alt="Sem acesso à internet"/>
      </figure>
      <p>Você pode acessar as páginas que já acessou anteriormente.</p>
    </div>
  );
}

export default Page;