/*
ARCHIVO     : main.js
AUTOR       : [Nombre del estudiante]
FECHA       : 03/09/2026
DESCRIPCIÓN : Experiencia 1: tipos, ámbito, hoisting e importe.
*/

console.log("JavaScript desde un archivo externo");

// Parte 3. Variables, constantes y tipos.
const nombreProducto = "Teclado mecánico";
let precio = 180;
let stock = 5;
const disponible = true;

console.log(nombreProducto); // Teclado mecánico
console.log(precio);         // 180
console.log(stock);          // 5
console.log(disponible);     // true

console.log(typeof nombreProducto); // string
console.log(typeof precio);         // number
console.log(typeof stock);          // number
console.log(typeof disponible);     // boolean

// Una variable con let puede recibir un valor de otro tipo.
precio = "180";
console.log(typeof precio); // string

// Parte 4. Prueba de ámbito con const y let.
function probarScopeConConst() {
    if (stock > 0) {
        const mensaje = "Producto disponible";
        let unidades = stock;

        console.log(mensaje);  // Producto disponible
        console.log(unidades); // 5
    }

    // Error intencional: mensaje pertenece al bloque if.
    console.log(mensaje);
}

try {
    probarScopeConConst();
} catch (error) {
    // Se controla el error para continuar con las demás pruebas.
    console.error(error.name + ": " + error.message);
}

// Comparación: se cambia const por var en una prueba independiente.
function probarScopeConVar() {
    if (stock > 0) {
        var mensaje = "Producto disponible";
        let unidades = stock;

        console.log(mensaje);  // Producto disponible
        console.log(unidades); // 5
    }

    // var conserva el ámbito de la función, fuera del bloque if.
    console.log(mensaje); // Producto disponible
}

probarScopeConVar();

// Parte 5. Hoisting con var.
console.log(cantidad); // undefined: aún no se asignó el valor.
var cantidad = 10;

// Hoisting con let: acceso durante la zona muerta temporal.
try {
    console.log(descuento); // ReferenceError intencional.
    let descuento = 20;
} catch (error) {
    console.error(error.name + ": " + error.message);
}

// Parte 6. Nuevas variables y cálculo del importe.
const nombreCliente = "Andrea";
const cantidadProductos = 3;
const precioUnitario = 120;
const importe = cantidadProductos * precioUnitario;

console.log("Cliente:", nombreCliente);
console.log("Cantidad:", cantidadProductos);
console.log("Precio unitario:", precioUnitario);
console.log("Importe:", importe);
