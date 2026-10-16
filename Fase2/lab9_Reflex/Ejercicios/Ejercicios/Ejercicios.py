import reflex as rx
from .componentes import tarjeta_tarea, panel_indicadores

def index() -> rx.Component:
    return rx.container(
        rx.vstack(
            rx.heading("Tablero Kanban - Ejercicios", size="8"),
            panel_indicadores(total=4, pendientes=1, en_progreso=1, completadas=2),
            rx.hstack(
                # Columna Pendientes
                rx.box(
                    rx.heading("Pendiente", size="5"),
                    tarjeta_tarea("Diseñar BD", "Modelo entidad-relación", "Pendiente"),
                    width="33%", padding="10px", background_color="#F3F4F6"
                ),
                # Columna En Progreso
                rx.box(
                    rx.heading("En Progreso", size="5"),
                    tarjeta_tarea("Frontend UI", "Maquetación", "En progreso"),
                    width="33%", padding="10px", background_color="#F3F4F6"
                ),
                # Columna Completadas
                rx.box(
                    rx.heading("Completada", size="5"),
                    tarjeta_tarea("Setup", "Inicialización uv", "Completada"),
                    width="33%", padding="10px", background_color="#F3F4F6"
                ),
                spacing="4", width="100%", align_items="start"
            ),
            spacing="5", padding="20px", width="100%",
        ),
        max_width="1200px", margin="0 auto",
    )

app = rx.App()
app.add_page(index, route="/")