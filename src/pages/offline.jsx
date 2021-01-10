import React from 'react';

function Page() {
  return (
    <div className="content textCenter">
      <h1>Não conectado à internet.</h1>
      <figure>
        <img src="/fallback.png" alt="Sem acesso à internet"/>
      </figure>
      <p>Você pode acessar as páginas que já acessou anteriormente.</p>
    </div>
  );
}

export default Page;