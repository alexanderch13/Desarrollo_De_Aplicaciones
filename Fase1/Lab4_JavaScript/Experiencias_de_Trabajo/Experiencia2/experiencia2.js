/*************************************************************************************************
  ARCHIVO     : experiencia2.js
  AUTOR       : Eduardo Gabriel Morales Cárdenas
  FECHA       : 04/09/2026
  DESCRIPCIÓN : Implementación de la Experiencia de Práctica N.° 02 (De instrucciones aisladas a funciones reutilizables).
*************************************************************************************************/

console.log("=== EXPERIENCIA 2: Funciones Reutilizables ===");

// Parte 1: Nuestra primera función (Declaración)
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}
console.log("Subtotal 1 (120 * 3):", calcularSubtotal(120, 3)); // 360
console.log("Subtotal 2 (80 * 5):", calcularSubtotal(80, 5));   // 400

// Parte 2: Expresión de función y Función flecha
const calcularSubtotalExp = function(precio, cantidad) {
    return precio * cantidad;
};

const calcularSubtotalFlecha = (precio, cantidad) => precio * cantidad;

console.log("Prueba Expresión:", calcularSubtotalExp(120, 3));     // 360
console.log("Prueba Flecha:", calcularSubtotalFlecha(120, 3)); // 360

// Parte 3: Parámetros predeterminados
function calcularTotal(precio, cantidad = 1, descuento = 0) {
    const subtotal = precio * cantidad;
    return subtotal - (subtotal * descuento / 100);
}
console.log("Total con valor por defecto:", calcularTotal(100));          // 100
console.log("Total con cantidad (100, 3):", calcularTotal(100, 3));       // 300
console.log("Total con descuento (100, 3, 10):", calcularTotal(100, 3, 10)); // 270

// Parte 4: Parámetros rest
function sumarImportes(...importes) {
    console.log("Array de importes recibido:", importes);
    return importes.reduce((total, importe) => total + importe, 0);
}
console.log("Suma importes 1:", sumarImportes(100, 50));             // 150
console.log("Suma importes 2:", sumarImportes(100, 50, 80, 25));     // 255

// Parte 5: Funciones como argumentos (Callbacks / Órden superior)
const aplicarDescuento = precio => precio * 0.90;
const aplicarIGV = precio => precio * 1.18;

function procesarPrecio(precio, operacion) {
    return operacion(precio);
}
console.log("Precio con descuento de callback:", procesarPrecio(100, aplicarDescuento)); // 90
console.log("Precio con IGV de callback:", procesarPrecio(100, aplicarIGV));       // 118

// Parte 6: Función integradora calcularVenta()
function calcularVenta(precio, cantidad, descuento = 0) {
    const subtotal = precio * cantidad;
    return subtotal - (subtotal * descuento / 100);
}
console.log("Venta 1 (200 x 2):", calcularVenta(200, 2));         // 400
console.log("Venta 2 (150 x 4, 10% desc):", calcularVenta(150, 4, 10));     // 540
console.log("Venta 3 (90 x 3, 5% desc):", calcularVenta(90, 3, 5));       // 256.5