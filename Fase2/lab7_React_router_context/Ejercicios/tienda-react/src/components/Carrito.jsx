import { Link } from 'react-router-dom'
import ItemCarrito from './ItemCarrito'

export default function Carrito({
  carrito,
  eliminarDelCarrito,
  actualizarCantidad
}) {
  const total = carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0)

  return (
    <div className="carrito-contenedor">
      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
          <Link to="/catalogo">Volver al catálogo</Link>
        </div>
      ) : (
        <>
          {carrito.map(item => (
            <ItemCarrito
              key={item.id}
              item={item}
              eliminarDelCarrito={eliminarDelCarrito}
              actualizarCantidad={actualizarCantidad}
            />
          ))}
          <div className="carrito-total">
            Total: ${total.toFixed(2)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/catalogo" style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-primario)',
              color: 'white',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              Volver al catálogo
            </Link>
          </div>
        </>
      )}
    </div>
  )
}