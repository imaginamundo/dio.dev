---
icon: 🥇
title: Melhorando SEO com o Next.js
description: Métodos para melhorar o SEO de um site com Next.js, são várias técnicas conjuntas para obter uma melhor performance de SEO.
publishedAt:
  iso: 2020-09-03T15:02:37.182Z
  formated: 03/09/2020
---

## O que é SEO?

SEO (Search engine optimization, ou Otimização para mecanismos de busca) é o processo de aumentar a quantidade e qualidade (para um site de vendas, seriam pessoas que compram seus produtos) do tráfego do seu site aumentando a visibilidade das suas páginas para usuários em um mecanismo e busca.

## Por que melhorar o SEO do seu site?

Usar os métodos de SEO no seu site melhora a performance deles em mecanismos de busca, esse é o ponto principal para prestar atenção nas características de SEO. Porém, como um efeito colateral, também temos uma melhoria na experiência de usuário, por exemplo: o seu site para ter uma melhor pontuação em mecanismos de busca, precisa carregar de uma forma mais rápida, e afeta diretamente o desempenho do seu site com os usuários.

Outro ponto é que quanto maior for o seu acesso com mídias orgânicas, menos gastos de investimento em mídia você terá.[^1]

[Quanto mais rápido seu site, maior a retenção de usuários e capacidade de conversão ele tem](https://wpostats.com/ "Estatísticas de foco em performance na web").

## Quais são os principais métodos de SEO

Existem muitas práticas para SEO, e quem define essas métricas são os mecanismos de busca (Google, Bing, Yahoo, entre outros).

### Otimização de Performance

O principal aspécto para SEO, porém não autossuficiente (precisa trabalhar em conjunto com outros métodos), que em um simples resumo: seu site precisa carregar com velocidade.

Um site selvagem (ao seu estilo mais cru, apenas HTML) é performático e irá ser carregado de forma rápida[^2]. É claro que um site cru pode não entregar a experiência que sua empresa, gosto pessoal, equipe almejam, então nós complicamos as coisas para melhorar (ou piorar) a experiência do usuário.

[^2]: Temos mais peças nesse jogo, como a diferença da distância de onde o site está hospedado e onde o usuário está, se nossa hospedagem consegue enviar uma resposta rápida, entre alguns outros detalhes.

O que podemos fazer quando queremos um site mais dinâmico é ter algumas preocupações como:

#### Javascript com bloqueios

Evitar usar módulos de Javascript duplicados, evitar usar coisas muito complexas que interfiram no carregamento da página (como algum loop que trave a thread do javascript não deixando do código trabalhar).

#### Otimização de imagens

Podemos tirar conteúdos de imagens, alguns metadados, e até diminuir a qualidade dela (as vezes sem uma perda que seja visível) com muitas ferramentas. Existem ferramentas que permitem que façamos isso tanto no tempo em de construção do site (*build*) quanto no servidor (*runtime*). Esse é um ponto onde tem muitas possibilidades de ajustes, vou deixar uma lista de ferramentas para podermos fazer isso:

- <https://github.com/aheckmann/gm>;
- <https://squoosh.app/>;
- <https://tinypng.com/>.

#### Renderizar o HTML no servidor (em páginas dinâmicas)

Com o uso de frameworks e bibliotecas Javascript, podemos carregar todo o conteúdo do lado do navegador, isso faz o site ter que demorar mais para exibir o conteúdo para o usuário e mecanismos de busca.

Para evitar isso, usamos ferramentas para antes de respondermos o conteúdo para o usuário, façamos toda a lógica do site no servidor e coloquemos dentro do HTML o conteúdo. O Next.js já nos da essa opção de forma padrão, o que facilita bastante nas análises métricas de performance.

#### Navegação pelo navegador (título ruim 🙁)

O uso dos frameworks nos ensinou que precisamos renderizar o conteúdo do HTML pelo servidor. Mas não só trouxe esse trabalho a mais, como também trouxe um otimizador de performance, navegação pelo navegador.

O que isso quer dizer? Isso quer dizer que podemos ao invéz de ir no servidor, fazer a lógica para montar o HTML, retornar esse HTML com todos os recursos que ele consome, podemos apenas, no navegador, baixar o arquivo de Javascript da página, e consumir os recursos que o servidor consumirira pelo browser. Isso bom caminho e economiza o tempo que a página demoraria para carregar.

Aqui novamente o Next.js nos ajuda tendo essa ferramenta de forma padrão com o [`next/link`](https://nextjs.org/docs/api-reference/next/link "Documentação do Next.js Link") e a divisão de códigos javascript por página, e também não precisamos nos preocupar com a implementação desses artificios.

Existe um porém, as vezes não podemos abrir para o navegador os recursos que o servidor usa para imprimir a página. Então temos que fazer o caminho comum para abrir a página.

### Conteúdo e semântica

Conteúdo é o rei, mas não só o conteúdo, a forma em que atribuímos o conteúdo.

O navegador interpreta o HTML de uma forma concreta, podemos separar todo o conteúdo por `<div>`, mas isso fere tanto a usabilidade como na interpretação dos mecanismos de busca sobre o conteúdo.

Com o HTML temos várias *tags* semânticas para inserir nosso conteúdo.

- Títulos (ou cabeçalhos 🤷‍♂️): `h1, h2, h3, h4, h5, h6`;
- Listas: `ul, ol, dt`;
- E muitas outras.

Ganhamos algumas novas tags semânticas a pouco tempo. Essas tags são para definir o tipo de conteúdo que estamos utilizando com mais clareza.

- `<main>`: Para definir o conteúdo que representa a página;
- `<header>`: Para cabeçalhos;
- `<footer>`: Para rodapés;
- `<section>`: Usamos para definir uma sessão do conteúdo;
- `<nav>`: O conteúdo dessa tag são links de navegação;
- `<aside>`: Para conteúdos que representam uma ligação não direta com o conteúdo principal da página;
- `<article>`: Usamos para definir o escopo de um artigo. Essa tag pode ter utilizar seu próprio `header` e `footer`. Ela também pode quebrar uma regra velha do SEO na internet, podemos ter dois `h1`. Sendo um fora e um dentro do `article`.
- [E mais uma quantidade absurda de outras tags semânticas para HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element "Documentação MDN para tags HTML").

Utilizar tags semânticas de HTML não só facilitam para mecanismos de busca lerem o conteúdo do seu site, mas também dão benefícios para o usuário. Com seu uso correto, elas criam um modo leitura para o navegador (sem o desenvolvedor ter que fazer nenhum trabalho a mais). O principal benefício na minha opinião é a acessibilidade para leitores de tela, que conseguem ajudar pessoas com deficiências visuais a consumirem o conteúdo do seu site.

### Imagens

Para imagens, já tocamos no ponto de performance, mas tem um outro ponto que são os parâmetros `alt`. Enquanto uma imagem ainda não carregou, ou se houver um problema para ela carregar, esse texto será exibido "dentro" da imagem.

`alt` também é uma ferramenta de usabilidade para leitores de tela.

### Metadados

A parte que considero mais complexa do processo, porque é algo que é dificil colocar no site de uma forma que não interfira no fluxo de desenvolvimento. Também não é algo que o desenvolvedor/usuário enxergue de cara.

O arroz com feijão dos metadados são a tag `title` e a meta tag `description`. Elas definem o título e descrição da página e são exibidas de uma forma clara em mecanismos de buscas.

Nem se preocupe com o metadado `keyword`, os mecanismos de busca estão buscando essa informação sozinhos. 🤷‍♂️

<figure>
  <img src="/resultado-do-google.png" alt="Esse blog exibindo title e description na busca do Google">
</figure>

Um detalhe importante é que mecanismos de busca não gostam de `title` iguais em páginas diferentes e ferem sua pontuação. 

#### Metadados estruturados

O Google te dar uma carinha mais feliz quando você estiver na busca com dados estruturados, isso significa que ele pode destacar seu conteúdo se você colocar um JSON específico desenvolvido pela Google. Fazer isso não é uma coisa que me deixa feliz mas traz resultados claros para encontrarem seu site por buscas orgânicas.

Temos alguns métodos de desenvolver esses dados estruturados, o que considero menos intrusivo que é o `JSON+LD`.

O Google tem uma [página para listar todos os jeitos que ele consegue enxergar de valor em páginas da internet](https://developers.google.com/search/docs/guides/search-gallery).

#### Metadados para PWA (Progressive Web App)

PWAs são sites que podem ter comportamento limitados de aplicativos, como cacheamento de recursos no navegador do usuário até ser salvo na tela inicial para o usuário. Isso é um tópico a parte porque é um conteúdo bastante massante.

Os metadados de PWA se separam no `head` do HTML e também em um arquivo `JSON` a parte.

Ter capacidades PWA para *cache* e * "instalação" do seu site também ajuda na pontação do Google (não sei se em outros mecanismos de busca).

- <https://web.dev/add-manifest/>;
- <https://web.dev/pwa-checklist/>.

### Resposividade e PWA

Sites que funcionam em todos os dispositivos (Celulares, Tablets e Computadores) ganham pontos automaticamente só por funcionarem.

Utilizar as capacidades PWA (as que podem fazer o site carregar melhor, por exemplo) são coisas que o Google gosta para melhorar sua performance nas buscas.

Funcionar sem internet (com o cache) é uma característica boa não só para o SEO, como também para o usuário. Quando a página necessitar fazer uma requisição (como coisas seguras que validam o usuário) devem exibir um erro amigável para o usuário.

### Medindo essas métricas

Existem algumas ferramentas para medir a qualidade do seu site (SEO e Performance), aqui citarei duas que uso com mais frequência.

- [**Google Lighthouse**](https://developers.google.com/web/tools/lighthouse/)**:** Uma ferramenta que mede usabilidade, performance, responsividade e o qual PWA seu site está.
- [**Moz.com:**](https://moz.com/domain-analysis) Análise de domínio da MOZ te traz uma boa quantidade de dados sobre como está o SEO do seu site;
- [**Ferramenta de teste de dados estruturados da Google**](https://search.google.com/structured-data/testing-tool/u/0/?hl=pt-BR)**:** Ferramenta da Google para testar dados estruturados[^1];
- [**PageSpeed Insights**](https://developers.google.com/speed/pagespeed/insights/)**:** Versão do Google Lighthouse para web[^1];
- [**Google Mobile Friendly**](https://search.google.com/test/mobile-friendly)**:** Validação da Google se a página funciona corretamente em dispositivos móveis[^1].

### Algumas coisas a mais

Tem mais algumas coisas importantes que devemos prestar atenção:

- Não ter links que levam a páginas não existentes (famoso erro 404);
- Criar um arquivo [robots.txt](https://support.google.com/webmasters/answer/6062596?hl=pt-BR) para não deixar mecanismo de busca procurarem em páginas de busca ou páginas seguras que precisam de autenticação;
- Tente colocar urls amigáveis sempre que possível (no lugar de `/40545404`, que tal `/titulo-da-pagina`);
- Atualize seu site com frequencia/consistência para adicionar novos conteúdos;
- É extremamente saudável ter HTTPs no site inteiro;
- Validar possibilidade de gzip para o conteúdo do site;

### Boas para performance, mas ruim para a internet (o monopólio da Google)

Existem duas ferramentas que ajudam MUITO a performance do seu site, mas como eu não valorizo o monopólio da internet pela Google (problemas modernos) e tenho a opção de não precisar desse alavanco prefiro não usar.

#### Google Analytics

Uma ferramenta de análise de dados de visitas do site com uma ótima segmentação, usar essa ferramenta te da uma boa visualiação do que pode estar errado no seu site. Usando ela também mostra de uma forma mais fácil que você quer ser encontrado pela Google.

[Página do Google Analytics](https://analytics.google.com/analytics/web/).

#### Google AMP

A pior coisa já feita para a saúde da internet, mas uma ótima ferramenta para ter uma grande alavancada no Google. Quando você desenvolve e configura páginas AMP corretamente, você terá acesso aos cards de busca de forma mais detalhada e com mais destaque, mas o usuário "entra no seu site", quando ele está lá, ainda está no domínio da Google e com uma versão teoricamente mais leve do seu site.

[Página do Google AMP](https://developers.google.com/amp/).

## Aplicando métodos SEO no Blog feito em Next.js

Agora vamos para a parte prática do processo. Vamos utilizar como base o blog feito no [último artigo](https://dio.dev/criando-um-blog-com-nextjs-e-markdown).

### Metadados

Começando pela página inicial (de listagem de artigos), vamos adicionar `title` e `description`.

Vamos usar o [`next/head`](https://nextjs.org/docs/api-reference/next/head "Documentação do Next.js para next/head). Esse componente nos permite passar HTML direto para o `<head>` da página.

Ele pode apenas ser usado para as páginas diretamente, não para componentes filhos.

``` javascript
import Link from 'next/link';
/**
 * Importamos o next/head
 * Ele nos deixa implementar html no
 * cabeçalho da página
 */
import Head from 'next/head';
import { getAllPosts } from '../services/api.js';

export default function Page({ posts }) {
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      {
        /**
         * As tags que forem inseridas dentro 
         * do Head irão para o head
         * do HTML.
         */
      }
      <Head>
        <title>Blog do José · Vamos falar de tecnologia e desenvolvimento</title>
        <meta name="description" content="Um blog com conteúdo de tecnologia com Blá blá blá"/>
      </Head>

      <h1>Meu blog!</h1>
      <p>Listagem de posts:</p>
      {
        posts.map(post => 
          <p key={ post.slug }>
            <Link href={ `/${ post.slug }` }>
              <a>{ post.title }</a>
            </Link>
          </p>
        )
      }
    </div>
  );
}

export function getStaticProps() {
  const posts = getAllPosts([ 'title', 'date', 'slug' ]);

  return {
    props: { posts }
  }
}
```

E vamos fazer a mesma coisa para a página de detalhe de artigo, onde usaremos o título do artigo para adicionar no título da página, e o resumo para sua descrição.

``` javascript
import Head from 'next/head';
import markdown from '../services/markdown.js';
import { getAllPosts, getPost } from '../services/api.js';

export default function Page({ post }) {
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      <Head>
        {
          /**
           * Aqui o título é dinamico, não podemos
           * repetir títulos de páginas.
           */
        }
        <title>{ post.title } · Blog do José</title>
        {
          /**
           * Para descrição, estou buscando o resumo
           * da postagem. Mas quase sempre é melhor
           * ter um campo específico no seu banco
           * para otimizar esse conteúdo.
           */
        }
        <meta name="description" content={ post.summary } />
      </Head>
      <h1>{ post.title }</h1>
      <p>{ post.author } · { post.date }</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
```

### Melhorar a semântica do HTML

Temos alguns pontos onde conseguimos melhorar a semântica dos nossos dados, podemos inserir o `article`, `time`, entre outros.

A função da nossa página inicial ficará assim:

``` javascript
export default function Page({ posts }) {
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      <Head>
        <title>Blog do José · Vamos falar de tecnologia e desenvolvimento</title>
        <meta name="description" content="Um blog com conteúdo de tecnologia com Blá blá blá"/>
      </Head>

      <h1>Meu blog!</h1>
      <p>Listagem de posts:</p>
      {
        posts.map(post => 
          <section key={ post.slug }>
            <h2>
              <Link href={ `/${ post.slug }` }>
                <a>{ post.title }</a>
              </Link>
            </h2>
          </section>
        )
      }
    </div>
  );
}
```

E agora alteraremos nossa função para a página de artigo.

``` javascript
export default function Page({ post }) {
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      <Head>
        <title>{ post.title } · Blog do José</title>
        <meta name="description" content={ post.summary } />
      </Head>
      <article>
        <header>
          <h1>{ post.title }</h1>
          <p>{ post.author } · { post.date }</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
        <footer>
          <p>Escrito por { post.author }.</p>
        </footer>
      </article>
    </div>
  );
}
```

### Fazendo um PWA com Next.js utilizando next-pwa

Para transformar o site estático em um PWA é bem simples, esse plugin para o Next.js faz o trabalho inteiro sem precisar fazer nenhuma configuração.

Ele nos da o cache para funcionar sem internet e também a possibilidade de um usuário "instalar" ele na tela inicial do dispositivo (apenas em protocolos HTTPs).

Instale o pacote do nome dentro do seu projeto:

``` markdown
npm i next-pwa
```

Crie um arquivo de configuração para o Next.js para adicionar as configurações do plugin. O arquivo precisa ser nomeado `next.config.js`e ficar na pasta raiz do projeto.

``` javascript
const withPWA = require('next-pwa');
 
module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
});
```

É saudável adicionar os arquivos abaixo para o `.gitignore`, pois ele sempre os gera e a pasta public vai ficando poluída:

``` bash
public/sw.js
public/sw.js.map
public/workbox-*.js
public/workbox-*.map
```

#### Criando nossos arquivos necessários para o PWA

Para ter o PWA funcionando com todo o poder, temos alguns arquivos que precisamos criar, eu gosto de criar dentro da pasta `public/seo` para deixar essa pasta focada apenas em arquivos para SEO, segue a lista dos arquivos:

- **16.png:** Para o favicon 16x16;
- **32.png:** Para o favicon 32x32;
- **180.png:** Para o ícone PWA 180x180;
- **192.png:** Para o ícone PWA 192x192;
- **256.png:** Para o ícone PWA 256x256;
- **512.png:** Para o ícone PWA 512x512;
- **manifest.json:** Um arquivo json contendo dados que o navegador irá usar para buscar informações sobre seu PWA;
- **og-image.png:** Arquivo que será mostrado nos cartões de compartilhamento em mídias sociais, não necessariamente para PWA, mas importante ter. O tamanho dele é de 1200 x 630, que funciona bem em todas as redes sociais e meios de comnunicação.

O `manifest.json` precisa uma pequena quantidade de dados, o desse site por exemplo é assim:

``` json
{
  "name": "dio.dev",
  "short_name": "dio.dev",
  "icons": [
    {
      "src": "/seo/192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/seo/256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/seo/512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#f3f1e3",
  "background_color": "#f3f1e3",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait"
}
```

#### Adicionando metadados para PWA

Essa é uma parte onde o Next.js nos ajuda muito, pois os metadados que vamos adicionar são comuns para todas as páginas, e o Next.js tem uma função que auxilia muito para isso acontecer, é o [`custom-app`](https://nextjs.org/docs/advanced-features/custom-app "Documentação do Next.js para custom app").

Essa funcionalidade do Next.js nos deixa substituir o `App` padrão do Next.js, que é o que inicializa todas as páginas. Podemos importar o `next/head` dentro dele e adicionar tags que vão funcionar para todas as páginas.

Precisamos criar um arquivo `_app.jsx` dentro da pasta `pages` com o seguinte conteúdo.

``` javascript
import Head from 'next/head';

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* MUITOS METADADOS, JESUS */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Adicionar cards para quando for compartilhar em midias sociais */}
        <meta property="og:site_name" content="Blog do Diogo Ferreira Fernandes" />
        <meta property="og:image" content="https://dio.dev/seo/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dioruto"></meta>

        {/* Íconas para iPhone e favicon */}
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

        {/* Manifest para PWA */}
        <link rel="manifest" href="/seo/manifest.json" />

        {/* Detalhes da aplicação */}
        <meta name="application-name" content="dio.dev" />
        <meta name="apple-mobile-web-app-title" content="dio.dev" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="black"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
```

### Dados estruturados no Next.js

Para inserir os dados estruturados vamos fazer uma função separada, o conteúdo dele é muito grande. A minha escolha para isso é criar um arquivo chamado `seo.js` dentro da pasta `src/services`. É uma função simples que somente retorna o [dado estruturado que o Google recomenda](https://developers.google.com/search/docs/data-types/article "Documentação da Google para dados estruturados de artigos") como os nossos dados inseridos.

``` javascript
export function generatePostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Meu nome :D"
    },
    "publisher": {
      "name": "Organização :o",
      "name": "dio.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dio.dev/seo/512.png"
      }
    }
  };
}
```

Depois de criada a função, vamos importa-la e adicionar no `head` de todas as páginas de artigos.

``` javascript
import Head from 'next/head';
import markdown from '../services/markdown.js';
// Importamos nosso gerador de schema
import { generatePostSchema } from '../services/seo.js';
import { getAllPosts, getPost } from '../services/api.js';

export default function Page({ post }) {
  // Rodamos nossa função, enviando o post como parâmetro
  const schema = generatePostSchema(post);
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      <Head>
        <title>{ post.title } · Blog do José</title>
        <meta name="description" content={ post.summary } />
        {/* Adicionamos na página com dangerouslySetInnerHTML */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <article>
        <header>
          <h1>{ post.title }</h1>
          <p>{ post.author } · { post.date }</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
        <footer>
          <p>Escrito por { post.author }.</p>
        </footer>
      </article>
    </div>
  );
}
```

Isso irá adicionar o Schema para o nosso artigo, ajudando a Google a interpretar nosso conteúdo. Existem vários outros modelos para diferentes tipos de conteúdo.

## Fim 😁

Essas são as mudanças mais rápidas para se fazer, existem outras coisas que melhoram o acesso de mecanimo de busca, como `sitemap.xml`, [breadcrumbs](https://schema.org/BreadcrumbList "Documentação do schema de Breadcrumb") e muitos outros.

Em conclusão, utilize a maioria possível de métodos se você quer bons resultados de visitas organicas no seu site.

[^1]: Sugestão de melhoria enviada por [Camila Vecino](https://www.linkedin.com/in/camilavecino/ "LinkedIn da Camila Vecino").