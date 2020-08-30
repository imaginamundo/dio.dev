import React from 'react';
import Head from 'next/head';

import DefaultLayout from 'components/layouts/Default.jsx';
import EmojiFavicon from 'components/EmojiFavicon.jsx';

import './_app.css';
import './_app-highlight.css';

function CustomApp({ Component, pageProps }) {
  const { Layout = DefaultLayout } = Component;
  return (
    <Layout>
      <Head>
        <EmojiFavicon icon="🚀" />
        <meta name="theme-color" content="black"></meta>
        <meta property="og:site_name" content="Blog do Diogo Ferreira Fernandes" />
        <meta property="og:image" content={ `https://dio.dev/seo/og-image.png` } />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dioruto"></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default CustomApp;