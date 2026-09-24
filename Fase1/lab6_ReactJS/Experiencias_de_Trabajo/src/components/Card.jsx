function Card() {
  // Datos estáticos temporales que definen la estructura del catálogo (Ejercicio 1)
  const item = {
    nombre: "React",
    descripcion: "Biblioteca declarativa para construir interfaces de usuario basadas en componentes.",
    categoria: "Frontend",
    imagen: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"
  };

  return (
    <article className="card">
      <img src={item.imagen} alt={item.nombre} className="card-imagen" />
      <div className="card-body">
        <span className="categoria-tag">{item.categoria}</span>
        <h3>{item.nombre}</h3>
        <p>{item.descripcion}</p>
      </div>
    </article>
  );
}

export default Card;
