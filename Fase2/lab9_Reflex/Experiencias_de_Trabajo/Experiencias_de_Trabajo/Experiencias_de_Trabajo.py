import reflex as rx

# ==========================================
# PARTE 3: IMPLEMENTACIÓN DEL CONTADOR (ESTADO)
# ==========================================
class EstadoContador(rx.State):
    """Clase encargada de administrar el estado del contador."""
    conteo: int = 0

    @rx.event
    def incrementar(self):
        """Aumenta el valor del contador en 1."""
        self.conteo += 1

    @rx.event
    def disminuir(self):
        """Reduce el valor del contador en 1."""
        self.conteo -= 1

    @rx.event
    def reiniciar(self):
        """Restablece el contador a cero."""
        self.conteo = 0


# ==========================================
# PARTE 3: COMPONENTE DEL CONTADOR
# ==========================================
def contador() -> rx.Component:
    """Componente visual que muestra el contador y sus botones de control."""
    return rx.vstack(
        rx.heading("Contador Interactivo", size="6", color="#1F2937"),
        
        # Valor actual del contador
        rx.text(
            EstadoContador.conteo, 
            size="9", 
            font_weight="bold", 
            color="#2563EB"
        ),
        
        # Botones de control
        rx.hstack(
            rx.button(
                "Incrementar", 
                on_click=EstadoContador.incrementar,
                color_scheme="green",
                size="3"
            ),
            rx.button(
                "Disminuir", 
                on_click=EstadoContador.disminuir,
                color_scheme="red",
                size="3"
            ),
            rx.button(
                "Reiniciar", 
                on_click=EstadoContador.reiniciar,
                color_scheme="gray",
                size="3"
            ),
            spacing="3",
        ),
        
        # Renderizado condicional (rx.cond)
        rx.cond(
            EstadoContador.conteo > 0,
            rx.text("El contador es positivo", color="green", font_weight="bold"),
            rx.text("El contador es igual o menor que cero", color="red", font_weight="bold")
        ),
        
        spacing="5",
        padding="30px",
        border="1px solid #E5E7EB",
        border_radius="12px",
        background_color="#F9FAFB",
        align_items="center",
        width="100%",
        max_width="500px",
        margin="0 auto"
    )


# ==========================================
# PARTE 2: INTERFAZ INICIAL (PÁGINA PRINCIPAL)
# ==========================================
def index() -> rx.Component:
    """Función principal que define la interfaz de la aplicación."""
    return rx.vstack(
        # Nombre de la aplicación
        rx.heading("Mi Primera Aplicación Reflex", size="8", color="#111827"),
        
        # Nombre del equipo
        rx.heading("Equipo: Los Desarrolladores", size="4", color="#4B5563"),
        
        # Breve descripción
        rx.text(
            "Esta es una aplicación web interactiva desarrollada con Python y Reflex "
            "para el Laboratorio N° 09 de Desarrollo de Aplicaciones.",
            size="3",
            color="#6B7280",
            text_align="center",
            max_width="600px"
        ),
        
        # Botón de interacción inicial
        rx.button(
            "Comenzar",
            color_scheme="blue",
            size="4",
            margin_bottom="20px"
        ),
        
        # Separador visual
        rx.divider(width="100%", margin_y="4"),
        
        # Componente del contador (Parte 3)
        contador(),
        
        spacing="5",
        padding="40px",
        align_items="center",
        width="100%",
        min_height="100vh",
        background_color="#FFFFFF"
    )


# ==========================================
# CONFIGURACIÓN DE LA APP
# ==========================================
app = rx.App()
app.add_page(index, route="/")