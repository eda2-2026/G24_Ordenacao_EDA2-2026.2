# Mundo — Jogo de países com Insertion Sort

## Como executar

### 1. Baixar o repositório

Clone o repositório e entre no diretório do projeto:

```bash
git clone https://github.com/eda2-2026/G24_Ordenacao_EDA2-2026.2.git
cd G24_Ordenacao_EDA2-2026.2
```

### 2. Verificar o ambiente

É necessário ter o Node.js, o npm e o Python 3 instalados. O npm inicia a
aplicação por meio do servidor HTTP do Python. Verifique o ambiente com:

```bash
node --version
npm --version
python3 --version
```

O projeto não possui dependências externas, portanto não é necessário executar
`npm install`.

### 3. Iniciar a aplicação

```bash
npm run start
```

Acesse no navegador:

```text
http://localhost:8000
```

## Estrutura do código

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

- `index.html`: estrutura da interface do jogo.
- `style.css`: estilos da interface, do dropdown e das tentativas.
- `package.json`: comandos de execução e testes.
- `src/app.js`: autocomplete, regras do jogo, tentativas, distância e direção.
- `src/dados-paises.js`: catálogo com os dados e as silhuetas dos 195 países.
- `src/insertion-sort.js`: implementação do Insertion Sort, normalização e
  ordenação da busca.
- `test/insertion-sort.test.js`: testes automatizados do algoritmo.

## Funcionamento do Insertion Sort

O algoritmo está implementado em `src/insertion-sort.js`:

```js
insertionSort(lista, comparar)
```

Ele cria uma cópia da lista recebida para preservar a lista original. A partir
do segundo elemento, considera a parte à esquerda como ordenada, guarda o
elemento atual, desloca para a direita os elementos maiores e insere o elemento
na posição correta.

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

A função retorna a lista ordenada e as métricas observadas durante a execução:

```js
{
  itens,
  comparacoes,
  deslocamentos
}
```

O algoritmo é estável porque só desloca um elemento quando o comparador retorna
um valor estritamente maior que zero. Elementos equivalentes preservam a ordem
original.


## Critérios de ordenação

O texto digitado pelo usuário é normalizado, removendo diferenças entre letras
maiúsculas e minúsculas, acentos e espaços repetidos. Os nomes dos países também
são normalizados apenas para comparação; o dropdown mantém a grafia original.

Depois da normalização, os países que não contêm o termo são removidos pelo
filtro. O Insertion Sort ordena os resultados segundo estes critérios:

1. Países cujo nome começa com o termo digitado.
2. Países que contêm o termo em outra posição.
3. Ordem alfabética em português dentro da mesma prioridade.
4. Posição original como desempate estável.

Exemplo para o termo `guine`:

```text
1. Guiné              começa com o termo
2. Guiné Equatorial   começa com o termo
3. Guiné-Bissau       começa com o termo
4. Papua-Nova Guiné   contém o termo em outra posição
```

O fluxo executado a cada alteração do input é:

```text
input → normalização → filtragem → Insertion Sort → dropdown
```

## Testes

Execute os testes automatizados com:

```bash
npm test
```

Para visualizar individualmente os testes executados:

```bash
node test/insertion-sort.test.js
```

A suíte verifica:

- ordenação numérica;
- preservação da lista original;
- estabilidade do Insertion Sort;
- normalização de acentos, caixa e espaços repetidos;
- prioridade dos países que começam com o termo;
- ordem alfabética dentro de cada grupo;
- busca sem modificar os dados originais;
- retorno de todos os países para o termo vazio;
- retorno de uma lista vazia quando não há correspondências.
