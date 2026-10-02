export default function Encabezado() {
  const obtenerFecha = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const año = hoy.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <header className="encabezado">
      <h1 className="titulo-encabezado">TaskFlow</h1>
      <p className="autores">
        Alexander Chipana | Luz Zambrano | Eduardo Morales | Eduardo Motta
      </p>
      <span className="fecha">{obtenerFecha()}</span>
    </header>
  );
}
