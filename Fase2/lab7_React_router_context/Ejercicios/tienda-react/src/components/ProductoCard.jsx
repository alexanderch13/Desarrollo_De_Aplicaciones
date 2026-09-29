function ProductoCard({ producto, onAgregarAlCarrito }) {
  const { title, price, image } = producto;

  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      background: "#fff"
    }}>
      <img
        src={image}
        alt={title}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          marginBottom: "12px"
        }}
      />
      <h4 style={{ fontSize: "0.95rem", margin: "8px 0" }}>{title}</h4>
      <p style={{ fontWeight: "bold", color: "#2563eb", margin: "6px 0" }}>
        ${price.toFixed(2)}
      </p>
      <button
        onClick={() => onAgregarAlCarrito(producto)}
        style={{
          marginTop: "auto",
          padding: "8px 12px",
          backgroundColor: "#0284c7",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductoCard;
