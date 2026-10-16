import reflex as rx

def tarjeta_tarea(titulo: str, descripcion: str, estado: str) -> rx.Component:
    """Componente reutilizable para el tablero Kanban."""
    color_borde = rx.match(
        estado,
        ("Pendiente", "#FFC107"),
        ("En progreso", "#2196F3"),
        ("Completada", "#4CAF50"),
        "#E0E0E0"
    )
    return rx.box(
        rx.vstack(
            rx.heading(titulo, size="4"),
            rx.text(descripcion, size="2", color="#4B5563"),
            rx.badge(estado, color_scheme="gray", variant="soft"),
            align_items="start",
            spacing="2",
        ),
        padding="15px",
        border=f"2px solid {color_borde}",
        border_radius="8px",
        background_color="#FFFFFF",
        box_shadow="0 2px 6px #00000010",
        width="100%",
        margin_bottom="10px",
    )

def panel_indicadores(total: int, pendientes: int, en_progreso: int, completadas: int) -> rx.Component:
    """Panel de indicadores para el Ejercicio 2."""
    def tarjeta_indicador(titulo: str, valor: int, color: str) -> rx.Component:
        return rx.box(
            rx.vstack(
                rx.text(titulo, size="2", font_weight="bold"),
                rx.heading(valor, size="6", color=color),
                align_items="center",
            ),
            padding="20px",
            border="1px solid #E5E7EB",
            border_radius="10px",
            background_color="#F9FAFB",
            flex="1",
            text_align="center",
        )
    return rx.hstack(
        tarjeta_indicador("Total", total, "#1F2937"),
        tarjeta_indicador("Pendientes", pendientes, "#FFC107"),
        tarjeta_indicador("En Progreso", en_progreso, "#2196F3"),
        tarjeta_indicador("Completadas", completadas, "#4CAF50"),
        spacing="4",
        width="100%",
    )