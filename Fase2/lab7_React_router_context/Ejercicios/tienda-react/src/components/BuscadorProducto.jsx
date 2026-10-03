export default function BuscadorProducto({ búsqueda, setBúsqueda }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={búsqueda}
        onChange={(e) => setBúsqueda(e.target.value)}
      />
    </div>
  )
}