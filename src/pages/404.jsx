import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Breadcrumb from 'components/Breadcrumb.jsx';
import PageError from 'components/PageError.jsx';

function Error() {
  const router = useRouter();

  const breadcrumb = [
    {
      label: 'Erro',
      href: router.route,
      current: true
    }
  ];

  return (
    <>
      <Head>
        <title>Página não encontrada :( · dio.dev</title>
      </Head>
      <Breadcrumb items={ breadcrumb } />
      <PageError statusCode={ 404 } />
    </>
  );
}

export default Error;