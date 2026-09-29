import Encabezado from "./components/Encabezado";
import TareasApp from "./components/TareasApp"; // Ruta corregida hacia la carpeta components

function App() {
  return (
    <div className="app">
      <Encabezado usuario="Carlos" />
      <main style={{ padding: "20px" }}>
        <h2>Mis Tareas</h2>
        <TareasApp />
      </main>
    </div>
  );
}

export default App;
