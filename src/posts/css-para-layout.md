---
icon: 📱  🖥
title: CSS para layout
summary: Dicas para desenvolver com HTML e CSS para sites responsivos
date:
  iso: '2021-04-18T18:07:48.547Z'
  formated: 18/04/2021
---

Esse artigo é baseado em uma apresentação que fiz na empresa onde trabalho.

## Métodos de disposição (display)

Os métodos de `display` são para controlar a disposição, tamanho e interação com outros elementos que estão disputando por espaço por perto.

### `display: none`

Esse é o modelo mais cru, apenas não exibe o elemento na página.

### `display: block`

Ocupa a linha inteira onde estiver. Se um elemento com block estiver em uma linha, ele vai estar lá sozinho (a menos que o elemento pai tenha `display: flex` ou `display: grid`).

<figure>
  <img src="/display-block.png" alt="Exemplo de como uma div ocupa 100% da largura do elemento pai">
</figure>

Código para `display: block`:

``` html
<style>
  div {
    background: tomato;
  }
</style>

<button>
  button
</button>
<button>
  button
</button>
<div>
  div
</div>
<button>
  button
</button>
<button>
  button
</button>
```

O motivo da div estar ocupando uma linha inteira, é porque ela tem `display: block` por padrão, isso significa que ela vai ocupar a largura possível do elemento pai. Mesmo se forçarmos o tamanho dela para ser menor, ela ainda ocupará uma linha inteira.

Os `<button>` não estão ocupando uma linha inteira, pois seu padrão é ter `display: inline-block`.


### `display: inline`

`display: inline`, como o nome diz, é um que ocupa o espaço que se diz, e permite que outros elementos sejam colocado a seu lado. Ele tem uma característica boa para elementos dentro de textos, pois não altera o ritmo e espaçamentos do texto na horizontal, dando a possibilidade de fazer mudanças visuais em conteúdo menores dentro de um texto.

<figure>
  <img src="/display-inline.png" alt="Elemento com display inline com seu fundo sobrepondo outros conteúdos">
</figure>

Código para `display: inline`:

``` html
<style>
  span {
    padding: 8px;
    background: rgba(0, 0, 0, .3);
    border: 1px dotted black;
  }
</style>

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt rem asperiores cumque corrupti aperiam. Magnam <span>doloribus</span> aliquam magni, alias mollitia dignissimos eos? Fugit, quis dolorum excepturi reiciendis aliquid in et.
```

No exemplo, usamos o `<span>`, que tem naturalmente `display: inline`. Se você reparar bem, ele adiciona `padding` (um espaço interno) de `8px`. Mas ele não mexe nas linhas acima ou abaixo, ele só move o conteúdo anterior e posterior na horizontal. Esse tipo de display é bastante recomendado para textos.

### `display: inline-block`

É uma mistura do `inline` e do `block`. Ele não ocupa uma linha inteira, mas ele consegue alterar o fluxo horizontal de um texto.

<figure>
  <img src="/display-inline-block.png" alt="Inline block alterando o espaçamento entre as linhas">
</figure>

Código para `display: inline-block`:

``` html
<style>
  span {
    display: inline-block;
    padding: 8px;
    background: rgba(0, 0, 0, .3);
    border: 1px dotted black;
  }
</style>

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt rem asperiores cumque corrupti aperiam. Magnam <span>doloribus</span> aliquam magni, alias mollitia dignissimos eos? Fugit, quis dolorum excepturi reiciendis aliquid in et.
```

## Métodos de disposição que alinha os filhos

São os métodos de disposição que podem ter as propriedades do `display: block` e `display: inline-block`, porém com a capacidade de alterar a disposição dos elementos filhos.

### `display: flex`

Hoje em dia é o display que mais uso, por ser muito versátil no desenvolvimento responsivo.

Esse método é para organização dos elementos filhos diretos. Eu gosto de utilizar quando estamos trabalhando com apenas uma orientação (vertical ou horizontal).

Age como `display: block`, porém também mexe na disposição de todos os filhos diretos. Ele tem muitas capacidades, você pode aprender bastante sobre ele no site do [Flexbox Froggy](https://flexboxfroggy.com), que tem exercícios práticos para aprender.

Vou mostras as principais opções que ele da, que são as que eu mais uso.

<figure>
  <img src="/display-flex.png" alt="Exemplo de como o flex consegue transformar mudar como blocks se ajustam">
</figure>

Código para `display: inline-block`:

``` html
<style>
  main {
    display: flex;
  }
  div {
    background: tomato;
    border: 1px solid;
    padding: 0 2px;
  }
</style>

<main>
  <div>Hello</div>
  <div>world!</div>
</main>
```

No exemplo acima, podemos enxergar como o método de exibiçao padrão das `divs` são alterados quando o elemento pai está com `display: flex`. Ele deixa por padrão a largura o tamanho do conteúdo dos filhos, e a altura de todos os elementos com a altura do maior elemento.

Podemos modificar a largura de um filho especificando no próprio elemento filho (que nesse caso de exemplo é uma `div`).

A altura, podemos tanto especificar no elemento que deseja mudar a altura, ou deixando todas com o tamanho do conteúdo alterando o `align-items`.

<figure style="max-width: 473px">
  <img src="/flex-cabecalho.png" alt="Utilizando flexbox para gerar um cabeçalho semelhante ao deste site">
</figure>

<figure style="max-width: 277px">
  <img src="/flex-cabecalho-responsivo.png" alt="Amostra de responsividade do cabelho com flexbox">
</figure>

Cabeçalho responsivo com `flexbox` sem o uso de `media-queries`:

``` html
<style>
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  div {
    background: tomato;
    border: 1px solid;
    padding: 0 2px;
  }
</style>

<main>
  <h1>
    Logo do site
  </h1>
  <nav>
    <a href="#">Página inicial</a>
    <a href="#">Sobre</a>
    <a href="#">Contato</a>
  </nav>
</main>
```

Esse display consegue ser responsivo sem o uso de `media-queries` (que são especificações de css de acordo com tamanho de tela, impressão, entre outros) quando utilizamos o `flex-wrap`. O `flex-wrap` quebra a linha do flex quando os elementos não cabem mais na mesma.

Também utilizei o `align-items: center` para alinhar o título *Logo do site* com o menu, pois o título por ter uma altura maior, ocupa maior espaço.

Recomendo brincar com o FlexboxFroggy para conseguir aproveitar bastante as propriedades do flexbox.

### `display: grid`

Esse é um modelo bem complexo, gosto de usar para quando estou trabalhando nas duas orientações (horizontal e vertical), que formam uma matriz (como uma tabela, mesmo).

Como o `flexbox`, o `display: grid` também tem um site que ajuda a aprender como utilizá-lo, o [Grid Garden](https://cssgridgarden.com).

<figure>
  <img src="/display-grid.png" alt="Exemplo de como o grid cria uma tabela, com configurações como vão (gap)">
</figure>


Código para um `grid` responsivo sem o uso de `media-queries`:

``` html
<style>
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1em;
  }
  div {
    background: tomato;
    border: 1px solid;
    padding: 1em;

  }
</style>

<main>
  <div>div</div>
  <div>div</div>
  <div>div</div>
  <div>div</div>
  <div>div</div>
  <div>div</div>
</main>
```

A linha mais importante desse caso de `display: grid` é a `grid-template-colums`, que define o tamanho da coluna. Com ela definimos o tamanho mínimo e o máximo da largura dos itens dentro da nossa grade. Onde está escrito `auto-fit` é o número de colunas que queremos, podemos colocar um número fixo ou deixar o navegador escolher para a gente de acordo com o tamanho da largura do dispositivo que está acessando a página, ou da limitação que tem o elemento pai.

Como funciona esse cálculo? Temos o tamanho mínimo de `400px`, e o máximo de `1fr` (uma fração), o navegador vai olhar o tamanho disponível para os elementos, e se couber 2 elementos de `400px`, ele colocará 2, se couber 3, 1, 6, o navegador faz esse cálculo sozinho e não precisamos nos preocupar com essas coisas. Podemos ainda utilizar `media-queries` para ajustes, não utilizo muito.

O `gap`, é o espaço entre os elementos dentro do `grid`.

## Alguns truques a mais

Como última parte desse artigo, vou deixar algumas dicas de como desenvolver sem ter que alterar tudo de forma específica.

### Formatação de textos, títulos e links

Eu gosto de formatar os textos do site diretamente na raiz, para ter apenas um lugar para alterar.

``` css
:root {
  --font-family: sans-serif;
}


body {
  margin: 0;                       // Para tirar a margem padrão de 8px
  line-height: 1.62em;             // Um espaço padrão entre as linhas agradável
  font-family: var(--font-family); // Definir a fonte logo no começo
}

a {
  color: #0074de;
}

a:hover {
  color: #68b5fb;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2em
}

input, button, textarea {
  // Inputs tem tamanho e fontes diferentes por padrão
  font-size: 1em; 
  font-family: var(--font-family);
}
```

### Criar um container com um tamanho máximo

Utilizo para delimitar a largura máxima que quero que meu conteúdo consiga alcançar, considero importante por questão de leitura para não deixar linhas muito longas.

<figure>
  <img src="/container.png" alt="Como o container é exibido no navegador">
</figure>

``` css
.container {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}
```

