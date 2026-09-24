function Footer() {
  const anio = 2026;
  const institucion = "Universidad Católica de Santa María";

  return (
    <footer className="footer">
      <p>&copy; {anio} {institucion} - Escuela Profesional de Ingeniería de Sistemas</p>
    </footer>
  );
}

export default Footer;
