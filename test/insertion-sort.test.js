import test from "node:test";
import assert from "node:assert/strict";

import {
  insertionSort,
  normalizarTexto,
  ordenarPaisesParaBusca,
} from "../src/insertion-sort.js";

test("ordena números sem modificar a lista original", () => {
  const lista = [5, 2, 4, 1, 3];
  const original = [...lista];

  const resultado = insertionSort(lista, (a, b) => a - b);

  assert.deepEqual(resultado.itens, [1, 2, 3, 4, 5]);
  assert.deepEqual(lista, original);
  assert.ok(resultado.comparacoes > 0);
  assert.ok(resultado.deslocamentos > 0);
});

test("preserva a ordem original dos elementos equivalentes", () => {
  const lista = [
    { id: "a", valor: 2 },
    { id: "b", valor: 1 },
    { id: "c", valor: 2 },
    { id: "d", valor: 1 },
  ];

  const resultado = insertionSort(
    lista,
    (a, b) => a.valor - b.valor,
  );

  assert.deepEqual(
    resultado.itens.map((item) => item.id),
    ["b", "d", "a", "c"],
  );
});

test("ignora acentos, caixa e espaços repetidos", () => {
  assert.equal(
    normalizarTexto("  São   TOMÉ  "),
    "sao tome",
  );
});

test("prioriza prefixo e depois ordem alfabética", () => {
  const paises = [
    { nome: "Coreia do Sul" },
    { nome: "Sulândia" },
    { nome: "África do Sul" },
  ];

  const resultado = ordenarPaisesParaBusca(paises, "sul");

  assert.deepEqual(
    resultado.paises.map((pais) => pais.nome),
    ["Sulândia", "África do Sul", "Coreia do Sul"],
  );

  assert.ok(resultado.comparacoes > 0);
});

test("busca sem acentos e sem modificar a entrada", () => {
  const paises = [
    { nome: "Brasil" },
    { nome: "São Tomé e Príncipe" },
  ];

  const original = paises.map((pais) => ({ ...pais }));
  const resultado = ordenarPaisesParaBusca(paises, "SAO");

  assert.deepEqual(
    resultado.paises.map((pais) => pais.nome),
    ["São Tomé e Príncipe"],
  );

  assert.deepEqual(paises, original);
});

test("termo vazio retorna todos em ordem alfabética", () => {
  const resultado = ordenarPaisesParaBusca(
    [
      { nome: "Chile" },
      { nome: "Argentina" },
      { nome: "Brasil" },
    ],
    "   ",
  );

  assert.deepEqual(
    resultado.paises.map((pais) => pais.nome),
    ["Argentina", "Brasil", "Chile"],
  );
});

test("termo sem correspondência retorna lista vazia", () => {
  const resultado = ordenarPaisesParaBusca(
    [{ nome: "Brasil" }],
    "xyz",
  );

  assert.deepEqual(resultado.paises, []);
  assert.equal(resultado.comparacoes, 0);
  assert.equal(resultado.deslocamentos, 0);
});