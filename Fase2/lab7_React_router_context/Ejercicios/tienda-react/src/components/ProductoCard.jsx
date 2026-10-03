import '../styles/ProductoCard.css';

export default function ProductoCard({ producto, agregarAlCarrito }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/250x250?text=Imagen+No+Disponible';
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen">
        <img 
          src={producto.images?.[0] || 'https://via.placeholder.com/250x250?text=Sin+Imagen'}
          alt={producto.title}
          onError={handleImageError}
        />
      </div>
      <div className="producto-info">
        <h3>{producto.title}</h3>
        <p className="precio">${producto.price.toFixed(2)}</p>
        <button 
          className="btn-agregar"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}