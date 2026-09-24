function Header() {
  const tituloApp = "Catálogo Interactivo de Tecnologías Web";
  const institucion = "Universidad Católica de Santa María";
  const curso = "Desarrollo de Aplicaciones";

  return (
    <header className="header">
      <h1 className="header-title">{tituloApp}</h1>
      <p className="subtitulo">{curso} &bull; {institucion}</p>
    </header>
  );
}

export default Header;
