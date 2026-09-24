function Footer() {
  const curso = "Desarrollo de Aplicaciones";
  const laboratorio = "Laboratorio N° 06: ReactJS";
  const anio = 2026;

  return (
    <footer className="footer">
      <p>{curso} | {laboratorio}</p>
      <small>&copy; {anio} - Todos los derechos reservados.</small>
    </footer>
  );
}

export default Footer;
