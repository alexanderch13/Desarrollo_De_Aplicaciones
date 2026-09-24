import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Variables requeridas por la Exp. 01 Parte 2
  const practicaNumero = 6;
  const descripcionGeneral = "Este proyecto implementa la estructura base de un catálogo interactivo con componentes modulares en React.";
  const estadoProyecto = "Fase 1: Cascarón estático listo";

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

        {/* Cascarón visual del catálogo interactivo (Base Ejercicio 1) */}
        <section className="catalogo-grid">
          <Card />
          <Card />
          <Card />
        </section>
      </main>

      {/* Componente Footer */}
      <Footer />
    </div>
  );
}

export default App;
