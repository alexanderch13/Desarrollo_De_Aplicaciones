import { useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import catalogoData from './data/catalogoData'
import Formulario from './components/Formulario'
import './App.css'

function App() {
  const [tecnologias, setTecnologias] = useState(catalogoData)

  function agregarTecnologia(nuevaTecnologia) {
    setTecnologias([...tecnologias, nuevaTecnologia])
  }

  function cambiarEstado(id) {
    setTecnologias(
      tecnologias.map((tec) =>
        tec.id === id ? { ...tec, completado: !tec.completado } : tec
      )
    )
  }

  function eliminarTecnologia(id) {
    setTecnologias(tecnologias.filter((tec) => tec.id !== id))
  }

  const totalCompletadas = tecnologias.filter((tec) => tec.completado).length

  return (
    <main className="app-layout">
      <Header />

      <section className="info-panel">
        <h2>Práctica N.º 6 — ReactJS</h2>
        <p>
          Catálogo interactivo con componentes, props, eventos y estado local.
        </p>
        <span className="estado-badge">
          Completadas: {totalCompletadas} de {tecnologias.length}
        </span>
      </section>

      <Formulario onAgregar={agregarTecnologia} />

      <section className="catalogo-grid">
        {tecnologias.map((tec) => (
          <Card
            key={tec.id}
            nombre={tec.nombre}
            descripcion={tec.descripcion}
            categoria={tec.categoria}
            imagen={tec.imagen}
            completado={tec.completado}
            onCambiarEstado={() => cambiarEstado(tec.id)}
            onEliminar={() => eliminarTecnologia(tec.id)}
          />
        ))}
      </section>

      <Footer />
    </main>
  )
}

export default App
