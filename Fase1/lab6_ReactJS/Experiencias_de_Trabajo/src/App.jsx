import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import catalogoData from './data/catalogoData';
import './App.css';

function App() {
  // Variables requeridas por la Exp. 01 Parte 2
  const practicaNumero = 6;
  const descripcionGeneral =
    "Este proyecto implementa el catálogo interactivo con componentes modulares, props y renderizado dinámico de listas en React.";
  const estadoProyecto = "Fase 2: Props y renderizado dinámico con map()";

  return (
    <div className="app-layout">
      {/* Componente Header */}
      <Header />

      {/* Contenido principal con expresiones JSX */}
      <main className="main-content">
        <section className="info-panel">
          <h2>Práctica N° {practicaNumero}</h2>
          <p>{descripcionGeneral}</p>
          <span className="estado-badge">Estado actual: {estadoProyecto}</span>
        </section>

        {/* Catálogo interactivo renderizado dinámicamente a partir de
            catalogoData. Se usa map() para generar un <Card/> por cada
            objeto y 'key' (item.id) para que React identifique cada
            elemento de forma estable entre renders. */}
        <section className="catalogo-grid">
          {catalogoData.map((item) => (
            <Card
              key={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              categoria={item.categoria}
              imagen={item.imagen}
            />
          ))}
        </section>
      </main>

      {/* Componente Footer */}
      <Footer />
    </div>
  );
}

export default App;
