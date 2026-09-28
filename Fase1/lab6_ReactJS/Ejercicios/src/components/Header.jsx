function Header() {
  const titulo = 'Catalogo Interactivo de Tecnologias y Herramientas'
  const subtitulo = 'Desarrollo de Aplicaciones - Laboratorio 06'

  return (
    <header className="header">
      <h1 className="header-title">{titulo}</h1>
      <p className="header-subtitle">{subtitulo}</p>
    </header>
  )
}

export default Header
