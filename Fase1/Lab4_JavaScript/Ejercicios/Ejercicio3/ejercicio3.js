/*************************************************************************************************
  ARCHIVO     : ejercicio3.js
  AUTOR       : Eduardo Gabriel Morales Cárdenas
  FECHA       : 04/09/2026
  DESCRIPCIÓN : Implementación del generador de códigos únicos utilizando closures[cite: 1].
*************************************************************************************************/

function crearGeneradorCodigo(prefijo) {
    let contador = 0;
    return function() {
        contador++;
        return prefijo + "-" + contador;
    };
}

console.log("=== EJERCICIO 3: Generador de Códigos ===");

const generarAlumno = crearGeneradorCodigo("ALU");
console.log(generarAlumno()); // ALU-1[cite: 1]
console.log(generarAlumno()); // ALU-2[cite: 1]

const generarDocente = crearGeneradorCodigo("DOC");
console.log(generarDocente()); // DOC-1[cite: 1]
console.log(generarAlumno());  // ALU-3[cite: 1]
console.log(generarDocente()); // DOC-2[cite: 1]