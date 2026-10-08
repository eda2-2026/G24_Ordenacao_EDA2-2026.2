const estado = {
  paisCorreto: escolherPaisDoDia(),
  filtrados: [],
  selecionado: null,
  indiceAtivo: -1,
  tentativas: [],
  encerrado: false,
};

const elementos = {
  silhueta: document.querySelector("#silhueta"),
  campo: document.querySelector("#campo-pais"),
  lista: document.querySelector("#lista-paises"),
  enviar: document.querySelector("#enviar-palpite"),
  formulario: document.querySelector("#form-palpite"),
  linhas: [...document.querySelectorAll("#tentativas li")],
  contador: document.querySelector("#contador"),
  mensagem: document.querySelector("#mensagem"),
  comparacoes: document.querySelector("#comparacoes"),
  deslocamentos: document.querySelector("#deslocamentos"),
  quantidade: document.querySelector("#quantidade"),
  reiniciar: document.querySelector("#reiniciar"),
};

function escolherPaisDoDia() {
  const hoje = new Date();
  const chave = Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth(), hoje.getUTCDate());
  return PAISES[Math.floor(chave / 86_400_000) % PAISES.length];
}

function renderizarSilhueta() {
  elementos.silhueta.setAttribute("viewBox", estado.paisCorreto.viewBox);
  elementos.silhueta.querySelector("path").setAttribute("d", estado.paisCorreto.path);
}

function renderizarTentativa(tentativa, indice) {
  const linha = elementos.linhas[indice];

  linha.className = tentativa.correto
    ? "correto"
    : tentativa.distancia <= 1500
      ? "perto"
      : "longe";

  linha.querySelector(".pais").textContent =
    tentativa.nome;

  linha.querySelector(".distancia").textContent =
    tentativa.correto
      ? "ACERTOU"
      : `${tentativa.distancia.toLocaleString("pt-BR")} km`;

  linha.querySelector(".direcao").textContent =
    tentativa.direcao;
}