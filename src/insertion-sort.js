export function insertionSort(lista, comparar) {
  const itens = [...lista];
  let comparacoes = 0;
  let deslocamentos = 0;

  for (let indice = 1; indice < itens.length; indice += 1) {
    const atual = itens[indice];
    let anterior = indice - 1;

    while (anterior >= 0) {
      comparacoes += 1;

      if (comparar(itens[anterior], atual) <= 0) {
        break;
      }

      itens[anterior + 1] = itens[anterior];
      deslocamentos += 1;
      anterior -= 1;
    }

    itens[anterior + 1] = atual;
  }

  return { itens, comparacoes, deslocamentos };
}

export function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");
}

export function ordenarPaisesParaBusca(paises, termoDigitado) {
  const termo = normalizarTexto(termoDigitado);

  const preparados = paises
    .map((pais, indiceOriginal) => {
      const nomeNormalizado = normalizarTexto(pais.nome);

      return {
        pais,
        indiceOriginal,
        nomeNormalizado,
        comecaComTermo: nomeNormalizado.startsWith(termo),
      };
    })
    .filter((item) => {
      return !termo || item.nomeNormalizado.includes(termo);
    });

  const resultado = insertionSort(preparados, (a, b) => {
    if (a.comecaComTermo !== b.comecaComTermo) {
      return a.comecaComTermo ? -1 : 1;
    }

    const alfabetica = a.nomeNormalizado.localeCompare(
      b.nomeNormalizado,
      "pt-BR",
    );

    return alfabetica || a.indiceOriginal - b.indiceOriginal;
  });

  return {
    paises: resultado.itens.map((item) => item.pais),
    comparacoes: resultado.comparacoes,
    deslocamentos: resultado.deslocamentos,
  };
}