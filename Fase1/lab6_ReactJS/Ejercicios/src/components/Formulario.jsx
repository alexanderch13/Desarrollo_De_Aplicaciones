import { useState } from 'react'

function Formulario({ onAgregar }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
  })
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function validar() {
    if (formulario.nombre.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres.')
    }
    if (formulario.descripcion.trim().length < 10) {
      throw new Error('La descripcion debe tener al menos 10 caracteres.')
    }
    if (!formulario.categoria) {
      throw new Error('Debes seleccionar una categoria.')
    }
  }

  function manejarEnvio(event) {
    event.preventDefault()

    try {
      validar()

      const nuevoElemento = {
        id: Date.now(),
        nombre: formulario.nombre.trim(),
        descripcion: formulario.descripcion.trim(),
        categoria: formulario.categoria,
        estado: 'pendiente',
      }

      onAgregar(nuevoElemento)

      setMensaje({
        tipo: 'exito',
        texto: `Registrado: ${nuevoElemento.nombre}`,
      })
      setFormulario({ nombre: '', descripcion: '', categoria: '' })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `Error: ${error.message}` })
    } finally {
      console.log('Intento de registro finalizado.')
    }
  }

  return (
    <section className="formulario-panel">
      <h2>Registrar nuevo elemento</h2>

      <form onSubmit={manejarEnvio} className="formulario">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ej. TypeScript"
          />
        </label>

        <label>
          Descripcion:
          <input
            type="text"
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            placeholder="Breve descripcion"
          />
        </label>

        <label>
          Categoria:
          <select
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
          >
            <option value="">-- Elegir --</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Estilos">Estilos</option>
            <option value="Lenguaje">Lenguaje</option>
            <option value="Build Tool">Build Tool</option>
          </select>
        </label>

        <button type="submit">Registrar</button>
      </form>

      {mensaje.texto && (
        <p className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>
      )}
    </section>
  )
}

export default Formulario