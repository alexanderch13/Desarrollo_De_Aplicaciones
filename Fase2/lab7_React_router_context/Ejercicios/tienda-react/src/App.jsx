import ListaProductos from "./components/ListaProductos";

const mockProductos = [
  {
    id: 1,
    title: "Mochila Fjallraven Foldsack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  {
    id: 2,
    title: "Camiseta Slim Fit para Hombre",
    price: 22.3,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  }
];

function App() {
  const handleAgregar = (producto) => {
    console.log("Producto seleccionado:", producto);
  };

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Catálogo de Productos</h1>
      <ListaProductos productos={mockProductos} onAgregarAlCarrito={handleAgregar} />
    </main>
  );
}

export default App;
