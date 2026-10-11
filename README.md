# G24_Ordenacao_EDA2-2026.2

# Mundo — Jogo de países com Insertion Sort

## Sobre o projeto

Versão acadêmica e funcional do **Mundo**, desenvolvida para o trabalho de
Ordenação da disciplina Estruturas de Dados e Algoritmos 2.

O jogador observa a silhueta de um país e possui até seis tentativas para
descobrir a resposta. Depois de cada erro, o jogo informa a distância aproximada
e a direção do país correto.

O autocomplete possui 195 países e é ordenado por uma implementação própria do
**Insertion Sort**.

## Funcionalidades

- País diário escolhido deterministicamente.
- Silhuetas vetoriais de 195 países.
- Seis tentativas por partida.
- Distância calculada pela fórmula de Haversine.
- Direção cardeal calculada pelo azimute.
- Autocomplete que ignora acentos e diferenças entre maiúsculas e minúsculas.
- Dropdown com três opções visíveis e rolagem para as demais.
- Navegação por mouse, toque, setas, `Enter` e `Escape`.
- Painel visual com comparações, deslocamentos e itens ordenados.
- Testes automatizados do algoritmo.

## Como executar

O projeto não requer instalação de dependências.

```bash
python3 -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

Também é possível usar qualquer servidor HTTP estático, como a extensão Live
Server do VS Code.

> O arquivo não deve ser aberto diretamente pelo protocolo `file://`, pois os
> navegadores restringem a importação de módulos JavaScript nesse modo.

## Como executar os testes

Requer Node.js 20 ou superior:

```bash
npm test
```

## Estrutura

```text
.
├── index.html
├── style.css
├── package.json
├── src/
│   ├── app.js
│   ├── dados-paises.js
│   └── insertion-sort.js
└── test/
    └── insertion-sort.test.js
```

## Onde está o algoritmo

O algoritmo está isolado em:

```text
src/insertion-sort.js
```

A função principal recebe uma lista e uma função comparadora:

```js
insertionSort(lista, comparar)
```

Ela retorna:

```js
{
  itens,
  comparacoes,
  deslocamentos
}
```

A lista original não é alterada.

## Funcionamento do Insertion Sort

O algoritmo considera a parte inicial do vetor como ordenada. A partir da
segunda posição, remove logicamente o elemento atual, desloca para a direita os
elementos maiores e insere o elemento na posição correta.

Exemplo:

```text
Entrada: [5, 2, 4, 1]

Inserir 2: [2, 5, 4, 1]
Inserir 4: [2, 4, 5, 1]
Inserir 1: [1, 2, 4, 5]
```

Pseudocódigo:

```text
para i de 1 até tamanho - 1
    atual = vetor[i]
    j = i - 1

    enquanto j >= 0 e vetor[j] > atual
        vetor[j + 1] = vetor[j]
        j = j - 1

    vetor[j + 1] = atual
```

## Complexidade

| Caso | Tempo |
|---|---:|
| Melhor — lista ordenada | O(n) |
| Médio | O(n²) |
| Pior — ordem inversa | O(n²) |
| Espaço adicional da ordenação | O(1) |

Nesta implementação, é criada uma cópia da lista para evitar efeitos colaterais
na interface, então a API completa utiliza `O(n)` de memória para essa cópia.

## Por que Insertion Sort?

O catálogo contém somente 195 países. Para esse volume pequeno:

- a implementação é curta e compreensível;
- o custo quadrático permanece limitado;
- listas parcialmente ordenadas se aproximam do melhor caso;
- o algoritmo é estável;
- não requer estruturas auxiliares complexas;
- permite visualizar comparações e deslocamentos em tempo real.

Para centenas de milhares de elementos, Merge Sort ou Quick Sort seriam opções
mais adequadas. A escolha aqui considera o tamanho real do domínio.

## Critérios de ordenação do autocomplete

O jogo não usa apenas ordem alfabética. O comparador aplica:

1. Países cujo nome começa com o termo digitado.
2. Países que contêm o termo em outra posição.
3. Ordem alfabética em português dentro da mesma prioridade.
4. Posição original como desempate estável.

Antes da ordenação, cada nome é normalizado apenas uma vez. Isso evita remover
acentos repetidamente a cada comparação.

Exemplo com o termo `sul`:

```text
1. Sulândia          começa com o termo
2. África do Sul     contém o termo
3. Coreia do Sul     contém o termo
```

## Estabilidade

O Insertion Sort implementado é estável porque desloca um elemento somente
quando o comparador retorna um valor estritamente maior que zero. Elementos
equivalentes preservam sua ordem original.

## Testes do algoritmo

A suíte verifica:

- ordenação numérica;
- preservação da lista original;
- estabilidade;
- normalização de acentos e caixa;
- prioridade de prefixos;
- ordenação alfabética.

## Sugestão de roteiro para o vídeo

1. Apresentar o jogo e o problema do autocomplete.
2. Mostrar os 195 países e o dropdown limitado a três linhas.
3. Abrir `src/insertion-sort.js`.
4. Explicar a parte ordenada e a inserção do elemento atual.
5. Mostrar o laço externo e o deslocamento no laço interno.
6. Explicar melhor caso `O(n)` e pior caso `O(n²)`.
7. Justificar a escolha pelo limite inferior a 300 elementos.
8. Mostrar o comparador por prefixo e ordem alfabética.
9. Digitar `sao`, `sul` e `guine` no jogo.
10. Mostrar as métricas mudando na tela.
11. Executar `npm test`.
12. Realizar um palpite para demonstrar que o jogo continua funcional.

## Dados e licenças

- Catálogo: `world-countries`, licença ODbL.
- Silhuetas: `@svg-maps/world`, CC BY 4.0, baseado em MapSVG.

As atribuições devem ser preservadas em redistribuições do projeto.