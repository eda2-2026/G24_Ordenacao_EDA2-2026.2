import { PAISES } from "./dados-paises.js";
import { ordenarPaisesParaBusca } from "./insertion-sort.js";

const MAXIMO_TENTATIVAS = 6;
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

function atualizarBusca() {
  const resultado = ordenarPaisesParaBusca(
    PAISES,
    elementos.campo.value,
  );

  estado.filtrados = resultado.paises;
  estado.indiceAtivo = -1;

  elementos.campo.removeAttribute("aria-activedescendant");
  elementos.comparacoes.textContent = resultado.comparacoes;
  elementos.deslocamentos.textContent = resultado.deslocamentos;
  elementos.quantidade.textContent = resultado.paises.length;

  renderizarDropdown();
}

function renderizarDropdown() {
  elementos.lista.replaceChildren();

  if (!estado.filtrados.length) {
    const item = document.createElement("li");

    item.className = "vazio";
    item.textContent = "Nenhum país encontrado";

    elementos.lista.append(item);
  } else {
    estado.filtrados.forEach((pais, indice) => {
      const item = document.createElement("li");

      item.id = `pais-${indice}`;
      item.setAttribute("role", "option");
      item.textContent = pais.nome;

      item.setAttribute(
        "aria-selected",
        String(indice === estado.indiceAtivo),
      );

      item.addEventListener("pointerdown", (evento) => {
        evento.preventDefault();
        selecionarPais(pais);
      });

      elementos.lista.append(item);
    });
  }

  elementos.lista.hidden = false;
  elementos.campo.setAttribute("aria-expanded", "true");
}

function selecionarPais(pais) {
  estado.selecionado = pais;
  elementos.campo.value = pais.nome;
  elementos.enviar.disabled = false;

  fecharDropdown();
}

function fecharDropdown() {
  elementos.lista.hidden = true;
  estado.indiceAtivo = -1;

  elementos.campo.setAttribute("aria-expanded", "false");
  elementos.campo.removeAttribute("aria-activedescendant");
}

function moverSelecao(delta) {
  if (elementos.lista.hidden) {
    atualizarBusca();
  }

  if (!estado.filtrados.length) {
    return;
  }

  if (estado.indiceAtivo === -1) {
    estado.indiceAtivo = delta > 0
      ? 0
      : estado.filtrados.length - 1;
  } else {
    estado.indiceAtivo = (
      estado.indiceAtivo + delta + estado.filtrados.length
    ) % estado.filtrados.length;
  }

  [...elementos.lista.children].forEach((item, indice) => {
    item.setAttribute(
      "aria-selected",
      String(indice === estado.indiceAtivo),
    );
  });

  const ativo = elementos.lista.children[estado.indiceAtivo];

  elementos.campo.setAttribute("aria-activedescendant", ativo.id);
  ativo.scrollIntoView({ block: "nearest" });
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

function radianos(graus) {
  return graus * Math.PI / 180;
}

function calcularDistancia(origem, destino) {
  const raioTerra = 6371.0088;

  const deltaLatitude = radianos(
    destino.latitude - origem.latitude,
  );

  const deltaLongitude = radianos(
    destino.longitude - origem.longitude,
  );

  const latitudeOrigem = radianos(origem.latitude);
  const latitudeDestino = radianos(destino.latitude);

  const haversine =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitudeOrigem) *
    Math.cos(latitudeDestino) *
    Math.sin(deltaLongitude / 2) ** 2;

  const valor = Math.min(1, Math.max(0, haversine));

  return raioTerra * 2 * Math.atan2(
    Math.sqrt(valor),
    Math.sqrt(1 - valor),
  );
}

function calcularDirecao(origem, destino) {
  const latitudeOrigem = radianos(origem.latitude);
  const latitudeDestino = radianos(destino.latitude);

  const deltaLongitude = radianos(
    destino.longitude - origem.longitude,
  );

  const y =
    Math.sin(deltaLongitude) *
    Math.cos(latitudeDestino);

  const x =
    Math.cos(latitudeOrigem) *
    Math.sin(latitudeDestino) -
    Math.sin(latitudeOrigem) *
    Math.cos(latitudeDestino) *
    Math.cos(deltaLongitude);

  const azimute = (
    Math.atan2(y, x) * 180 / Math.PI + 360
  ) % 360;

  const direcoes = [
    "N", "NE", "L", "SE", "S", "SO", "O", "NO",
  ];

  return direcoes[Math.round(azimute / 45) % 8];
}

elementos.campo.addEventListener("focus", atualizarBusca);

elementos.campo.addEventListener("input", () => {
  estado.selecionado = null;
  elementos.enviar.disabled = true;

  atualizarBusca();
});

elementos.campo.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowDown") {
    evento.preventDefault();
    moverSelecao(1);
  }

  if (evento.key === "ArrowUp") {
    evento.preventDefault();
    moverSelecao(-1);
  }

  if (evento.key === "Escape") {
    fecharDropdown();
  }

  if (
    evento.key === "Enter" &&
    !elementos.lista.hidden &&
    estado.indiceAtivo >= 0
  ) {
    evento.preventDefault();
    selecionarPais(estado.filtrados[estado.indiceAtivo]);
  }
});

document.addEventListener("pointerdown", (evento) => {
  if (
    evento.target instanceof Element &&
    !evento.target.closest(".combobox")
  ) {
    fecharDropdown();
  }
});

renderizarSilhueta();