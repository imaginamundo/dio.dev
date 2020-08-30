import React from 'react';
import Head from 'next/head';

import PageError from 'components/PageError.jsx';

function Error() {
  return (
    <>
      <Head>
        <title>Página não encontrada :( · dio.dev</title>
      </Head>
      <PageError statusCode={ 404 } />
    </>
  );
}

export default Error;