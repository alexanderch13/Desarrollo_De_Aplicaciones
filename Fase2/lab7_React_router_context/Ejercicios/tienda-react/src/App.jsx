import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogoLayout from './pages/CatalogoLayout'
import ListaProductos from './components/ListaProductos'
import Carrito from './components/Carrito'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [búsqueda, setBúsqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setProductos(datos)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  const productosFiltrados = productos.filter(p =>
    p.title.toLowerCase().includes(búsqueda.toLowerCase())
  )

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id)
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id)
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ))
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/catalogo" element={<CatalogoLayout />}>
          <Route
            index
            element={
              cargando ? (
                <div className="mensaje">Cargando productos...</div>
              ) : error ? (
                <div className="mensaje error">Error: {error}</div>
              ) : (
                <ListaProductos
                  productos={productosFiltrados}
                  búsqueda={búsqueda}
                  setBúsqueda={setBúsqueda}
                  agregarAlCarrito={agregarAlCarrito}
                />
              )
            }
          />
          <Route
            path="carrito"
            element={
              <Carrito
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                actualizarCantidad={actualizarCantidad}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App