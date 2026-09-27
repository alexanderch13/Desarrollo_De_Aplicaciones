import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import catalogoData from './data/catalogoData';
import './App.css';

function App() {
  const descripcionCatalogo =
    "Explore la colección interactiva de tecnologías. Seleccione, gestione o visualice detalles de cada elemento.";

  // Base del Ejercicio 3 (Panel de estado): por ahora se calcula de forma
  // estática a partir del arreglo. Luz convertirá esta información en
  // estado reactivo (useState) para que se actualice con la interacción
  // del usuario en el siguiente commit.
  const totalElementos = catalogoData.length;
  const totalPendientes = catalogoData.filter(
    (item) => item.estado === "pendiente"
  ).length;

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <section className="catalogo-intro">
          <h2>Colección de Elementos</h2>
          <p>{descripcionCatalogo}</p>
        </section>

        {/* Panel de estado (base para Ejercicio 3).
            Muestra un resumen estático que Luz hará dinámico con useState. */}
        <section className="panel-estado">
          <p>
            Total de elementos: <strong>{totalElementos}</strong> &bull;
            Pendientes: <strong>{totalPendientes}</strong>
          </p>
        </section>

        {/* Catálogo renderizado dinámicamente con map() a partir de
            catalogoData. La prop 'key' usa el id único de cada objeto. */}
        <section className="catalogo-grid">
          {catalogoData.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              categoria={item.categoria}
              estado={item.estado}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
