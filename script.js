const cardsContainer = document.getElementById("cardsContainer");
const mensagemStatus = document.getElementById("mensagemStatus");
const campoBusca = document.getElementById("campoBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoLimpar = document.getElementById("botaoLimpar");
const botaoFavoritos = document.getElementById("botaoFavoritos");
const contadorFavoritos = document.getElementById("contadorFavoritos");

let personagensCarregados = [];
let exibindoFavoritos = false;

let favoritos = JSON.parse(localStorage.getItem("favoritosPersonagens")) || [];

carregarPersonagens();
atualizarContadorFavoritos();

botaoBuscar.addEventListener("click", () => {
  buscarPersonagem();
});

campoBusca.addEventListener("keyup", (evento) => {
  if (evento.key === "Enter") {
    buscarPersonagem();
  }
});

botaoLimpar.addEventListener("click", () => {
  campoBusca.value = "";
  exibindoFavoritos = false;
  botaoFavoritos.innerHTML = `Favoritos <span id="contadorFavoritos">${favoritos.length}</span>`;
  carregarPersonagens();
});

botaoFavoritos.addEventListener("click", () => {
  if (exibindoFavoritos) {
    exibindoFavoritos = false;
    campoBusca.value = "";
    botaoFavoritos.innerHTML = `Favoritos <span id="contadorFavoritos">${favoritos.length}</span>`;
    carregarPersonagens();
  } else {
    exibindoFavoritos = true;
    campoBusca.value = "";
    botaoFavoritos.textContent = "Ver todos";
    mostrarFavoritos();
  }
});

function carregarPersonagens() {
  mensagemStatus.textContent = "Carregando personagens da API...";
  cardsContainer.innerHTML = "";

  fetch("https://rickandmortyapi.com/api/character")
    .then((resposta) => resposta.json())
    .then((dados) => {
      personagensCarregados = dados.results;
      mensagemStatus.textContent = `${personagensCarregados.length} personagens carregados da API.`;
      mostrarCards(personagensCarregados);
      atualizarContadorFavoritos();
    })
    .catch((erro) => {
      mensagemStatus.textContent = "Não foi possível carregar os personagens.";
      cardsContainer.innerHTML = '<div class="mensagem-vazia">Erro ao consumir a API. Verifique sua conexão com a internet.</div>';
      console.error("Erro ao consumir a API:", erro);
    });
}

function buscarPersonagem() {
  const nomeBuscado = campoBusca.value.trim();
  exibindoFavoritos = false;
  botaoFavoritos.innerHTML = `Favoritos <span id="contadorFavoritos">${favoritos.length}</span>`;

  if (nomeBuscado === "") {
    carregarPersonagens();
    return;
  }

  mensagemStatus.textContent = `Buscando por: ${nomeBuscado}`;
  cardsContainer.innerHTML = "";

  fetch(`https://rickandmortyapi.com/api/character/?name=${nomeBuscado}`)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Personagem não encontrado");
      }
      return resposta.json();
    })
    .then((dados) => {
      mensagemStatus.textContent = `${dados.results.length} resultado(s) encontrado(s).`;
      mostrarCards(dados.results);
    })
    .catch((erro) => {
      mensagemStatus.textContent = "Nenhum personagem encontrado.";
      cardsContainer.innerHTML = '<div class="mensagem-vazia">Nenhum personagem foi encontrado com esse nome.</div>';
      console.error("Erro na busca:", erro);
    });
}

function mostrarCards(listaPersonagens) {
  cardsContainer.innerHTML = "";

  listaPersonagens.forEach((personagem) => {
    const card = criarCard(personagem);
    cardsContainer.appendChild(card);
  });
}

function criarCard(personagem) {
  const card = document.createElement("article");
  card.classList.add("card");

  const botaoFavorito = document.createElement("button");
  botaoFavorito.classList.add("botao-favorito");
  botaoFavorito.title = "Adicionar ou remover dos favoritos";
  botaoFavorito.innerHTML = verificarFavorito(personagem.id) ? "♥" : "♡";

  botaoFavorito.addEventListener("click", () => {
    alternarFavorito(personagem);
    botaoFavorito.innerHTML = verificarFavorito(personagem.id) ? "♥" : "♡";

    if (exibindoFavoritos) {
      mostrarFavoritos();
    }
  });

  const nome = document.createElement("h2");
  nome.textContent = personagem.name;

  const imagem = document.createElement("img");
  imagem.src = personagem.image;
  imagem.alt = `Imagem do personagem ${personagem.name}`;

  const descricao = document.createElement("div");
  descricao.classList.add("descricao");

  descricao.innerHTML = `
    <p><strong>Status:</strong> ${personagem.status}</p>
    <p><strong>Espécie:</strong> ${personagem.species}</p>
    <p><strong>Gênero:</strong> ${personagem.gender}</p>
    <p><strong>Origem:</strong> ${personagem.origin.name}</p>
    <p><strong>Descrição:</strong> ${personagem.name} é um personagem do desenho Rick and Morty, carregado diretamente da API pública por JavaScript.</p>
  `;

  card.appendChild(botaoFavorito);
  card.appendChild(nome);
  card.appendChild(imagem);
  card.appendChild(descricao);

  return card;
}

function alternarFavorito(personagem) {
  const existe = verificarFavorito(personagem.id);

  if (existe) {
    favoritos = favoritos.filter((item) => item.id !== personagem.id);
  } else {
    favoritos.push({
      id: personagem.id,
      name: personagem.name,
      image: personagem.image,
      status: personagem.status,
      species: personagem.species,
      gender: personagem.gender,
      origin: personagem.origin
    });
  }

  localStorage.setItem("favoritosPersonagens", JSON.stringify(favoritos));
  atualizarContadorFavoritos();
}

function verificarFavorito(id) {
  return favoritos.some((personagem) => personagem.id === id);
}

function mostrarFavoritos() {
  mensagemStatus.textContent = "Lista de personagens favoritos.";
  cardsContainer.innerHTML = "";

  if (favoritos.length === 0) {
    cardsContainer.innerHTML = '<div class="mensagem-vazia">Você ainda não adicionou nenhum personagem aos favoritos. Clique no coração dos cards para salvar.</div>';
    return;
  }

  favoritos.forEach((personagem) => {
    const card = criarCard(personagem);
    cardsContainer.appendChild(card);
  });
}

function atualizarContadorFavoritos() {
  const contador = document.getElementById("contadorFavoritos");
  if (contador) {
    contador.textContent = favoritos.length;
  }
}
