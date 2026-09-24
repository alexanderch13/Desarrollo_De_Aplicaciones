import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import './App.css';

function App() {
  const descripcionCatalogo = "Explore la colección interactiva de tecnologías. Seleccione, gestione o visualice detalles de cada elemento.";

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <section className="catalogo-intro">
          <h2>Colección de Elementos</h2>
          <p>{descripcionCatalogo}</p>
        </section>

        {/* CONTENEDOR DEL CATÁLOGO:
            Estructura base montada. El siguiente integrante inyectará aquí 
            el array con mínimo 5 elementos usando .map() y props dinámicas */}
        <section className="catalogo-grid">
          <Card />
          <Card />
          <Card />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
