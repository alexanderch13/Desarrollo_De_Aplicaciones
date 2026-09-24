function Header() {
  const titulo = "Catálogo Interactivo de Tecnologías y Herramientas";
  const subtitulo = "Desarrollo de Aplicaciones • Laboratorio N° 06";

  return (
    <header className="header">
      <h1 className="header-title">{titulo}</h1>
      <p className="header-subtitle">{subtitulo}</p>
    </header>
  );
}

export default Header;
