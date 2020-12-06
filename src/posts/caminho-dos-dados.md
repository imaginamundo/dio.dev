---
icon: 🛣
title: Caminho dos Dados
summary: Entendendo a línha tênue entre Back-end e Front-end, e onde os dados são tratatos (tanto servidor ou navegador)
date:
  iso: '2020-12-06T18:06:59.540Z'
  formated: 06/12/2020
---

Nos tempos mais antigos da internet, havia uma divisão clara entre back-end e front-end. Essa divisão era geralmente:

<figure>
  <img src="/front-end-back-end.png" alt="Separação de modelos front-end no navegador e back-end no servidor">
</figure>

Back-end faz a aplicação do lado do servidor. Front-end faz a aplicação no navegador.

As diferenças se tornaram padrão para dividir o trabalho entre quem faz o tratamento dos dados no servidor e quem consome os dados tratador na interface dentro do navegador.

## Trabalhos no servidor

Os trabalhos no servidor variam entre uma infinidade de possibilidades, usamos essa camada por motivos de **segurança**, **performance** ou **limitações no navegador**.

No servidor podemos ter conexões com banco de dados, e fazemos isso no servidor para manter a integridade dos dados nele. Também evitamos que ele seja muito acessado, ou que usuários no navegador não consigam ver dados que não pertencem a ele. Um exemplo prático que temos no dia a dia é uma rede social.

Como no exemplo do Instagram, em suas mensagens pessoais, você não consegue ver mensagens de outras pessoas, pois elas estão protegidas por uma autenticação, e isso assegura que quem estiver navegando no aplicativo ou site só consiga ver as próprias mensagens.

<figure>
  <img src="/conversa-front-back-bando-de-dados.png" alt="Exemplo de conversa com do navegador, servidor e banco de dados" title="Exemplo de conversa com do navegador, servidor e banco de dados">
  <figcaption>Conversa entre navegador, servidor e banco de dados.</figcaption>
</figure>

Na imagem acima existe um ciclo incompleto de como o usuário solicita as próprias mensagens. Está faltando a parte de autenticação, que é o jeito usado para validar o usuário e quais são os dados que ele pode ter acesso.

A primeira mensagem mostra que o usuário está solicitando para ver suas mensagens. Isso é basicamente ele entrar no site e clicar no botão que lembra um avião de origami. Isso está no front-end.

Esse clique do usuário é um gatilho para o servidor, que recebe qual foi a intenção do usuário, e possívelmente também os dados de autenticação dele (que podem estar guardados em cookies, localStorage, sessionStorage, até em memória no browser).

Com essas informações o servidor sabe o que fazer, ele quer primeiro validar se os dados do usuário estão corretos. Esse passo é importante para não enviar dados que o usuário não poderia ver. Sabendo que o usuário quer ver as mensagens, ele pede ao banco de dados, quero as mensagens desse usuário.

Depois de pedir as mensagens, e recebe-las com sucesso ou falha, ele fala para o navegador, recebi as mensagens do usuário, são essas.

Quando o navegador recebe essas mensagens ele basicamente formata para um jeito que fica melhor para a leitura do usuário (ou pelo menos deveria).

Esse é um exemplo prático de uso de servidor como método de segurança.

Um limitador de performance é o que estamos bastante acostumados a muito tempo na internet, a página vir com os dados impressos no HTML, e não como faz por exemplo alguns frameworks como o create-react-app, que entregam um html vazio e depois preenche a página com javascript. Essa forma de preencher os dados da página no navegador é algo que fere o SEO (search engine optimization) da página, diminuindo a posição dela em mecanismos de busca.

Uma das limitações do navegador é com salvar dados entre dispositivos diferentes, é possível fazer isso mas seria em um produto muito específico onde todos receberiam os mesmos dados. Dessa forma o próprio navegador teria acesso ao banco de dados, o que pode ser um facilitador para inserirem, removerem ou copiarem todos os dados salvos.

## Trabalhos no navegador

O navegador tem a função principal de exibir dados para o usuário final, seja uma imagem, um site com html e css, ou até um PDF, como a maioria dos navegadores atualmente é capaz.

Mas com a função de exibição, também precisamos de ferramentas para conseguir trabalhar essa exibição de uma forma mais acertiva. O browser nos deixa trabalhar hoje com 4 ferramentas diferentes:
- **HTML:** Marcação de que tipo de conteúdo foi adicionado na página, como imagens, paragrafos, vídeos entre muitos outros;
- **CSS:** Linguagem de programação (👀) de interface, conseguimos falar onde cada elemento html vai se posicionar na tela, alterar cores, fazer condições de como a página ficará exibida em cada tipo de dispositivo, impressão, fontes entre muitas outras coisas;
- **Javascript:** Linguagem de programação no navegador que nos permite interações com o HTML e o CSS, como expandir algo quando for clicado, guardados dados em cookies, memória, enviar requisições para outros servidores para buscar dados, e muito mais;
- **WASM (Web Assembly):** Uma línguagem de programação mais baixo nível dentro do navegador, ainda está dando seus primeiros passos mas com resultados bastante promissores.

Com o foco do browser sendo em exibição, geralmente fazemos requisições a servidores para buscar os dados que precisamos para preencher nossa tela com dados. Também existe a possibilidade de fazer igual a este blog, o HTML com os dados diretamente nele (mas usando um facilidator que é ter um sistema que lê meus arquivos que são os artigos e os transformam em HTML simples).

## Porque a diferência entre Back-end e Front-end ficou confusa?

<figure>
  <img src="/front-back-borrado.png" alt="Confusão entre front-end e back-end" title="Confusão entre front-end e back-end">
</figure>


Essa divisão ficou mais borrada com o crescimento de novas tecnologias que eram comuns no navegador também funcionarem no servidor. A ferramenta mais famosa atualmente é o [**Node.js**](https://nodejs.org).

O Node usa o Javascript como ferramenta para trabalhar dentro do servidor. E o Javascript conseguiu se mostrar uma ótima ferramenta dentro do servidor para muitos casos.

O que mais fez essa linha ficar borrada é uma coisa que já fazíamos antes com PHP, Java e outras línguagens de programação: gerar o html no servidor e o enviar diretamente para o navegador.

A única diferença é que agora pessoas que já trabalhavam com o navegador agora também poderiam trabalhar no servidor para já deixarem seus dados prontos para o navegador. Uma outra coisa que aconteceu foi que isso gerou um conhecimento importante para quem trabalhava com front-end que são os protocolos HTTP e como não só receber dados do servidor, mas também como enviar dados de um servidor. Aprendemos a fazer APIs para consumir dentro do nosso proprio site do lado do navegador, assim conseguindo mandar dados do servidor para o HTML e também consultar do servidor dados por requisições HTTP no servidor para exibição no navegador baseado em interação do usuário ou qualquer outro jeito.

Isso gerou um embaralhamento na cabeça de muitas pessoas, mas não acho que vá durar muito tempo essa confusão e felizmente esse artigo vai deixar de ser relevante.

## Conclusão

O que eu sinto que borrou essa linha foi a implementação de uma línguagem de programação que era focada no navegador também dentro do servidor. Isso foi ótimo porque gerou uma "democracia dos dados". E também não precisamos ficar enchendo os back-ends pedindo dados para preencher nossos sites seguindo os desenhos de designers, conseguimos cortar um pedaço do processo que talvez não fosse tão necessário.