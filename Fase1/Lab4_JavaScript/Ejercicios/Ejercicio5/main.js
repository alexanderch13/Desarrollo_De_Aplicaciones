const duplicar = n => n * 2;
const sumarDiez = n => n + 10;
const cuadrado = n => n ** 2;

function pipeline(...transformaciones) {
  return function (valorInicial) {
    return transformaciones.reduce(
      (valorActual, transformacion) => transformacion(valorActual),
      valorInicial
    );
  };
}

const operacion = pipeline(duplicar, sumarDiez, cuadrado);
console.log(operacion(5));

const otraOperacion = pipeline(sumarDiez, duplicar);
console.log(otraOperacion(5));