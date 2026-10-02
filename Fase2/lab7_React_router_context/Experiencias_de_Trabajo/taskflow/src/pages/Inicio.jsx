import { Link } from "react-router-dom";
import Encabezado from "../components/Encabezado";

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main className="pagina-inicio">
        <div className="contenedor-bienvenida">
          <h2>Bienvenido a TaskFlow</h2>
          <p>Administra tus tareas de manera eficiente y sencilla.</p>
          <Link to="/tareas" className="boton-principal">
            Ver Tareas
          </Link>
        </div>
      </main>
    </>
  );
}