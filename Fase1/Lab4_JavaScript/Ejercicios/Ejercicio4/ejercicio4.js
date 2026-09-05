
const funciones = [
    { id: 1, pelicula: "Interstellar", sala: 1, precio: 18, disponibles: 12 },
    { id: 2, pelicula: "Dune", sala: 2, precio: 20, disponibles: 5 },
    { id: 3, pelicula: "Avengers", sala: 3, precio: 16, disponibles: 0 },
    { id: 4, pelicula: "Inception", sala: 1, precio: 18, disponibles: 8 }
];

function buscarFuncion(id) {
    const funcion = funciones.find(function(f) {
        return f.id === id;
    });
    if (!funcion) {
        throw new Error("La función con ID " + id + " no existe.");
    }
    return funcion;
}

function funcionesDisponibles() {
    return funciones.filter(function(f) {
        return f.disponibles > 0;
    });
}

function comprarEntradas(id, cantidad) {
    if (typeof cantidad !== "number" || isNaN(cantidad) || cantidad <= 0) {
        throw new Error("La cantidad de entradas debe ser un número válido mayor que cero.");
    }
  
    const funcion = buscarFuncion(id);
  
    if (funcion.disponibles < cantidad) {
        throw new Error("Entradas insuficientes. Disponibles: " + funcion.disponibles + ".");
    }
  
    funcion.disponibles = funcion.disponibles - cantidad;
    const total = funcion.precio * cantidad;
  
    return {
        pelicula: funcion.pelicula,
        cantidad: cantidad,
        total: total
    };
}

console.log("=== EJERCICIO 4: Sistema de Reservas de Cine ===");

// Pruebas y manejo de excepciones
try {
    console.log("Compra exitosa:");
    console.log(comprarEntradas(1, 2));
} catch (error) {
    console.error("Error en el sistema de reservas:", error.message);
}

try {
    console.log("Intento de compra excediendo stock:");
    console.log(comprarEntradas(2, 10));
} catch (error) {
    console.error("Error controlado:", error.message);
}