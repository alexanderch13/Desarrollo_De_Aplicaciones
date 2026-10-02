import TareaItem from "./TareaItem";

export default function TareaLista({ tareas, onToggle, onDelete }) {
  if (tareas.length === 0) {
    return <p className="sin-tareas">No hay tareas registradas</p>;
  }

  return (
    <ul className="lista-tareas">
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
