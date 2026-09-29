function Card({
  id,
  nombre,
  descripcion,
  categoria,
  estado,
  onCambiarEstado,
  onEliminar,
}) {
  const estaCompletado = estado === 'completado'

  return (
    <article className="catalogo-card">
      <header className="card-header">
        <span className="card-badge">{categoria}</span>
        <span className="card-id">ID: #{id}</span>
      </header>

      <section className="card-body">
        <h3 className="card-title">{nombre}</h3>
        <p className="card-desc">{descripcion}</p>
        <p className="card-estado">
          Estado: <strong>{estaCompletado ? 'Completado' : 'Pendiente'}</strong>
        </p>
      </section>

      <footer className="card-footer">
        <button type="button" className="btn-estado" onClick={onCambiarEstado}>
          {estaCompletado ? 'Marcar pendiente' : 'Marcar completado'}
        </button>
        <button type="button" className="btn-eliminar" onClick={onEliminar}>
          Eliminar
        </button>
      </footer>
    </article>
  )
}

export default Card
