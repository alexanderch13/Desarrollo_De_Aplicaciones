export default function ItemCarrito({
  item,
  eliminarDelCarrito,
  actualizarCantidad
}) {
  const subtotal = (item.price * item.cantidad).toFixed(2)

  return (
    <div className="carrito-item">
      <img src={item.images[0]} alt={item.title} />
      <div className="carrito-item-detalles">
        <h3>{item.title}</h3>
        <p>${item.price}</p>
      </div>
      <div className="carrito-item-controles">
        <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>
          −
        </button>
        <span style={{ minWidth: '40px', textAlign: 'center' }}>
          {item.cantidad}
        </span>
        <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
          +
        </button>
        <span style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
          ${subtotal}
        </span>
        <button
          className="carrito-item-eliminar"
          onClick={() => eliminarDelCarrito(item.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}