import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page({ env }) {
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetch('https://analytics-simple.herokuapp.com/view')
      .then(res => res.json())
      .then(setData)
      .catch(() => { setError(true) });

    // TODO: Stop requisition on componentUnmount
  }, []);

  return (
    <>
      <h1>Analytics</h1>
      { !data && !error && <p className="textCenter">Carregando…</p> }
      {
        data &&
        <>
          <h2>Total de visitas: <code>{ data.visitors }</code></h2>
          <table>
            <thead>
              <tr>
                <th>Página</th>
                <th>Visitas</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(data.urls).map(([ url, { count } ]) => {
                  url = url.replace('https://dio.dev', '');
                  return (
                    <tr key={ url }>
                      <td>
                        <Link href={ url }>
                          <a>{ url }</a>
                        </Link>
                      </td>
                      <td className="textCenter"><code>{ count }</code></td>
                    </tr>
                  );
                })
              }
              <tr></tr>
            </tbody>
          </table>
        </>
      }
      {
        error && <p>Falha ao carregar dados :(</p>
      }

      <p>Dados estraídos apenas utilizando os dados de requisição do site sem a utilização de <code>cookies</code> ou <code>localStorage</code>.</p>
      <p>Criado com <a href="https://deno.land" target="_blank">Deno</a> e <a href="https://oakserver.github.io/oak/" target="_blank">Oak</a> para testes.</p>
      <p>Os dados não são salvos em nenhum banco de dados e ficam apenas na memória do servidor hospedado no <a href="https://www.heroku.com" target="_blank">Heroku</a>. Por ser hospedado numa conta gratuíta no Heroku, quando a aplicação entra no modo hibernação, todos os dados são apagados (não quero resolver isso agora 🤷‍♂️).</p>
      <p>O repositório do sistema de Analytics está no GitHub: <a href="https://github.com/imaginamundo/analytics" target="_blank">Acessar repositório no GitHub</a>.</p>

    </>
  );
}