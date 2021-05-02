---
icon: 🚀
title: Criando um blog estático com Next.js e Markdown
summary: Um jeito de manter um blog pessoal sem se preocupar com banco de dados, hospedagem e performance.
createdAt:
  iso: '2020-08-30T20:18:54.073Z'
  formated: 30/08/2020
---

Olá, meu nome é Diogo! Para estrear esse blog começarei por ele mesmo, mostrando como ele foi feito e todas as partes. Mostrando desde o início do desenvolvimento até a subida para produção.

## Pré requisitos

[Node](https://nodejs.org/) instalado no seu computador.

## Ferramentas

### Markdown

Uma linguagem de marcação simples, que irá gerar o conteúdo que utilizaremos nas postagens do blog. Você pode ver como funcionam os usos básicos neste [Guia de Markdown](https://www.markdownguide.org/basic-syntax).

### Gray Matter

Para podemos transformar nossos arquivos Markdown em Objetos Javascript sem esforço.

### Remark

Com o Remark podemos transformar um conteúdo Markdown em HTML.

### Next.js

O [Next.js](https://nextjs.org/) é um Framework de Javascript que facilita em muitas coisas no desenvolvimento de uma aplicação para o [React.js](https://reactjs.org/). As principais funções que vamos usar dele são:

#### Sistema de rotas separados por pastas

- Dentro da raiz do projeto podemos criar uma pasta chamada `src` e outra chamada `public`.

``` markdown
 📦projeto
 ┣ 📂public
 ┃ ┗ 🖼imagem.png
 ┣ 📂src
 ┃ ┣ 📂pages
 ┃ ┗ ┗ 📜index.jsx
 ┃ ┗ ┗ 📜sobre.jsx
 ┃ ┗ ┗ 📜[slug].jsx
```

**Pasta `public`**

Cada arquivo dentro da pasta public estará disponível na raiz do domínio, no exemplo acima teremos uma rota para um arquivo `/imagem.png`.

Para saber mais consulte a [documentação do Next.js para a pasta public](https://nextjs.org/docs/basic-features/static-file-serving).

**Pasta `src`**

Usada para separar dos arquivos que serão servidos estáticamente dentro da pasta public. Dentro dele criaremos uma pasta chama `pages`, onde cada arquivo será uma rota. No modelo acima, temos os arquivos `index.jsx` e `slug.jsx`.

O arquivo **`index.jsx`** virará o diretório raiz do projeto. Quando acessarmos a rota `meudominio.com`, ele irá buscar nesse arquivo.

**`sobre.jsx`** irá criar a rota `meudominio.com/sobre`.

O arquivo **`[slug].jsx`**, *slug* está entre colchetes, ele irá criar uma rota variável, se entramos em `meudominio.com/qualquercoisa` ele irá cair nessa rota. Esse será o arquivo principal para tratarmos cada postagem dentro do blog estático.

Para saber mais sobre a pasta `pages`, verifique a [documentação de rotas de páginas do Next.js](https://nextjs.org/docs/basic-features/pages).

#### Geração de páginas estáticas

Essa função do Next.js nos deixa criar páginas que podem consumir recursos externos, mas serem geradas na hora em que a aplicação está sendo construida, e não quando o usuário acessa a página, nos dando mais performance e alguns outros benefícios.

#### Funções e componentes auxiliadores

Podemos usar várias das ferramentas do Next.js para facilitar nossa criação de conteúdo. Alguns deles são:
- **`<Link href="/">`:** Componente para auxiliar na mudança de rotas, funciona tanto do lado do cliente (navegador), quanto do lado do servidor (Node);
- **`<Head>`:** Nos permite inserir meta tags por página, tendo mais possibilidades para melhorar o *SEO*
- **`getStaticProps` e `getStaticPaths`:** Funções para buscar recursos estáticos e criação de rotas estáticas, podendo utilizar tanto conteúdo estático (nosso caso com Markdown), ou de lugares externos, como é bastante utilizado com `Headless CMS`.

### Remark

Remark é um processador de Markdown que nos permite transforma-los em HTML e expor para o React.js imprimir o conteúdo na tela.

## Teoria

1. Node irá ler cada arquivo Markdown com o Remark e criará um *Array* com cada objeto de Markdown guardando todas as informações, isso funcionará como nosso *CMS* (*Content Management System*, ou gestor de conteúdo).

<figure>
  <img src="/node-lendo-markdowns.png" alt="Diagrama mostrando o node lendo markdowns" title="Diagrama mostrando o node lendo markdowns">
</figure>

2. O Next.js terá acesso a esse *Array* e irá tanto criar todas as rotas necessárias, como também passar as informações para cada rota.

## Prática

Primeiro vamos criar uma pasta para o nosso blog, recomendo usar o [Visual Studio Code](https://code.visualstudio.com/) para abrir essa pasta para ficar mais simples a organização, mas use o editor de código que achar o melhor.


### Instalando as dependencias que vamos usar
Abra o terminal (se estiver no Visual Studio Code, `Ctrl + J` abre o terminal) e digite o seguinte comando:

``` markdown
npm init
```

Após você dar enter, ele vai perguntar algumas coisas, você pode preencher ou apertar enter que ele vai preencher com as respostas padrões. Depois de responder todas as perguntas, ele criará um arquivo chamado package.json. Se você respondeu alguma coisa de um jeito que não queria, pode editar esse arquivo, ou até mesmo apagar e rodar o comando novamente.

``` markdown
npm i next react react-dom gray-matter remark remark-html
```

Isso instalará todas as dependencias básicas que teremos no projeto.

### Adiciona comandos ao package.json

Após a instalação das dependências, vamos abrir nossos package.json e adicionar os comandos para podermos ver nosso código funcionando, vamos adicionar esse trecho dentro da chave scripts:
``` json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

Estamos adicionando os comandos do Next.js para rodar o projeto, isso inicializa o node com os comandos pré definidos do Next.

O comando `dev`, roda em modo de desenvolvedor, recarregando automaticamente e com algumas outras coisas para agilizar no ambiente de desenvolvimento.

`build` gera uma versão do projeto para rodar em produção, focando em performance do código e carregamento das páginas.

`start` inicia a versão de produção gerada.

### Estrutura do Projeto

Faremos uma estrutura semelhante à estrutura que mostrei explicando as rotas do Next.js. 

``` markdown
📦blog
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┣ 📂posts
 ┃ ┗ 📂services
```

Criamos uma pasta de `components` para conseguir separar o código de uma forma mais organizada. Também criamos uma pasta chamada `posts`, onde guardaremos nossos markdowns. A página services é onde guardaremos nossas buscas por markdowns com o Node.

### Criando um primeiro post

Dentro da pasta `posts`, vamos criar um arquivo chamado `ola-mundo.md`. Como é só um exemplo de post temos liberdade de fazer o que quisermos dentro dele, um exemplo de conteudo que podemos colocar dentro dele:

``` markdown
---
title: Olá mundo!
author: Meu nome :D
date: '2020-08-30T16:53:22.171Z'
---

Seja bem vindo ao meu primeiro post!

## Espero que goste!

Tchau.
```

Nesse exemplo temos o cabeçalho do markdown com os seguintes dado: `title`, `author` e `date`. O date usaremos para ordenar as postagens dentro da página de listagem de postens.

O campo date é uma ISOString, para criarmos uma é bem simples, eu geralmente abro o console e digito o seguinte código:

``` javascript
(new Date()).toISOString()
```

Isso irá nos retornar o dia e hora exato em que o código foi rodado.

### Criando nossa página de lista de postagens

Para criar a nossa primeira rota, na pasta `pages`, criaremos o arquivo `index.jsx`.

Dentro dele podemos escrever:

``` javascript
export default function Page() {
  return <p>Minha rota!</p>;
}
```

Nesse exemplo, estamos apenas exportando uma função que retorna um parágrafo escrito *Minha Rota*. Você pode testar rodando o comando `npm run dev`, e com o seu browser, acessar a url <http://localhost:3000>.

#### Listando nossos markdowns

Para listar nossos markdowns vamos usar o Node, criaremos um arquivo chamado `api.js` (*Application Programming Interface*, ou Interface de Programação de Aplicações), e essa será a nossa conexão entre o Next.js e os Markdowns, com o Node fazendo o processamento desses markdowns.

No código, nós primeiro vamos fazer um lista com todos os markdowns que temos (que por hora é apenas 1).

``` javascript
/**
 * fs é um módulo nativo do Node,
 * não precisamos instalar porque
 * ele vem com o node.
 * 
 * Esse modulo é para ter acesso
 * aos arquivos do computador.
 */
import fs from 'fs';
/**
 * path é outro módulo nativo do
 * Node. Estamos buscando a função
 * join dentro desse módulo
 * 
 * join é uma função usada para unir
 * caminhos (paths) sem ter muito
 * trabalho, e ajudando para funcionar
 * em sistemas operacionais diferentes.
 */
import { join } from 'path';

/**
 * Primeiros definimos a rota onde estão
 * nossos posts.
 * 
 * process.cwd() é uma função do Node
 * que responde o caminho inicial até a
 * pasta onde o node está rodando, que
 * no nosso caso é a pasta onde temos
 * nosso package.json.
 */
const postsDirectory = join(process.cwd(), 'src/posts');

function getMarkdownsFiles() {
  /**
   * Essa função diz, leia o nome de
   * todos os arquivos dentro da pasta
   * que eu especifiquei na variável
   * postsDirectory e me retorne eles
   * em uma array.
   */
  return fs.readdirSync(postsDirectory);
}
/**
 * A função getPostSlugs, irá retornar:
 * > [ 'ola-mundo.md' ]
 */
```

Agora que já sabemos o nome dos nossos arquivos, podendo buscar seu conteúdo de uma forma mais simples.

#### Buscando informações dentro do markdown

Nessa etapa, nós vamos dar um loop dentro do nosso *Array* de nomes de arquivos markdown com a função `getAllPosts`, e dentro de cada um deles, buscar suas informações com a função `getPost`.

``` javascript
import fs from 'fs';
import { join } from 'path';
/**
 * Importamos o matter para conseguirmos
 * buscar os dados do Markdown como um
 * objeto.
 */
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src/posts');

function getMarkdownsFiles() {
  return fs.readdirSync(postsDirectory);
}

/**
 * Criamos uma função para buscar detalhes
 * de um post específico, estamos exportando
 * essa função pois ela será usada na página
 * da postagem, onde não precisaremos buscar 
 * o conteúdo.
 */
export function getPost(slugOrFilename) {
  // Remover o .md do fim do arquivo
  const slug = slugOrFilename.replace(/\.md$/, '');
  // Buscando pelo nome do arquivo markdown, com o .md
  const directory = join(postsDirectory, `${ slug }.md`);
  // Ler o conteúdo do arquivo markdown
  const fileContents = fs.readFileSync(directory, 'utf8');
  /**
   * Buscar o seu conteúdo
   * Com o matter, o cabeçalho do Markdown
   * vem na chave data, e o conteúdo, dentro
   * do content.
   */
  const { data, content } = matter(fileContents);

  /**
   * Retornamos todo o conteúdo do markdown
   * junto com o slug.
   */
  return { content, slug, ...data };
}

/**
 * Criamos uma função para buscar
 * todos os posts. Exportamos também
 * para consegir buscar de dentro da página
 * de listagem de posts
 */
export function getAllPosts() {
  /**
   * Utilizamos a nossa função para
   * retornar um array com os nomes
   * dos markdowns que temos.
   */
  const slugs = getMarkdownsFiles();
  
  /**
   * Criamos uma map (um loop em cada
   * índice do array de slugs, que irá nos
   * retornar outro array) que chama uma
   * função para cada slug buscando detalhes
   * do post.
   */
  const posts = slugs
    .map(slug => getPost(slug));

  /**
   * Retornamos o post com
   * seus respectivos detalhes.
   */
  return posts;
}
```

Na função `getAllPosts` utilizamos o método do *Javascript* [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Documentação do map() no MDN"), ela faz um loop dentro da *Array*, retornando o exato número de itens da *Array* com o tratamento que escolhermos.

#### Filtrando o conteúdo das postagens

Com o código que temos até agora, recebemos todo o conteúdo do markdown assim:

``` javascript
{
  title: 'Olá mundo!',
  author: 'Meu nome :D',
  date: '2020-08-30T16:53:22.171Z',
  content: 'Uma string com todo o conteúdo do markdown'
}
```

Vamos filtrar o conteúdo de cada postagem de uma forma dinâmica, para buscarmos somente o que precisamos, um exemplo, na página de listagem de conteúdo não precisamos do conteúdo da postagem, apenas do título, data e slug.

``` javascript
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src/posts');

function getMarkdownsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPost(slugOrFilename, fields = []) {
  const slug = slugOrFilename.replace(/\.md$/, '');
  const directory = join(postsDirectory, `${ slug }.md`);
  const fileContents = fs.readFileSync(directory, 'utf8');

  
  const { data, content } = matter(fileContents);

  /**
   * Recebendo o campo fields, podemos criar nossa
   * postagem filtrada
   */
  const post = {};

  /**
   * Faremos um loop dentro dos campos necessários
   * para preencher nosso objeto post.
   */
  fields.forEach(field => {
    // Se houver o campo conteúdo, o adicionamos
    if (field === 'content') post[field] = content;
    // Se houver o campo slug, o adicionamos
    if (field === 'slug') post[field] = slug;
    /**
     * Se houver o campo dentro do cabeçalho do
     * markdown, o adicionamos no post
     */
    if (data[field]) post[field] = data[field];
  })

  /**
   * Retornamos o nosso post filtrado
   */
  return post;
}

/**
 * Na função getAllPosts inserimos um novo
 * parâmetro para escolher os campos que
 * queremos. Ele é um array com a chave dos
 * campos que queremos.
 */
export function getAllPosts(fields) {
  const slugs = getMarkdownsFiles();
  
  const posts = slugs
    /**
     * Passamos o Array de campos para dentro
     * da função getPost.
     */
    
    .map(slug => getPost(slug, fields));

  return posts;
}
```

Alterando nosso código com o parâmetro novo `fields` e utilizando o [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter "Documentação do .filter()") podemos escolher os campos que queremos quando formos chamar a função, podemos usar assim:

``` javascript
getAllPosts(['title', 'date', 'slug']);
```

Irá nos retornar os posts com o conteúdo especificado na array, que no caso não queremos a chave content, com o conteúdo do markdown.

``` javascript
[
  {
    title: 'Olá mundo!',
    date: '2020-08-30T16:53:22.171Z',
    slug: 'ola-mundo'
  }
]
```

#### Ordernando as postagens

Para ordernar é bem simples, já temos o campo `date` no cabeçalho do nosso markdown, utilizaremos ele para ordernar nossos posts.

``` javascript
export function getAllPosts(fields = []) {
  const slugs = getMarkdownsFiles();
  
  const posts = slugs
    .map(slug => getPost(slug, fields))
    /**
     * Usaremos o .sort() para ordernar nossa
     * listagem de posts por data.
     */
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}
```

Nossa função getAllPosts recebeu só mais uma linha com o método para arrays chamado [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort "Documentação MDN do .sort()"). Esse é um método um pouco dificil de começar a entender (foi para mim, pelo menos hahaha), mas depois fica mais tranquilo para usar.

#### Adicionado dados à listagem de posts

Para isso voltaremos para nosso arquivo `src/pages/index.jsx` e chamaremos a função que acabamos de terminar chamada `getAllPosts()`.

``` javascript
// Importamos nossa função de buscar os posts
import { getAllPosts } from '../services/api.js';

export default function Page() {
  return <p>Minha rota!</p>;
}

/**
 * A função getStaticProps é do nextjs,
 * Ela busca recursos estáticos para a sua página,
 * sendo assim não precisamos do servidor, ele gera
 * a página com o conteúdo que lhe foi enviado. 
 */
export function getStaticProps() {
  // Chamamos ela com os campos que queremos
  const posts = getAllPosts([ 'title', 'date', 'slug' ]);

  // Retornamos ele como props para a página.
  return {
    props: { posts }
  }
}
```

Utilizamos a função [getStaticProps()](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation "Documentação da função getInitialProps() do Next.js") do Next.js para trazer nossos recursos estáticos (que não mudam por um sistema externo).

#### Criando a listagem de posts com os dados estáticos

Agora que buscamos nossos dados e colocamos na nossa rota, podemos utilizar ele no React.js do jeito que quisermos, fiz um modelo extremamente básico para mostrar como as postagem podem ser consumidas:

``` javascript
import Link from 'next/link';
import { getAllPosts } from '../services/api.js';

export default function Page({ posts }) {
  return (
    <>
      <h1>Meu blog!</h1>
      <p>Listagem de posts:</p>
      {
        posts.map(post => 
          <p>
            <Link href={ `/${ post.slug }` }>
              <a>{ post.title }</a>
            </Link>
          </p>
        )
      }
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts([ 'title', 'date', 'slug' ]);

  return {
    props: { posts }
  }
}
```

Utilizamos o componente `<Link>` do NExt.js para conseguirmos fazer a transição de páginas pelo lado do navegador (sem fazer uma outra requisição para o servidor, apenas buscando o Javascript da outra página e assim sendo mais rápido para carregar).

Sua página deve ficar semelhante a esta:

<figure>
  <img src="/listagem-de-posts-sem-estilo.png" title="Página de listagem de postagens sem estilo" alt="Página de listagem de postagens sem estilo">
</figure>

Podemos adicionar um pouco de CSS para ficar um pouco mais moderna, assim:

<figure>
  <img src="/listagem-de-posts-com-estilo.png" title="Página de listagem de postagens com estilo" alt="Página de listagem de postagens com estilo">
</figure>

O Next.js nos da algumas ferramentas para CSS, como [CSS Module, SAS Se  CSS in JS](https://nextjs.org/docs/basic-features/built-in-css-support "Documentação do Next.js para CSS"), recomendo a leitura para você conseguir fazer o seu conteúdo ficar com a cara que desejar.

Na página atual temos um link que leva para uma página de Erro 404, porque ainda não criamos a rota de postagem. Para a rota de post criaremos o arquivo `src/pages/[slug].js`, e lá teremos todo o conteúdo da nossa postagem.

#### Criando a página de postagem única

O arquivo `[slug].js` é um arquivo que o Next.js irá considerar como rota, onde conseguiremos ter o slug como variavel dentro da nossa rota. Se entramos em <http://localhost.com/ola-mundo> teremos o `slug` igual à string `ola-mundo`.

Nessa parte do código iremos usar a função que criamos `getPost()`, se lembram que ela requer dois parametros? O nome do markdown ou a slug, e os campos necessários. É bem semelhante à criação da listagem de posts, mas buscando apenas um, ao invéz de todos.

``` javascript
// Importamos nossa função de buscar posts
import { getPost } from '../services/api.js';

export default function Page({ post }) {
  return (
    <>
      <h1>{ post.title }</h1>
      <p>{ post.author } · { post.date }</p>
      <p>
        { post.content }
      </p>
    </>
  );
}

/**
 * A função getStaticProps nos traz os
 * parâmetros que foram utilizados para
 * fazer a requisição, com ele conseguimos
 * usar o nosso slug que foi trazido para
 * nós a partir da URL.
 */
export function getStaticProps({ params }) {
  /**
   * Utilizamos a função de buscar postagem
   * passando o nome da rota (ola-mundo, nesse caso) 
   * e os campos que queremos.
   */
  const post = getPost(params.slug, [
    'title',
    'date',
    'author',
    'slug',
    'content'
  ]);

  return {
    props: { post }
  }
}
```

Para sevir os arquivos de forma estática com uma variável na URL, o Next.js requer que usemos uma outra função dele, a [`getStaticPaths()`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation "Documentação do getStaticPaths() do Next.js). Essa função dirá ao Next quais são as rotas que ele tem que gerar, para não precisarmos buscar essas informações no servidor, gerando tudo quando rodarmos o comando `npm run build`.

#### Rotas estáticas para as postagens do Blog

Usamos a função `getStaticPaths()` e diremos ao Next.js todas as rodas possíveis no blog, que no caso, é uma rota para cada arquivo markdown dentro da pasta `src/posts`.

``` javascript
// Importamos a nossa função getAllPosts()
import { getPost, getAllPosts } from '../services/api.js';

export default function Page({ post }) {
  return (
    <>
      <h1>{ post.title }</h1>
      <p>{ post.author } · { post.date }</p>
      <p>
        { post.content }
      </p>
    </>
  );
}

export function getStaticProps({ params }) {
  const post = getPost(params.slug, [
    'title',
    'date',
    'author',
    'slug',
    'content'
  ]);

  return {
    props: { post }
  }
}

// Usamos a função do Next.js, getStaticPaths()
export function getStaticPaths() {
  // Buscamos todos os slugs e date de todos os posts
  const posts = getAllPosts(['slug', 'date']);

  return {
    /**
     * Retornamos para cada rota o parâmetro slug,
     * para conseguirmos usá-lo na função
     * getStaticProps acima.
     */
    paths: posts.map(post => ({
        params: {
          slug: post.slug
        }
    })),
    /**
     * A opção fallback: false fala para o Next.js
     * não tentar executar essa rota se o arquivo
     * markdown para ela não existir
     */
    fallback: false
  };
}
```

Nossa página ficará parecida com essa sem nenhum CSS>

<figure>
  <img src="/post-com-markdown-sem-estilo.png" title="Post com markdown sem estilo" alt="Post com markdown sem estilo">
</figure>

Adicionando um pouco de estilo, a postagem ficará assim:

<figure>
  <img src="/post-com-markdown-com-estilo.png" title="Post com markdown com estilo" alt="Post com markdown com estilo">
</figure>

Reparem que temos dois problemas por hora: A data não está formatada, e um problema levemente maior, **o markdown ainda não virou HTML**. Agora está na hora de fazer o Remark brilhar e fazer essa transformação markdown -> HTML.

#### Transformando Markdown para HTML com Remark

Para fazer essa transformação criaremos um novo arquivo dentro da pasta `src/services`, chamado `markdown.js`.

Dentro desse arquivo terá nossa função responsável por transformar uma *String* em HTML para ser interpretado pelo React.js.

``` javascript
/**
 * Importamos os módulos que instalamos
 * pelo NPM.
 */
// Processador para parsear markdown
import remark from 'remark';
// Serializador de markdown para string
import html from 'remark-html';

/**
 * Criamos nossa função de transformar
 * string em HTML.
 * Ela é uma função assincrona, o que
 * ela sempre responderá uma Promise e
 * nos dará a possibilidade de esperar uma
 * Promise dentro dela terminar para 
 * continuar de uma forma simples.
 */
export async function toHTML(markdown) {
  // Processamos nosso conteúdo Markdown
  const result = await remark()
    .use(html)
    .process(markdown);

  /**
   * Retornamos ele de volta em formato
   * de String.
   */
  return result.toString();
}

/**
 * Exportamos o padrão como um objeto
 * com a função para ficar mais bonito
 * utilizá-lo, utilizaremos ela assim:
 * markdown.toHTML(content)
 */
export default { toHTML };
```

Essa função nos da tudo o que precisamos para renderizar o Markdown como react dentro do nosso conteúdo, agora vamos usá-la para transformar nossa nova *String* de HTML no React.js.

``` javascript
// Importamos nossa função markdown
import markdown from '../services/markdown.js';
import { getAllPosts, getPost } from '../services/api.js';

export default function Page({ post }) {
  return (
    <div style={{
      margin: 'auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif'
    }}>
      <h1>{ post.title }</h1>
      <p>{ post.author } · { post.date }</p>
      { /*
      Inserimos nosso na String HTML com
      dangerouslySetInnerHTML, para o React.js
      a interpretar como HTML.
      */ }
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

/**
 * Transformamos a função getStaticProps
 * em assincrona
 */
export async function getStaticProps({ params }) {
  const post = getPost(params.slug, [
    'title',
    'date',
    'author',
    'slug',
    'content'
  ]);

  /**
   * Como a função toHTML é async, ela
   * retorna uma Promise, então devemos 
   * aguardar ela ser finalizada com o await.
   */ 
  post.content = await markdown.toHTML(post.content);

  return {
    props: { post }
  }
}

export function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  };
}
```

Agora quando você rodar o projeto, ele irá ter a sua lista de postagens, ordenado por mais recente, e também conseguirá rodar todas as páginas de forma estática, em breve postarei mais conteúdos sobre esse projeto, como deploy entre outras coisas.

Se você tem alguma dúvida, entre em contato comigo pelo twitter [@dioruto](https://twitter.com/dioruto).

Esse blog onde você está lendo esse artigo foi feito da mesma forma, mas com algumas coisas a mais para sanar as minhas necessidades, mais tratamentos de erros e performance SEO. Para ver como está acesse o [repositório no GitHub](https://github.com/imaginamundo/dio.dev).

Pronto, agora você tem um blog com Markdown, ainda não 100% otimizado, mas bem rápido.

[Baixar o resultado inteiro desse artigo](/blog.rar).
