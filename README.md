# Aluno: Claudio Guilherme Gomes Alves RA: 75955

# Projeto Front-end - API de Desenhos

Projeto acadêmico desenvolvido com HTML, CSS e JavaScript puro.

## Tema

Catálogo de personagens do desenho Rick and Morty.

## API utilizada

Rick and Morty API

Endpoint principal:

https://rickandmortyapi.com/api/character

Endpoint de busca por nome:

https://rickandmortyapi.com/api/character/?name=rick

## Funcionalidades

- Página inicial com apresentação do projeto.
- Consumo de API pública usando `fetch`.
- Criação automática dos cards via JavaScript.
- Barra de busca no topo.
- Botão para ver favoritos no topo.
- Card com nome, imagem, descrição e coração de favorito.
- Favoritos salvos no navegador usando `localStorage`.
- Layout responsivo com HTML e CSS.

## Como abrir no Visual Studio Code

1. Extraia a pasta compactada.
2. Abra a pasta `projeto_api_cards_unifecaf` no VS Code.
3. Abra o arquivo `index.html`.

## Observação

Os cards não foram criados diretamente no HTML.
O HTML apenas possui a área onde os cards aparecem.
Todos os cards são criados dinamicamente no arquivo `script.js`, usando:

- `fetch`
- `then`
- `createElement`
- `appendChild`
- `localStorage`
# projeto_api_cads_desenhos
