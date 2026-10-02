import { Link } from "react-router-dom";
export default function TareaItem({ tarea, onToggle, onDelete }) {
  return (
    <li className="item-tarea">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onToggle(tarea.id)}
        className="checkbox-tarea"
      />
      <Link to={`/tareas/${tarea.id}`} className="enlace-tarea">
        {tarea.titulo}
      </Link>
      <button 
        onClick={() => onDelete(tarea.id)}
        className="boton-eliminar"
      >
        ✕
      </button>
    </li>
  );
}
