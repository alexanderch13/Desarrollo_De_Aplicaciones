import { useState } from "react";

function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Evita que el navegador recargue la página
    const limpio = titulo.trim();
    
    if (limpio === "") return; // Validación elemental de campo vacío
    
    onAgregar(limpio); // Notifica al componente padre para insertar la tarea
    setTitulo(""); // Limpia el campo de texto de forma controlada
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-tarea">
      <input
        type="text"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)} // Sincroniza el input con el estado
        placeholder="Escribe una nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;