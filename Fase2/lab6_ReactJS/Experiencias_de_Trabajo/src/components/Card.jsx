function Card({
  nombre,
  descripcion,
  categoria,
  imagen,
  completado,
  onCambiarEstado,
  onEliminar,
}) {
  return (
    <article className="card">
      <header className="card-header">
        <img src={imagen} alt={nombre} className="card-imagen" />
      </header>

      <section className="card-body">
        <span className="categoria-tag">{categoria}</span>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="card-estado">
          Estado: <strong>{completado ? 'Completado' : 'Pendiente'}</strong>
        </p>
      </section>

      <footer className="card-acciones">
        <button type="button" onClick={onCambiarEstado}>
          {completado ? 'Marcar pendiente' : 'Marcar completado'}
        </button>
        <button type="button" onClick={onEliminar}>
          Eliminar
        </button>
      </footer>
    </article>
  )
}

export default Card
