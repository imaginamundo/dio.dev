import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import DefaultLayout from 'components/layouts/Default.jsx';

import './_app.css';
import './_app-highlight.css';

Router.events.on('routeChangeComplete', () => {
  fetch(`https://analytics-simple.herokuapp.com/update?url=${ document.location.href }`);
}); 

function CustomApp({ Component, pageProps }) {
  const { Layout = DefaultLayout } = Component;

  useEffect(() => {
    fetch(`https://analytics-simple.herokuapp.com/update?url=${ document.location.href }`);
  }, []);

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="black"></meta>
        <meta property="og:site_name" content="Blog do Diogo Ferreira Fernandes" />
        <meta property="og:image" content="https://dio.dev/seo/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dioruto"></meta>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/seo/180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/seo/32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/seo/16.png"
        />
        <link rel="shortcut icon" href="/seo/32.png" />
        
        <link rel="manifest" href="/seo/manifest.json" />
        <meta name="application-name" content="dio.dev" />
        <meta name="apple-mobile-web-app-title" content="dio.dev" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default CustomApp;