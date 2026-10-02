import { useState } from "react";

export default function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo.trim()) {
      onAgregar(titulo);
      setTitulo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-tarea">
      <input
        type="text"
        placeholder="Agregar nueva tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="input-tarea"
      />
      <button type="submit" className="boton-agregar">
        Agregar
      </button>
    </form>
  );
}
