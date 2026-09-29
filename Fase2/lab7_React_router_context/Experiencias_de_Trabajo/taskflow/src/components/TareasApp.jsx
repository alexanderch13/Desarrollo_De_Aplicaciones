import { useState } from "react";
import TareaLista from "./TareaLista";
import FormularioTarea from "./FormularioTarea"; // Importación del nuevo formulario

function TareasApp() {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Revisar el marco teórico", completada: true },
    { id: 2, titulo: "Resolver la Experiencia 2", completada: false },
    { id: 3, titulo: "Repasar Hooks", completada: false },
  ]);

  // Función para agregar una nueva tarea creando un arreglo nuevo con el operador spread (...)
  const agregarTarea = (titulo) => {
    const nuevaTarea = { 
      id: Date.now(), // Generador de identificador único simple para la demo
      titulo, 
      completada: false 
    };
    setTareas([...tareas, nuevaTarea]); // Inserta de forma inmutable
  };

  const alternarTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  return (
    <div>
      <FormularioTarea onAgregar={agregarTarea} />
      <TareaLista tareas={tareas} onAlternar={alternarTarea} />
    </div>
  );
}

export default TareasApp;
