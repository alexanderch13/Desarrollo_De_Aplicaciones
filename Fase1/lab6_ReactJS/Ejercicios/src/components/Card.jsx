function Card() {
  // Estructura modelo estática para la visualización inicial del catálogo
  const elementoEjemplo = {
    id: 1,
    nombre: "React",
    descripcion: "Biblioteca de JavaScript orientada a la creación de interfaces de usuario modulares y declarativas.",
    categoria: "Frontend"
  };

  return (
    <article className="catalogo-card">
      <div className="card-header">
        <span className="card-badge">{elementoEjemplo.categoria}</span>
        <span className="card-id">ID: #{elementoEjemplo.id}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{elementoEjemplo.nombre}</h3>
        <p className="card-desc">{elementoEjemplo.descripcion}</p>
      </div>
      <div className="card-footer">
        <button type="button" className="btn-placeholder" disabled>
          Acción de estado (Pendiente)
        </button>
      </div>
    </article>
  );
}

export default Card;
