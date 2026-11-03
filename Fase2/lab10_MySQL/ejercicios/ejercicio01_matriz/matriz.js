'use strict';

// Ejercicio 01 (inciso d de la guia). Aron Daniel Guzman Flores.
// Criterio de "perfecta": filas, columnas y ambas diagonales suman lo mismo.
// La matriz se almacena en memoria; este ejercicio no pide guardarla en MySQL.

const MAX_ORDEN = 20;

function generarMatriz(orden = 3) {
  if (!Number.isInteger(orden) || orden < 1 || orden > MAX_ORDEN) {
    throw new RangeError(`El orden debe ser un entero entre 1 y ${MAX_ORDEN}.`);
  }

  // Mezclar los enteros de 1 a n² y distribuirlos sin repetir en n filas.
  const valores = Array.from({ length: orden * orden }, (_, i) => i + 1);

  for (let i = valores.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [valores[i], valores[j]] = [valores[j], valores[i]];
  }

  return Array.from({ length: orden }, (_, fila) =>
    valores.slice(fila * orden, (fila + 1) * orden),
  );
}

function sumar(valores) {
  return valores.reduce((total, numero) => {
    const suma = total + numero;
    if (!Number.isSafeInteger(suma)) {
      throw new RangeError('La suma supera el rango de enteros seguros de JavaScript.');
    }
    return suma;
  }, 0);
}

function analizarMatriz(matriz) {
  if (!Array.isArray(matriz) || matriz.length === 0) {
    throw new TypeError('La matriz debe ser un arreglo cuadrado no vacio.');
  }

  const orden = matriz.length;

  for (const fila of matriz) {
    if (!Array.isArray(fila) || fila.length !== orden) {
      throw new TypeError('La matriz debe tener la misma cantidad de filas y columnas.');
    }
    for (const numero of fila) {
      if (!Number.isSafeInteger(numero)) {
        throw new TypeError('Cada elemento de la matriz debe ser un entero seguro.');
      }
    }
  }

  const sumasFilas = matriz.map(sumar);
  const sumasColumnas = Array.from({ length: orden }, (_, columna) =>
    sumar(matriz.map((fila) => fila[columna])),
  );
  const diagonalPrincipal = sumar(matriz.map((fila, i) => fila[i]));
  const diagonalSecundaria = sumar(matriz.map((fila, i) => fila[orden - 1 - i]));
  const sumaReferencia = sumasFilas[0];

  const esPerfecta =
    sumasFilas.every((suma) => suma === sumaReferencia) &&
    sumasColumnas.every((suma) => suma === sumaReferencia) &&
    diagonalPrincipal === sumaReferencia &&
    diagonalSecundaria === sumaReferencia;

  return {
    orden,
    sumasFilas,
    sumasColumnas,
    diagonalPrincipal,
    diagonalSecundaria,
    sumaReferencia,
    esPerfecta,
  };
}

// Funciones reutilizables desde otro archivo o un backend Node.js.
module.exports = { generarMatriz, analizarMatriz };
