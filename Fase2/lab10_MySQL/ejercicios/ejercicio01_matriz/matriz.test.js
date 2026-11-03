'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generarMatriz, analizarMatriz } = require('./matriz');

test('genera y almacena n filas de n enteros, del 1 al n² sin repetir', () => {
  for (const orden of [1, 3, 4, 20]) {
    const matriz = generarMatriz(orden);
    assert.equal(matriz.length, orden);
    assert.ok(matriz.every((fila) => fila.length === orden));
    assert.equal(new Set(matriz).size, orden);
    assert.deepEqual(
      matriz.flat().sort((a, b) => a - b),
      Array.from({ length: orden * orden }, (_, i) => i + 1),
    );
  }
});

test('rechaza ordenes invalidos al generar la matriz', () => {
  for (const orden of [0, -1, 2.5, 21, NaN, Infinity, '3', null]) {
    assert.throws(() => generarMatriz(orden), RangeError);
  }
});

test('reconoce la matriz perfecta 3 x 3 y muestra todas sus sumas', () => {
  const matriz = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
  const copia = matriz.map((fila) => [...fila]);
  const resultado = analizarMatriz(matriz);
  assert.equal(resultado.esPerfecta, true);
  assert.deepEqual(resultado.sumasFilas, [15, 15, 15]);
  assert.deepEqual(resultado.sumasColumnas, [15, 15, 15]);
  assert.equal(resultado.diagonalPrincipal, 15);
  assert.equal(resultado.diagonalSecundaria, 15);
  assert.deepEqual(matriz, copia);
});

test('tambien reconoce una matriz perfecta 4 x 4', () => {
  const resultado = analizarMatriz([
    [16, 2, 3, 13],
    [5, 11, 10, 8],
    [9, 7, 6, 12],
    [4, 14, 15, 1],
  ]);
  assert.equal(resultado.esPerfecta, true);
  assert.equal(resultado.sumaReferencia, 34);
});

test('rechaza una matriz con sumas de filas y columnas diferentes', () => {
  assert.equal(analizarMatriz([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).esPerfecta, false);
});

test('comprueba la diagonal secundaria aunque filas, columnas y principal coincidan', () => {
  const resultado = analizarMatriz([[1, 2, 3], [2, 3, 1], [3, 1, 2]]);
  assert.deepEqual(resultado.sumasFilas, [6, 6, 6]);
  assert.deepEqual(resultado.sumasColumnas, [6, 6, 6]);
  assert.equal(resultado.diagonalPrincipal, 6);
  assert.equal(resultado.diagonalSecundaria, 9);
  assert.equal(resultado.esPerfecta, false);
});

test('comprueba tambien la diagonal principal', () => {
  const resultado = analizarMatriz([[3, 2, 1], [1, 3, 2], [2, 1, 3]]);
  assert.equal(resultado.diagonalPrincipal, 9);
  assert.equal(resultado.diagonalSecundaria, 6);
  assert.equal(resultado.esPerfecta, false);
});

test('acepta una matriz de un solo elemento', () => {
  assert.equal(analizarMatriz([[1]]).esPerfecta, true);
});

test('rechaza matrices vacias, no cuadradas o con valores no enteros', () => {
  const invalidas = [null, [], [1], [[1, 2]], [[1], [2]], [[NaN]], [[Infinity]], [['1']], [[1.5]], [[,]]];
  for (const matriz of invalidas) {
    assert.throws(() => analizarMatriz(matriz), TypeError);
  }
});

test('rechaza sumas que no se puedan representar con precision', () => {
  assert.throws(
    () => analizarMatriz([[Number.MAX_SAFE_INTEGER, 1], [1, 1]]),
    RangeError,
  );
});
