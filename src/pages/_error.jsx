import React from 'react';
import Head from 'next/head';

import PageError from 'components/PageError.jsx';

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Página não encontrada :( · dio.dev</title>
      </Head>
      <PageError statusCode={ statusCode } />
    </>
  );
}

Error.getInitialProps = ({ res }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}

export default Error;