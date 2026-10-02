function Buscador({ valor, onCambiar }) {
  const manejarEnvio = (evento) => {
    evento.preventDefault();
  };

  return (
    <form onSubmit={manejarEnvio} style={{ margin: "16px 0" }}>
      <input
        type="text"
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        placeholder="Buscar productos..."
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
      />
    </form>
  );
}

export default Buscador;