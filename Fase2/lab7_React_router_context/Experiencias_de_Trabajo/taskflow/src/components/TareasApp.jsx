import { useState } from "react";
import TareaLista from "./TareaLista"; // Al estar en la misma carpeta, se usa "./"

function TareasApp() {
  // Inicializamos el estado local con 3 tareas de ejemplo
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Revisar el marco teórico", completada: true },
    { id: 2, titulo: "Resolver la Experiencia 2", completada: false },
    { id: 3, titulo: "Repasar Hooks", completada: false },
  ]);

  // Modificamos el estado devolviendo un arreglo totalmente NUEVO sin mutar el original
  const alternarTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  return <TareaLista tareas={tareas} onAlternar={alternarTarea} />;
}

export default TareasApp;
