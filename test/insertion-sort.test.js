import test from "node:test";
import assert from "node:assert/strict";
import { insertionSort } from "../src/insertion-sort.js";

test("ordena números sem modificar a lista original", () => {
  const original = [5, 2, 4, 1, 3];
  const resultado = insertionSort(original, (a, b) => a - b);
  assert.deepEqual(resultado.itens, [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [5, 2, 4, 1, 3]);
});

test("é estável quando as chaves são iguais", () => {
  const entrada = [{ grupo: 1, id: "a" }, { grupo: 1, id: "b" }];
  const resultado = insertionSort(entrada, (a, b) => a.grupo - b.grupo);
  assert.deepEqual(resultado.itens.map((item) => item.id), ["a", "b"]);
});
