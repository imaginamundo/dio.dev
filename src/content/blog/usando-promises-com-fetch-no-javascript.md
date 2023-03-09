---
icon: 🤲
title: Usando promises com fetch no javascript
description: Fazer requisições e tratar seus respectivos erros com o auxilio de promises
publishedAt:
  iso: 2020-10-08T07:00:06.896Z
  formated: 08/10/2020
---

## Começando do começo: o que são *promises*?

<figure>
  <img src="/promise.png" alt="Modelo de funcionamento de uma promise" title="Modelo de funcionamento de uma promise">
</figure>

A tradução da palavra promise, é promessa (um ótimo cognato). Sabendo disso podemos dizer que uma promise no javascript é uma promessa. Quê tipo de promessa? Uma promessa, é um comprometimento de que a sua requisição vai ser concluida, com sucesso ou não, num período não específico independente da ordem do código.

<figure>
  <img src="/execucao-de-promise.png" alt="Exemplo de tempo de execução da promise" title="Exemplo de tempo de execução da promise">
</figure>

Esse sucesso depende de muitos fatores, como a saúde de onde você está fazendo essa requisição, se você tem os recursos necessários para executar essa requisição (como internet, permissão de leitura de arquivos, etc…) entre outros fatores.

A promise é uma forma de você falar para o código:

— Você executar essa tarefa especial?

— Sim, e ainda vou continuar com as outras tarefas.

Isso é porque o comportamento padrão de uma promise é assíncrono (uma palavra muito complicada que odeio). Essa capacidade assíncrona da promise é só um jeito de dizer que ela será executada em paralelo, sem impedir a continuidade do código.

<figure>
  <img src="/promise-chat.png" alt="Conversação sobre promises" title="Conversação sobre promises">
</figure>

Espero que tenha conseguido explicar como funciona uma promise aqui, porque é a coisa que considero mais complicada do javascript e foi uma das coisas mais dificeis de fazer entrar na minha cabeça.

## Como criar uma *promise*

Existem diversos métodos de criar uma promise, vou citar os mais comuns.

### Criando uma promise com o *new Promise*

Esse modelo é mais utilizado quando você quer transformar um modelo síncrono (que espera sua finalização), em um assíncrono (que envia a sua função para o reino das promises).

``` javascript
/**
 * Usamos o new Promise para criar a promise,
 * ela recebe como parâmetro uma função.
 * Essa função têm dois parâmetros, resolve e
 * reject.
 * Usamos resolve quando queremos retornar o
 * sucesso e reject quando queremos demonstrar
 * a falha.
 */
const promise = new Promise((resolve, reject) => {
  /**
   * Adicionei um setTimeout para falar que
   * essa promise precisa esperar 300
   * milisegundos para retornar (resolve)
   * o seu resultado
   */
  setTimeout(() => {
    resolve('mundo!');
  }, 300)
});

/**
 * O .then() é um código padrão para quando
 * a promise finalizar, com sucesso ou falha.
 * Isso vai executar o que você quer fazer 
 * com o resultado quando sua promise retornar
 * o resultado esperado.
 */
promise.then(response => {
  console.log(response);
});

/**
 * Executando uma operação para criar um
 * console, apenas para exemplo de que,
 * como a promise está esperando 300
 * milisegundos para terminar, esse código
 * vai ser executado antes do término da
 * resolução da promise.
 */
console.log('Olá,');
```

Nesse modelo de código exemplo criamos uma promise, esperamos 300 milisegundos para concluir e logo depois executamos o comando `console.log()`. 

Como a promise trabalha em um modelo assíncrono, ela vai continuar executando o resto do código. Então neste modelo teremos no código primeiro executando o `console.log()`, e depois de 300 milisegundos (não exatamente, porque programação trata tempo de uma forma engraçada), ele vai conseguir cumprir a promessa.

O resultado final dessa operação será:

``` markdown
Olá,
mundo!
```

### Usando uma função assíncrona (*async*)

Uma função `async` vai sempre retornar uma promise, para utilizar esse tipo de função basta colocarmos a palavra-chave `async` quando criamos a função.

``` javascript 
async function myFunction() {
  return 'Olá, mundo!';
}

const myConstArrowFunction = async () => {
  return 'Olá, mundo!';
}

const myConstArrowFunction = async function() {
  return 'Olá, mundo!';
}
```

Os 3 exemplos de função com a palavra `async` são promises. Essas funções que criei são muito simples e elas não demorarão para respostar o que ela está retornando. Por ser tão rápida você não vai conseguir ter a percepção de paraleslimos (comumente conhecida como assíncrona).

As funções `async` tem outro ponto fantástico dentro delas, podemos ter outras promises dentro dela e remover o áspecto assíncrono (que consegue rodar em paralelo) delas, usando a palavra `await` dentro de uma função assíncrona. Esse é o jeito mais prático de trabalhar com promises hoje em dia.

<figure>
  <img src="/execucao-de-promise-await.png" alt="Exemplo de tempo de execução da promise com await" title="Exemplo de tempo de execução da promise com await">
</figure>

``` javascript
/**
 * Criamos nossa função assíncrona com a
 * palavra-chave async no começo dela
 */

async function runMyCode() {
  /**
   * Dentro dela eu crio uma promise para
   * executar alguma coisa que preciso
   */
  const promise = new Promise((resolve, reject) => {
    /**
     * Adicionando setTimeout para
     * exemplificar o tempo que uma promise
     * demoraria para responder
     */
    setTimeout(() => {
      /**
       * Respondendo o que a promise gostaria
       */
      resolve('mundo!');
    }, 300);
  });


  /**
   * Usando a palavra-chave await, podemos
   * falar para função: espere até essa
   * promise responder para responder,
   * tornando-a síncrona (não paralela)
   */
  await promise.then(response => {
    console.log(response);
  });
  
  /**
   * Executando outro comando para mostrar
   * o fim do código assíncrono
   */
  console.log('Olá,');
}

runMyCode();
/**
 * Executando a função async, dentro dela
 * utilizando o await irá retonar:
 * mundo!
 * Olá,
 * 
 * O oposto do teste anterior porque pedimos
 * para a promise aguardar sua finalização
 */
```

### Criando uma promise com a função *fetch*

O *fetch* é uma função do javascript que permite você executar ações que utilizam o protocolo *HTTP* para buscar recursos que você precisa. Isso significa que você consegue trazer todo o conteúdo de qualquer site utilizando uma simples função.

A resposta de um fetch não é exatamente o conteúdo específico, esse conteúdo está atrás de outra promise. O Javascript está trazendo todos os dados da sua requisição, como status da sua requisição, cabeçalhos, url, entre outras coisas.

Para buscar exatamente o corpo da resposta, devemos usar a resposta da requisição e então comandar: eu quero esse corpo em formato *JSON*.

<figure>
  <img src="/possibilidades-do-fetch.png" alt="Exemplo de respostas para o fetch" title="Exemplo de respostas para o fetch">
</figure>

Temos modelos muito bons de trabalho com o *fetch*, como *JSON* e *XML*. Esses modelos são bons porque nos trazem dados estruturados para conseguir buscar apenas a informação que precisamos e não qualquer página inteira da internet para buscarmos a informação dentro dela.

Esse é um dos jeitos mais simples de criar uma promise, porque basicamente todo o retorno da função fetch, é uma promise.

``` javascript
/**
 * Criamos uma constante que seu valor
 * está ligado a uma função fetch que
 * nesse exemplo é uma busca na pokeapi
 */
const buscarPokemon = fetch('https://pokeapi.co/api/v2/pomemon/1/');

buscarPokemon
  .then(res => {
    /**
     * Sabendo que o retorno dessa função
     * é um JSON, eu digo, após terminar a
     * execução da promise, transforme o
     * seu resultado em um JSON 
     */
    return res.json();
  })
  .then(res => {
    /**
     * Apenas logando a resposta em formato
     * JSON vindo da promise
     */
    console.log(res);
  });
```

## Ordem de resolução de *promises*

### Por ordem

As vezes precisamos ordernar nossas promises em uma ordem específica, porque precisamos fazer as coisas de um certo jeito específico que necessitem de uma ordem.

Para isso podemmos usar o método `Promise.all()`. Esse método espera um array de promises para conseguir resolver todas as promises e retornar na mesma ordem que estão na *array*.

``` javascript
/**
 * Criando uma lista para armazenar promises
 */
const pokemons = [];

/**
 * Lista de itens que quero que retornem nas
 * promises.
 */
const neededPokemons = [ 1, 2, 3 ];

/**
 * Um loop nas requisições que quero para trazer
 * meus dados específicos. Nesse caso estou
 * querendo os Pokemons de Id 1, 2 e 3.
 */
for (let i = 0; i < neededPokemons.length; i++) {
  /**
   * Utilizo o método push para adicionar cada
   * array dentro da minha lista de promises.
   */
  pokemons.push(
    fetch(`https://pokeapi.co/api/v2/pokemon/${ neededPokemons[i] }/`)
      /**
       * Chamo o método .then() e digo:
       * espero que todas as respostas sejam
       * json.
       */
      .then(res => res.json())
  );
}

/**
 * Espero a resolução de todas as promises
 * na ordem que as enviei (1, 2 e 3).
 * Isso significa que vai trazer esses pokemons
 * da lista na sua ordem.
 */
await Promise.all(pokemons);

/**
 * Após todas as promises serem resolvidas, o
 * código continua e agora ao invéz de termos
 * uma array de promises, temos uma array de
 * pokemons vindo de um recurso HTTP externo.
 */
console.log(pokemons);
```

O método `Promise.all()` para se qualquer promise retornar um erro, para continuar mesmo se houver erro devemos utilizar `Promise.allSettled()`.

### Esperar uma promise para continuar com outra

Conseguimos fazer um modelo de promise com o `async / await`, como vimos anteriormente.

Esse modelo não tem muito segredo, esperamos a resolução da promise com o `await` e logo usamos os dados dela.

``` javascript
/**
 * Esperamos a requisição de um pokemon com
 * Id 1 terminar.
 */
const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/1')
  /**
   * Dizemos que esperamos que o resultamos
   * que esperamos é um JSON.
   */
  .then(res => res.json());

/**
 * Conseguimos utilizar os dados da promise logo em seguida
 */
console.log(pokemon.name);
```

### Corrida de promises

Para isso podemos utilizar o método `Promise.race()`. Com isso o javascript para de tentar continuar outras requisições assim que completa a primera, seja com sucesso ou falha. Esse um dos jeitos de adicionar um timeout ao comando `fetch()`, que não tem um limite de tempo esperado para suas requisições. (Isso enquanto não temos um método para abortar uma requisição em todos os browser, que é o `AbortController()`).

``` javascript
function fetchTimeout() {
  /**
   * Nossa requisição (que poderia ser um
   * parâmero na função acima, mas deixei
   * mais simples para exemplo)
   */
  const promise = fetch('https://pokeapi.co/api/v2/pokemon/1')

  const timeout = new Promise((_, reject) =>
    /**
     * Adicionamos um timeout para a promise
     * curtissimo, apenas para teste de cair
     * no erro. Se a promise acima não se
     * resolver em 10 milisegundos, nós
     * enviamos um erro porque não queremos
     * esperar mais do que isso.
     */
    setTimeout(() => reject(new Error('Timeout')), 10)
  );

  /**
   * Retornamos uma corrida de promises
   * com um array com nossas promises. A
   * que resolver primeiro será a ganhadora!
   */
  return Promise.race([
    promise,
    timeout
  ]);
}

/**
 * Chamo a função e utilizo o .catch() para
 * validar a resposta veio com o erro de
 * timeout que especificamos. 
 */
fetchTimeout()
  .then(res => res.json())
  .catch(err => console.log(err));
```

O modelo com o `AbortController()` é muito mais bonito e prático de usar. Ele foi feito para cancelar uma promise, independente de onde ela vem. Com isso não precisamos criar uma outra promise específica com um setTimeout.

Esse é claramente meu modelo favorito, por isso vou colocar exatamente do jeito que gosto de usar:

``` javascript
/**
 * Fetch com timeout usando Abort Controller.
 * @param { string } url - A Url para a requisição
 * @param { number } ms - Tempo de timeout em milisegundos
 * @param { Object } options - Opções para a requisição 
 */

const fetchTimeout = (url, ms = 7000, { signal, ...options } = {}) => {
  /**
   * Criamos o controlador da função,
   * podemos enviar um sinal quando
   * quisermos.
   */
  const controller = new AbortController();

  /**
   * Nossa promise recebendo o signal como
   * parametro em suas opções
   */
  const promise = fetch(url, { signal: controller.signal, ...options });

  /**
   * Se houver um sinal externo, utilizamo-os,
   * pois talvez essa requisição necessite
   * terminar não por tempo, mas por alguma
   * outra ação.
   */
  if (signal) signal.addEventListener("abort", () => controller.abort());
  /**
   * Se chegar na quantidade específica de
   * milisegundos que definimos, cancelamos
   * a requisição enviando um sinal para
   * aborta-la.
   */
  const timeout = setTimeout(() => controller.abort(), ms);
  /**
   * Limpamos o timeout para evitar processamentos
   * desnecessários.
   */
  return promise.finally(() => clearTimeout(timeout));
};
```

Embora não consiga usar para os navegadores ainda, utilizo esse método com o [Deno](https://deno.land "Site do Deno, para usar Javascript/Typescript no servidor").

## Tratamento de erros em *promises*

Para tratamento de erros em promises existem dois modelos principais, vamos ver.

### *.catch()*

Esse é meu modelo de preferência, por conseguir usar ele diretamente na promise ou na própria execução do fetch.

``` javascript
/**
 * Exemplo 1:
 * Adicionando a promise numa constante,
 * depois adicionando o tratamento de erro.
 */
const promise = fetch('https://pokeapi.co/api/v2/pokemon/1');

promise.catch((err) => {
  console.log(err);
})

/**
 * Exemplo 2:
 * Diretamente no fetch.
 */
fetch('https://pokeapi.co/api/v2/pokemon/1')
  .catch(err => {
    console.log(err);
  });
```

### Try and catch

Esse é o modelo mais global do javacript para tratamento de erros, funciona além de tratar apenas os erros nelas.


``` javascript
try {
  fetch('https://pokeapi.co/api/v2/pokemon/1')
} catch(err) {
  console.log(err);
}
```

Evito usar esse modelo para promises pois acho o .catch() mais simples de usar.

### Tratamento mais comum de promise

Esse é o tratamento para fazer o método fetch funcionar mais parecido com o `ajax` do jQuery e também como o `Axios` funciona. Vou editar a minha função utilizando o abortController adicionando o tratamento.

``` javascript
const request = (url, ms = 3000, { signal, ...options } = {}) => {
  const controller = new AbortController();
  const promise = fetch(url, { signal: controller.signal, ...options });

  
  if (signal) signal.addEventListener("abort", () => controller.abort());

  const timeout = setTimeout(() => controller.abort(), ms);
  return promise
    /**
     * Se a resposta estiver ok (status entre 200 e 299),
     * continuamos com a requisição, se não, rejeitamos.
     * 
     * E ainda adiciono todas as informações que considero
     * relevantes do erro para facilitar o tratamento deles.
     */
    .then(res => {
      if (res.ok) return res;
      const err = new Error(res.status);
      err.url = res.url;
      err.status = res.status;
      err.statusText = res.statusText;
      err.headers = res.headers;
      err.redirect = res.redirect;
      err.type = res.type;

      return Promise.reject(err);
    })
    .finally(() => clearTimeout(timeout));
};

request('http://dio.dev/url-que-nao-existe')
  .catch(err => {
    console.log(err.url);
  });
```

Uma coisa que esse código não está fazendo é validar o tipo de conteúdo que está recebendo para formatar com os `.json()`, `.text()`, etc. Não considero isso algo que eu sinta falta dentro do *Axios*.

## Conclusão

O modelo de *promises* em conjunto com o *fetch()* e o *AbortControler()* deixam o tratamento de requisições nativo de uma forma completa, que eu julgo ser sem a necessidade de bibliotes externas. Uma coisa que está para ser anunciada para o futuro do `fetch()`, é enviar uma *stream* pelo corpo da requisição. Acho que o futuro está promissor para aprender bastante sobre requisições no javascript porque ainda vem coisas bem legais por aí.

Se você encontrou um erro no artigo, sugestão ou incoerência, pode me enviar uma mensagem no [Twitter](https://twitter.com/dioruto "Twitter do Diogo") ou no [Instagram](https://instagr.am/fotografolixo "Instagram do Diogo"). Ficarei feliz em corrigir os problemas e aprender como fazer da melhor forma para também compartilhar o conhecimento da forma mais correta.

Obrigado por ler até aqui! :D

