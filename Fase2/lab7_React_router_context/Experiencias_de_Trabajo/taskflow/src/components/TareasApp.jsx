import { useState } from "react";
import FormularioTarea from "./FormularioTarea";
import TareaLista from "./TareaLista";

export default function TareasApp({ tareas, setTareas }) {
  const handleAgregar = (titulo) => {
    const nuevaTarea = {
      id: Math.max(...tareas.map((t) => t.id), 0) + 1,
      titulo,
      completada: false,
    };
    setTareas([...tareas, nuevaTarea]);
  };

  const handleToggle = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const handleDelete = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const completadas = tareas.filter((t) => t.completada).length;

  return (
    <div className="tareas-app">
      <div className="stats-tareas">
        <span className="stat">Total: {tareas.length}</span>
        <span className="stat">Completadas: {completadas}</span>
      </div>
      <FormularioTarea onAgregar={handleAgregar} />
      <TareaLista tareas={tareas} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
