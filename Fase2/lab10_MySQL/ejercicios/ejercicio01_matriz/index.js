'use strict';

const { generarMatriz, analizarMatriz } = require('./matriz');

function ejecutar(argumentos) {
  if (argumentos.length > 1) {
    throw new Error('Uso: node index.js [orden | --ejemplo | --help]');
  }

  if (argumentos[0] === '--help') {
    console.log('Uso: node index.js [orden | --ejemplo]');
    console.log('Sin argumentos genera una matriz aleatoria de 3 x 3.');
    console.log('El orden debe estar entre 1 y 20. --ejemplo prueba una matriz perfecta conocida.');
    return;
  }

  const usarEjemplo = argumentos[0] === '--ejemplo';
  const orden = argumentos.length === 0 ? 3 : Number(argumentos[0]);
  const matriz = usarEjemplo
    ? [[8, 1, 6], [3, 5, 7], [4, 9, 2]]
    : generarMatriz(orden);
  const resultado = analizarMatriz(matriz);

  console.log(`Matriz ${usarEjemplo ? 'de ejemplo' : 'aleatoria'} (${resultado.orden} x ${resultado.orden})`);
  console.table(matriz);
  console.log('Sumas de filas:', resultado.sumasFilas.join(', '));
  console.log('Sumas de columnas:', resultado.sumasColumnas.join(', '));
  console.log('Diagonal principal:', resultado.diagonalPrincipal);
  console.log('Diagonal secundaria:', resultado.diagonalSecundaria);
  console.log(resultado.esPerfecta ? 'La matriz ES perfecta.' : 'La matriz NO es perfecta.');
}

if (require.main === module) {
  try {
    ejecutar(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}
