/*************************************************************************************************
  ARCHIVO        :  main.js
  AUTOR          :  Eduardo Mateo Motta Flores
  FECHA          :  04/09/2026
  DESCRIPCIÓN    :  Implementación progresiva de validaciones de tipos, detección de NaN, 
                    lanzamiento de excepciones (throw) y control de flujo (try...catch...finally) 
                    para la Experiencia Práctica N° 04.
*************************************************************************************************/

/* PARTES 1 A 6: EVOLUCIÓN DE calcularVenta() Y try...catch...finally */

function calcularVenta(precio, cantidad) {
  precio = Number(precio);
  cantidad = Number(cantidad);

  if (Number.isNaN(precio) || Number.isNaN(cantidad)) {
    throw new Error("Precio y cantidad deben ser numéricos");
  }

  if (precio <= 0 || cantidad <= 0) {
    throw new Error("Los valores deben ser mayores que cero");
  }

  return precio * cantidad;
}

console.log("--- PRUEBAS DE calcularVenta ---");

try {
  const total = calcularVenta("abc", 3); 
  console.log("Total de la venta: S/", total);
} catch (error) {
  console.error("No fue posible calcular la venta:", error.message);
} finally {
  console.log("Proceso de venta finalizado\n");
}


/*PARTE 7: CREACIÓN DE EXCEPCIÓN PROPIA (registrarProducto)*/

function registrarProducto(nombre, precio, stock) {
  if (!nombre || nombre.trim() === "") {
    throw new Error("El nombre no puede estar vacío.");
  }
  
  if (typeof precio !== 'number' || precio <= 0 || Number.isNaN(precio)) {
    throw new Error("El precio debe ser numérico y mayor que cero.");
  }
  
  if (typeof stock !== 'number' || stock < 0 || Number.isNaN(stock)) {
    throw new Error("El stock debe ser numérico y no puede ser negativo.");
  }

  return { nombre, precio, stock };
}

console.log("--- PRUEBAS DE registrarProducto ---");

function probarRegistro(nombre, precio, stock) {
  try {
    const producto = registrarProducto(nombre, precio, stock);
    console.log("Producto registrado:", producto);
  } catch (error) {
    console.error(`Fallo al registrar '${nombre}':`, error.message);
  }
}

probarRegistro("Laptop", 2500, 10);    
probarRegistro("Mouse", -50, 5);       
probarRegistro("Monitor", 800, -2);   
probarRegistro("", 120, 5);            