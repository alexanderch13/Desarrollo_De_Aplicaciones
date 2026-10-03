import ProductoCard from './ProductoCard'
import BuscadorProducto from './BuscadorProducto'

export default function ListaProductos({
  productos,
  búsqueda,
  setBúsqueda,
  agregarAlCarrito
}) {
  return (
    <>
      <BuscadorProducto búsqueda={búsqueda} setBúsqueda={setBúsqueda} />
      {productos.length === 0 ? (
        <div className="mensaje">No se encontraron productos</div>
      ) : (
        <div className="grid-productos">
          {productos.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </>
  )
}