import { Link, Outlet } from 'react-router-dom'

export default function CatalogoLayout() {
  return (
    <>
      <div className="encabezado-tienda">
        <h1>🛍️ Tienda Online</h1>
      </div>
      <nav className="nav-tienda">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/catalogo/carrito">🛒 Carrito</Link>
      </nav>
      <div className="contenedor-principal">
        <Outlet />
      </div>
    </>
  )
}