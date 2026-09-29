import ProductoCard from "./ProductoCard";

function ListaProductos({ productos, onAgregarAlCarrito }) {
  if (productos.length === 0) {
    return <p>No se encontraron productos disponibles.</p>;
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      padding: "16px 0"
    }}>
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          onAgregarAlCarrito={onAgregarAlCarrito}
        />
      ))}
    </div>
  );
}

export default ListaProductos;
