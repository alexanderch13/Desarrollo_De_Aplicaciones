import { useParams, Link } from "react-router-dom";

export default function TareaDetalle({ tareas }) {
  const { id } = useParams();
  const tarea = tareas.find((t) => t.id === parseInt(id));

  if (!tarea) {
    return (
      <div className="tarea-detalle error">
        <h2>Tarea no encontrada</h2>
        <Link to="/tareas" className="enlace-volver">
          ← Volver a Tareas
        </Link>
      </div>
    );
  }

  return (
    <div className="tarea-detalle">
      <h2>Detalle de Tarea</h2>
      <div className="detalle-contenido">
        <p>
          <strong>ID:</strong> <span className="valor">{tarea.id}</span>
        </p>
        <p>
          <strong>Título:</strong> <span className="valor">{tarea.titulo}</span>
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span className={tarea.completada ? "completada" : "pendiente"}>
            {tarea.completada ? "✅ Completada" : "⏳ Pendiente"}
          </span>
        </p>
      </div>
      <Link to="/tareas" className="enlace-volver">
        ← Volver a Tareas
      </Link>
    </div>
  );
}