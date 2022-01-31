# :interrobang: Palavro :interrobang:

## :grey_question: Descrição

Clone do popular jogo [Wordle](https://www.powerlanguage.co.uk/wordle/) com algumas modificações extras:

- :thinking: Escolha a dificuldade: palavras entre 5 e 7 letras
- :star: Até três palavras por dia


## :test_tube: Tecnologias utilizadas

### Interpretador e gerenciador de pacotes

<a href="https://nodejs.org">
  <img src="https://img.shields.io/badge/Node.js-v16.13.0-339933?style=flat&logo=nodedotjs" alt="Node.js v16.13.0">
</a>
<a href="https://npmjs.com">
  <img src="https://img.shields.io/badge/npm-8.1.3-%23000000.svg?style=flat&logo=npm&logoColor=white" alt="npm 8.1.3">
</a>

### Frameworks e bibliotecas

<a href="https://pt-br.reactjs.org">
  <img src="https://img.shields.io/badge/React-v17.0.2-blue?style=flat&logo=react" alt="React">
</a>
<a href="https://https://jestjs.io">
  <img src="https://img.shields.io/badge/Jest-v27.4.0-red?style=flat&logo=jest&logoColor=red" alt="React">
</a>

### Linguagens

<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-4.5.5-007ACC?style=flat&logo=typescript" alt="TypeScript 4.5.5">
</a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML">
  <img src="https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white" alt="HTML5">
</a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
  <img src="https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white" alt="CSS3">
</a>


## :arrow_forward: Scripts do projeto

### `npm run filter <nLetras> <arquivoSaida?>`

Script utilizado para filtrar a base de dados do [*br.ispell-3.0* do Instituto de Matemática e Estatística da USP](https://www.ime.usp.br/~ueda/br.ispell/) e gerar os seguintes arquivos JavaScript contendo arrays de palavras filtradas:

- `5letras.js`
- `6letras.js`
- `7letras.js`

Parâmetros:

- `<nLetras>`: Número de letras das palavras alvo
- `<arquivoSaida?>` Arquivo de saída, parâmetro opcional. Por padrão, seu valor é *./public/palavras/\<nLetras\>letras.js*

### `npm start`

Executa a aplicação no modo de desenvolvimento em [http://localhost:3000](http://localhost:3000).

### `npm test`

Roda os testes da aplicação em modo interativo.

### `npm run build`

Constrói a aplicação e coloca na pasta `build`.

## :busts_in_silhouette: Redes sociais

<a href="https://www.linkedin.com/in/gabriel-izoton/">
  <img src="https://img.shields.io/badge/LinkedIn-Gabriel%20Izoton-blue?style=social&logo=linkedin" alt="LinkedIn: Gabriel Izoton">
</a>

<a href="https://twitter.com/gabrielizoton">
  <img src="https://img.shields.io/badge/Twitter-gabrielizoton-blue?style=social&logo=twitter" alt="Twitter: gabrielizoton">
</a>