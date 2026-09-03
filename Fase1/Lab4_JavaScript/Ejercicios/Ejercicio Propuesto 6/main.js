// 1. Crear la función con parámetros y valor por defecto
function registrarParticipante(nombre, edad, correo, tipo = "general") {
  // Validaciones que lanzan excepciones (throw) si no se cumplen[cite: 3]
  if (!nombre || nombre.trim() === "") throw new Error("El nombre no puede estar vacío.");
  if (typeof edad !== 'number' || edad < 18) throw new Error("La edad debe ser numérica y mayor o igual a 18.");
  if (!correo || correo.trim() === "") throw new Error("El correo no puede estar vacío.");
  if (tipo !== "general" && tipo !== "estudiante") throw new Error("Tipo inválido. Use 'general' o 'estudiante'.");

  // Determinar la tarifa
  const costo = tipo === "estudiante" ? 30 : 50;

  // Si todo es correcto, retorna el objeto[cite: 3]
  return { nombre, edad, correo, tipo, costo };
}

// 2. Crear el array para almacenar a los participantes[cite: 3]
const participantes = [];

// 3. Función auxiliar para ejecutar el registro usando try...catch[cite: 3]
function intentarRegistro(nombre, edad, correo, tipo) {
  try {
    const nuevoParticipante = registrarParticipante(nombre, edad, correo, tipo);
    participantes.push(nuevoParticipante); // Lo guardamos en el array
  } catch (error) {
    // Si registrarParticipante lanza un Error, el catch lo captura aquí[cite: 3]
    console.error(`No se pudo registrar a ${nombre}:`, error.message);
  }
}

// Registramos 5 válidos y 1 inválido para comprobar que el catch funciona
intentarRegistro("Ana", 22, "ana@mail.com", "estudiante");
intentarRegistro("Luis", 30, "luis@mail.com", "general");
intentarRegistro("Carlos", 19, "carlos@mail.com", "estudiante");
intentarRegistro("María", 25, "maria@mail.com", "general");
intentarRegistro("Jorge", 21, "jorge@mail.com", "estudiante");
intentarRegistro("Menor", 16, "menor@mail.com", "general"); // Fallará por la edad

// 4. Mostrar únicamente los participantes de tipo estudiante (filter)[cite: 3]
const estudiantes = participantes.filter(p => p.tipo === "estudiante");
console.log("ESTUDIANTES:", estudiantes);

// 5. Obtener únicamente sus nombres (map)[cite: 3]
const nombresEstudiantes = estudiantes.map(p => p.nombre);
console.log("NOMBRES DE ESTUDIANTES:", nombresEstudiantes);

// 6. Calcular el monto total recaudado (reduce)[cite: 3]
// El 0 final es el valor inicial del acumulador[cite: 3]
const totalRecaudado = participantes.reduce((acumulador, p) => acumulador + p.costo, 0);
console.log("TOTAL RECAUDADO: S/", totalRecaudado);

// 7. Buscar un participante por correo (find)[cite: 3]
const participanteBuscado = participantes.find(p => p.correo === "luis@mail.com");
console.log("BÚSQUEDA POR CORREO:", participanteBuscado);