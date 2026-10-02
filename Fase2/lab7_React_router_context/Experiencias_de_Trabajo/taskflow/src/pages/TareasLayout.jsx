import { Outlet } from "react-router-dom";
import Encabezado from "../components/Encabezado";

export default function TareasLayout() {
  return (
    <>
      <Encabezado />
      <main className="pagina-tareas">
        <Outlet />
      </main>
    </>
  );
}