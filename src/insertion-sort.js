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
