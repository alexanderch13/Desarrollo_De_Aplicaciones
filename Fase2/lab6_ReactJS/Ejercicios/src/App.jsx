import { useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import Formulario from './components/Formulario'
import catalogoData from './data/catalogoData'
import './App.css'

function App() {
  const [catalogo, setCatalogo] = useState(catalogoData)

  function cambiarEstado(id) {
    setCatalogo(
      catalogo.map((item) =>
        item.id === id
          ? {
              ...item,
              estado: item.estado === 'pendiente' ? 'completado' : 'pendiente',
            }
          : item
      )
    )
  }

  function eliminarElemento(id) {
    setCatalogo(catalogo.filter((item) => item.id !== id))
  }

  function agregarElemento(nuevo) {
    setCatalogo([...catalogo, nuevo])
  }

  const totalElementos = catalogo.length
  const totalPendientes = catalogo.filter(
    (item) => item.estado === 'pendiente'
  ).length
  const totalCompletados = catalogo.filter(
    (item) => item.estado === 'completado'
  ).length

  return (
    <main className="app-wrapper">
      <Header />

      <section className="main-content">
        <section className="catalogo-intro">
          <h2>Coleccion de Elementos</h2>
          <p>
            Explore la coleccion interactiva de tecnologias. Seleccione, gestione
            o visualice detalles de cada elemento.
          </p>
        </section>

        <section className="panel-estado">
          <p>
            Total: <strong>{totalElementos}</strong> &bull; Pendientes:{' '}
            <strong>{totalPendientes}</strong> &bull; Completados:{' '}
            <strong>{totalCompletados}</strong>
          </p>
        </section>

        <Formulario onAgregar={agregarElemento} />

        <section className="catalogo-grid">
          {catalogo.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              categoria={item.categoria}
              estado={item.estado}
              onCambiarEstado={() => cambiarEstado(item.id)}
              onEliminar={() => eliminarElemento(item.id)}
            />
          ))}
        </section>
      </section>

      <Footer />
    </main>
  )
}

export default App
