---
icon: 📦
title: Armazenando dados em módulos JavaScript
summary: Aprenda a utilizar os módulos JavaScript e um truque de como usá-los como um "banco" em memória
createdAt:
  iso: '2021-05-15T22:13:59.540Z'
  formated: 15/05/2021
---

Podemos atualmente utilizar módulos ECMAScript em todos os navegadores modernos (Chrome, Safari, Edge, etc…) sem a necessidade de um bundler (que antes usávamos para pegar esse módulo e compactar em um arquivo só). Podemos utilizar esses módulos para organizar nosso código e escrever pequenas partes de código onde importamos o arquivo que queremos para utilizar suas funções ou valores.

## Importar módulo e executar

Criaremos essa estrutura de arquivos:

``` markdown
📦 modulos
 ┣ 📜 index.html  # html que irá chamar o script
 ┣ 📜 main.js     # javascript principal
 ┗ 📜 module.js   # um módulo que importaremos
```

### index.html

Esse arquivo é um html simples, que irá importar no `head` um arquivo JavaScript com o tipo `module`.

```html
<!DOCTYPE html>
<html lang="pt-br">
<meta charset=utf-8>
<title>Execução de módulos</title>

<script type="module" src="./main.js"></script>

<p>Esse html é valido! 😮</p>
```

Utilizado o tipo `module` ao importar o script, podemos dentro dele utilizar a sintaxe `import`, que muitas pessoas já estão acostumadas ao utilizar um bundler, que tenta trazer as coisas mais recentes do JavaScript ao NodeJS.

### module.js

Aqui apenas rodaremos uma função `console.log` para exemplo de como o navegador conseguirá executar esse comando.

``` javascript
console.log('Executando o conteúdo dentro do módulo!');
```

### main.js

Dentro do nosso arquivo principal, vamos apenas importar diretamente um módulo, depois iremos complicar um pouco a mais a situação.


``` javascript
import './module.js';
```

Sempre devemos inserir a extensão do arquivo que estamos importando para que o navegador consiga interpretá-lo.

### Enxergando o resultado

Se você apenas abrir o arquivo `index.html`, o seu navegador irá bloquear a importação do módulo `module.js` por motivos de segurança.

Para conseguirmos enxergar o módulo funcionando, precisamos criar um servidor local. O jeito que eu acho mais prático é ter o **Node** instalado com o **npm** acima da versão **5.2**.

Com o Node instalado podemos apenas rodar o comando:

``` markdown
npx serve
```

Se você não tem o Node instalado, [dentro deste gist existem várias opções para várias linguagens que conseguem rodar um servidor de uma forma simples](https://gist.github.com/willurd/5720255).

Após rodar, quando você abrir o navegador e enxegar o seu arquivo de html sendo interpretado pelo navegador, ao abrir o console, conseguiremos ver o texto que pedimos para imprimir.

Esse é o exemplo mais cru e inútil de como utilizar os módulos, agora vamos para partes mais legais.

## Importando valores

Com os módulos podemos importar valores como booleans, numbers, strings, arrays, objects, functions e outros. Essa é a capacidade que considero a mais importante nos módulos.

Vamos fazer um exemplo com essa estrutura de código:

``` markdown
📦 modulos
 ┣ 📜 index.html  # html que irá chamar o script
 ┣ 📜 main.js     # javascript principal
 ┗ 📜 module.js   # um módulo que importaremos
```

### index.html

Importamos o nosso arquivo javascript com o tipo **módulo**.

``` html
<!DOCTYPE html>
<html lang="pt-br">
<meta charset=utf-8>
<title>Importando dados</title>

<script type="module" src="./main.js"></script>

<button>Mudar valor</button>
```

### module.js

``` javascript
/**
 * Armazenar um valor numa variável que pode ser alterada
 * */
let myValue = false;

/**
 * Criamos uma funcão para alterar o valor dessa variável
 * */
function changeMyValue() {
  myValue = !myValue;
};

/**
 * Exportamos o nosso valor, se exportarmos
 * por padrão ele, não conseguiremos guardar
 * um estado da nossa variável dentro do módulo.
 * Isso significa que nossa funcão nunca
 * conseguiria alterar esse valor.
 * 
 * E exportamos por padrão a função de alteração do valor.
 * */
export { myValue };
export default changeMyValue;
```

### main.js

``` javascript
/**
 * Importamos nossa funcão e valor.
 * 
 * Note que como a funcão está no export default
 * do módulo, não precisamos desestruturar seu
 * nome ao importar. Não precisamos nem seguir o
 * nome que foi definido antes, podemos renomeá-la
 * ao importar.
 * */
import changeMyValue, { myValue } from './module.js';

/**
 * Imprimimos o valor que temos no console,
 * apenas para mérito de comparação.
 * */
console.log(myValue);

/**
 * Adicionamos um evento de clique ao botão,
 * executando a função de alterar o valor e 
 * após alterarmos esse valor, imprimimos
 * no console o valor que estamos importando.
 * */
document.querySelector('button')
  .addEventListener('click', () => {
    changeMyValue();
    console.log(myValue);
  });
```

### Explicação da importação de valores

No exemplo acima, não estamos apenas importando os dados que queremos, estamos alterando seu valor de um outro módulo e além disso, guardando seu estado.

Note que a função `changeMyValue()` não tem retorno, ela apenas altera uma variável que está sendo exportada de um módulo. Note também que não estamos importando novamente o valor do módulo, estamos apenas utilizando a variável de um outro arquivo que está nos servindo como um estado que poderia ser importado de outros arquivos com o valor original, e se for modificado, trazendo o valor o novo valor.

## Compartilhando valores com múltiplos módulos JavaScript

Nesse exemplo iremos criar uma espécie de armazenamento na memória com módulos, onde seus dados podem ser compartilhados. Seria uma forma rústica de *Redux*, *Vuex* ou qualquer gerenciador de estado.

Vamos seguir uma estrutura semelhante aos outros, com um arquivo diferente apenas.

``` markdown
📦 modulos
 ┣ 📜 index.html  # html que irá chamar o script
 ┣ 📜 main.js     # javascript principal
 ┣ 📜 module.js   # um módulo secundário
 ┗ 📜 store.js    # módulo onde guardaremos os dados
```

### index.html

Nada de diferente do primeiro

``` html
<!DOCTYPE html>
<html lang="pt-br">
<meta charset=utf-8>
<title>Compartilhando dados, show!</title>

<script type="module" src="./main.js"></script>
```

### store.js

Praticamente a mesma coisa que fizemos acima, porém, adicionamos itens para uma lista (*array*).

``` javascript
const secretNumbers = [ 2, 7, 6, 9, 5, 1, 4, 3 ];

function addSecretNumber(number) {
  secretNumbers.push(number);
}

export { secretNumbers, addSecretNumber };
```

### module.js

Aqui importamos apenas a lista, para podermos visualizar no console do nosso navegador. Fiz dessa forma para mostrar que mesmo não sendo alterado o valor aqui, conseguiremos ver mudanças quando executarmos a função `useSecretNumberFromOtherModule()` em outro módulo, pois estamos exportando-a.

``` javascript
import { secretNumbers } from './store.js';

function useSecretNumberFromOtherModule() {
  console.log(secretNumbers);
};

export default useSecretNumberFromOtherModule;
```

### main.js

Vamos agora executar as funções e verificar se existe realmente uma mudança no valor e se conseguimos buscá-lo de outro módulo para enxergar essa mudança.

``` javascript 
import { addSecretNumber } from './store.js';
import useSecretNumberFromOtherModule from './module.js';

useSecretNumberFromOtherModule();
// Imprime no console: [ 2, 7, 6, 9, 5, 1, 4, 3 ];

addSecretNumber(8);
// Adiciona o número 8 na lista

useSecretNumberFromOtherModule();
// Imprime no console: [ 2, 7, 6, 9, 5, 1, 4, 3, 8 ];

addSecretNumber('Não é um número, mas não tem tratamento para evitar isso 🤷‍♂️');
// Estragando a lista adicionando um texto 

useSecretNumberFromOtherModule();
// Imprime no console: [ 2, 7, 6, 9, 5, 1, 4, 3, 8, 'Não é um número, mas não tem tratamento para evitar isso 🤷‍♂️' ];
```

Note que nesse arquivo nem temos a noção do que a lista que estamos mexendo, estamos apenas executando uma função que adiciona um dado a uma lista que está armazenada em outro módulo. E mesmo assim ainda temos ela atualizada sem perder os dados.

### Passo a passo

1. Dentro do nosso `store.js`, criamos uma lista com uns valores aleatórios só para preencher algo hahaha.

``` javascript
const secretNumbers = [ 2, 7, 6, 9, 5, 1, 4, 3 ];
```

2. Adicionamos uma função para adicionar novos valores nessa lista.

``` javascript
function addSecretNumber(number) {
  secretNumbers.push(number);
}
```

3. Exportamos a nossa lista `secretNumbers` e nossa função `addSecretNumber()`.

``` javascript
export { secretNumbers, addSecretNumber };
```

Esse arquivo virou nosso armazenamento da lista `secretNumbers`, e que podemos consultar esse valor sempre que importarmos esse valor de outro módulo.

Lembre-se que se você exportar por padrão (com `export default`) a nossa lista (ou qualquer outro valor), ela não será salva, e sim criará uma instância dessa lista, e se a importarmos de um outro arquivo, mesmo após a sua alteração, ela vira novamente com os valores definidos em sua criação.

Recomendo o curso [Just Javascript](https://justjavascript.com) do [Dan Abramov](https://twitter.com/dan_abramov) para aprender mais sobre como o JavaScript armazena seus dados.

4. No nosso arquivo `module.js`, importamos apenas o valor, lá não temos a necessidade de alterá-lo, apenas visualiza-lo.

``` javascript
import { secretNumbers } from './store.js';
```

5. Dentro desse módulo de visualização, criamos uma função para imprimir o valor da variável `secretNumbers` no console do navegador e a exportamos.

``` javascript
function useSecretNumberFromOtherModule() {
  console.log(secretNumbers);
};

export default useSecretNumberFromOtherModule;
```

6. Agora no nosso arquivo principal, `main.js`, importaremos apenas a função de atualização (que está no `store.js`) e a de visualização (dentro do `module.js`).

``` javascript
import { addSecretNumber } from './store.js';
import useSecretNumberFromOtherModule from './module.js';
```

Depois apenas as executamos para ver se conseguimos ver os valores atualizados.

## Conclusão

O JavaScript nos da uma forma de ter um centralizador de dados com poucas linhas de código, aqui eu rodei e dei piruetas apenas para métodos demonstrativos. É difícil alguém utilizar o JavaScript dessa forma, mas é bom saber que é possível.

A ideia desse artigo me apareceu quando eu tentei criar uam cópia do [Numi](https://numi.app) para o navegador. Pensei que seria legal fazer sem o auxílio de frameworks e parei para conhecer as coisas novas de JavaScript que os navegadores agora suportam sem a necessidade de um processo moroso com bundlers.

[Math Notes](https://imaginamundo.github.io/math-notes/) foi o projeto que criei, o [código está aberto](https://github.com/imaginamundo/math-notes) e ele utiliza esse modelo de dados.

Artigo traduzido de um artigo que eu tinha feito no [dev.to](https://dev.to/imaginamundo/store-values-in-esmodules-36gc).

Boa sorte e quebrem bastante seus códigos, vale a pena.