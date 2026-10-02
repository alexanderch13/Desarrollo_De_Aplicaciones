import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import TareasLayout from "./pages/TareasLayout";
import TareasApp from "./components/TareasApp";
import TareaDetalle from "./components/TareaDetalle";
import "./App.css";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al cargar tareas");
        return respuesta.json();
      })
      .then((datos) => {
        const tareasTransformadas = datos.map((tarea) => ({
          id: tarea.id,
          titulo: tarea.title,
          completada: tarea.completed,
        }));
        setTareas(tareasTransformadas);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="contenedor-carga">
        <p className="texto-carga">Cargando tareas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contenedor-error">
        <p className="texto-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tareas" element={<TareasLayout />}>
          <Route index element={<TareasApp tareas={tareas} setTareas={setTareas} />} />
          <Route path=":id" element={<TareaDetalle tareas={tareas} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
