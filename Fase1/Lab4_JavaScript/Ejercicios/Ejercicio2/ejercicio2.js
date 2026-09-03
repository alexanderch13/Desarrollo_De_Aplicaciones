/*
ARCHIVO     : ejercicio2.js
AUTOR       : [Nombre del estudiante]
FECHA       : 03/09/2026
DESCRIPCIÓN : Analiza calificaciones mediante métodos de arrays.
*/

// Datos originales de la guía.
const estudiantes = [
    { nombre: "Andrea", nota: 17 },
    { nombre: "Carlos", nota: 11 },
    { nombre: "Lucía", nota: 19 },
    { nombre: "Mateo", nota: 8 },
    { nombre: "Valeria", nota: 14 }
];

const NOTA_MINIMA = 13;

// 1. Obtener únicamente los nombres.
const nombres = estudiantes.map(estudiante => estudiante.nombre);

// 2. Seleccionar estudiantes con nota mayor o igual a 13.
const aprobados = estudiantes.filter(
    estudiante => estudiante.nota >= NOTA_MINIMA
);

// 3. Buscar a Lucía.
const lucia = estudiantes.find(
    estudiante => estudiante.nombre === "Lucía"
);

// 4. Sumar las notas y calcular el promedio general.
const sumaNotas = estudiantes.reduce(
    (acumulador, estudiante) => acumulador + estudiante.nota, 0
);
const promedio = sumaNotas / estudiantes.length;

// 5. Contar los estudiantes desaprobados.
const cantidadDesaprobados = estudiantes.filter(
    estudiante => estudiante.nota < NOTA_MINIMA
).length;

// 7. Crear nuevos objetos con estado, sin modificar los originales.
const estudiantesConEstado = estudiantes.map(estudiante => ({
    ...estudiante,
    estado: estudiante.nota >= NOTA_MINIMA
        ? "Aprobado"
        : "Desaprobado"
}));

// 6. Mostrar claramente todos los resultados en la consola.
console.log("1. Nombres:", nombres);
console.log("2. Aprobados:", aprobados);
console.log("3. Estudiante buscada:", lucia);
console.log("4. Promedio general:", promedio.toFixed(2));
console.log("5. Cantidad de desaprobados:", cantidadDesaprobados);
console.log("7. Estudiantes con estado:", estudiantesConEstado);
