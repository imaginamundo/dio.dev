---
icon: 🎨
title: Modelos de interface para multiplas páginas com Next.js
summary: Como replicar modelos de interface de forma performática de de fácil manutenção.
date:
  iso: '2020-09-30T13:04:35.761Z'
  formated: 30/09/2020
---

## Para que criar modelos?

Para criar páginas com o mesmo "tema" e de forma performática evitando que o React.js reconstrua toda a página, se o modelo não for alterado.

Esse ganho de performance é maior quando fazemos o usuário navegar pelo site usando o próprio navegador, não fazendo o site buscar todas as páginas no servidor sempre, só enviando o miolo da página. Podemos utilizar o facilitador para esse recurso no Next.js com o [next/link](https://nextjs.org/docs/api-reference/next/link "Documentação do Next.js Link")

<figure>
  <img src="/exemplos-de-modelos.png" alt="Exemplos de páginas modelos" title="Exemplos de páginas modelos">
</figure>

Esse exemplo é de uso bem comum, um completo com cabeçalho, menu e rodapé, e outro sem o menu e links no cabeçalho. O motivo dessa diferença é se sua página tiver um conteúdo que force o usuário a executar certa ação obrigatória, evitando que ele saia da página dando menos rotas de fuga.

Mas existem diversos motivos para existirem modelos diferentes, como páginas que precisam de mais espaço, páginas especiais que precisam seguir uma linha de interface diferente, etc…

## Como criar páginas modelo

O Next.js nos da ferramentas que facilitam muito a criação de páginas modelo.

Vamos usar o [**Custom App**](https://nextjs.org/docs/advanced-features/custom-app "Documentação Custom App do Next.js"), que nos permite a alterar o componente padrão do Next.js que renderiza **TODAS** as páginas dentro do seu diretório de páginas `/pages`.

Vamos iniciar [instalando o Next.js](https://nextjs.org/docs/getting-started "Documentação de como instalar o Next.js"), e depois criando nossas pastas assim:

``` markdown
📦templates
 ┣ 📂public
 ┗ 📂src
 ┃ ┣ 📂components
 ┃ ┗ 📂pages
```

*Não é obrigatório essa estrutura de pastas, mas é minha preferência de organização.*

Para inciar vamos criar duas páginas da forma mais simples possível, eu criarei a `index.jsx` e `sobre.jsx`.

``` javascript
// src/pages/index.jsx

const Page = () => {
  return <p>Minha página incial.</p>
}

export default Page;
```

``` javascript
// src/pages/sobre.jsx

const Page = () => {
  return <p>Minha página sobre.</p>
}

export default Page;
```

## Criando os componentes modelos

Os componentes modelo são componentes que ficaram em volta (como uma embalagem) das páginas.

Por organização gosto de colocar eles dentro da pasta `src/components/layout`. Também criarei dois exemplos como o da imagem. Um modelo simples e um completo.

``` javascript
// src/components/layout/Complete.jsx
/**
 * Importamos o next/link para termos
 * o máximo de ganhos ao usar esse sistema
 * de módulos.
 */
import Link from 'next/link';

/**
 * Recebemos o children, que é todo o conteúdo
 * que ficar dentro do componente quando ele
 * for chamado.
 */
export default function Complete({ children }) {
  return (
    <>
      <header>
        <h1><a href="/">Meu site</a></h1>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Página inicial</a>
              </Link>
            </li>
            <li>
              <Link href="/sobre">
                <a>Sobre</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {
          /**
           * Criamos o componente para  fazer 
           * uma casca, o conteúdo que estiver
           * dentro do componente quando ele for
           * chamado.
           */
        }

        { children }
      </main>
      <footer>
        Criado por mim :D
      </footer>
    </>
  );
}
```

``` javascript
// src/components/layout/Simple.jsx

export default function Simple({ children }) {
  return (
    <>
      <header>
        <h1>Meu site</h1>
      </header>
      <main>
        { children }
      </main>
      <footer>
        Criado por mim :D
      </footer>
    </>
  );
}
```

Se você reparar, entre os modelos não tem muita diferença. Um tem links para que o usuário navegue pelo site e o outro não. Esse formato de modelos é bastante usados por e-commerces para páginas de pagamento, para aumentar as chances do usuário completar a compra, dificultando para ele sair da página.

Uma coisa importante para esse modelo de navegação é lembrar de não deixar o usuário cair num beco sem saída, que ele possa continuar após completar a ação que você definiu como necessária.

## Alterando o componente App padrão para receber modelos

Para alterar a forma em que o App renderiza as páginas, criamos um arquivo chamado `_app.jsx` na pasta `src/pages` e inserimos as mudanças que queremos que aconteça.

O modelo mais rústico de um componente App é assim:

``` javascript
export default function CustomApp({ Component, pageProps }) {
  return <Component { ...pageProps } />;
}
```

Para usar o nosso modelo vamos importar primeiro o modelo que achamos que vá ser mais frequente no site.

``` javascript
// src/pages/_app.jsx

/**
 * Importamos o modelo que consideramos o padrão.
 */
import LayoutComplete from '../components/layout/Complete.jsx';

/**
 * O parâmetro Component são todas as páginas
 * criadas.
 */
export default function CustomApp({ Component, pageProps }) {
  {
    /**
     * Inserimos nosso modelo em volta
     * do componente Component.
     */
  }
  return (
    <LayoutComplete>
      <Component { ...pageProps } />
    </LayoutComplete>
  );
}
```

Dessa forma temos metade do trabalho feito, temos uma casca em volta de todas as páginas agora. Mas ainda falta um jeito de trocar de forma que seja mais fácil de manter.

## Alternando entre modelos de páginas

Para alternar entre os modelos, o jeito que considero mais saudável é com uma página padrão. Isso significa que se você quiser alterar o modelo padrão não precisa fazer nada. Também a página com modelos específico, isso requer que alteremos diretamente no arquivo da página.

Para enviar o componente do modelo que você quer na página vamos importar o modelo, e depois enviar ele em conjunto com a própria página.

Eu escolhi que a página *sobre* precisa ter o modelo simples para usar como exemplo.

``` javascript
// src/pages/sobre.jsx

/**
 * Importamos o modelo que queremos para
 * nossa página.
 */
import LayoutSimple from '../components/layout/Simple.jsx';

const Page = () => {
  return <p>Minha página sobre.</p>
}

/**
 * Adiciamos a constante Page, para ela
 * ser recebida junto com o componente
 * de página no _app.jsx.
 */
Page.layout = LayoutSimple;

export default Page;
```

Agora que temos o componente que escolhemos para ser o modelo da página *sobre*, precisamos tratar o nosso `_app.jsx` para interpretar o que fazer com esse dado.

``` javascript
// src/pages/_app.jsx

import LayoutComplete from '../components/layout/Complete.jsx';

export default function CustomApp({ Component, pageProps }) {
  /**
   * Aqui nós buscamos o Layout que enviamos
   * junto com a página (utilizando o método
   * destructuring), e se ele não existir,
   * dizemos que o valor padrão dele é o
   * LayoutComplete
   */
  const { Layout = LayoutComplete } = Component;

  /**
   * Alteramos a casca de todas as nossas páginas
   * para serem ou o componente enviado pela página,
   * e se não houver nenhum, será o que definimos
   * como padrão na constante acima.
   */
  return (
    <Layout>
      <Component { ...pageProps } />
    </Layout>
  );
}
```

Nesse código eu usei algumas coisas que considero muito boas no ES6, que são [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment "Documentação para Destructuring Assignment") e default value (que está na mesma documentação).

## Conclusão

Desse jeito mais simples conseguimos criar modelos que são fáceis de utilizar, e sem atrapalhar o fluxo de desenvolvimento.

[Baixar o exemplo completo de modelos que construímos nesse artigo](/modelos.rar).

Se você conhece algum outro jeito que possa ser melhor, me manda um bizu no [Twitter](https://twitter.com/dioruto "Twitter do Diogo")