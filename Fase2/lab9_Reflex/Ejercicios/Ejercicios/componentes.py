import reflex as rx

def tarjeta_tarea(tarea: dict[str, str], on_cambiar) -> rx.Component:
    """Componente reutilizable que representa una tarea del Kanban."""
    color_borde = rx.match(
        tarea["estado"],
        ("Pendiente", "#FFC107"),
        ("En progreso", "#2196F3"),
        ("Completada", "#4CAF50"),
        "#E0E0E0",
    )
    return rx.box(
        rx.vstack(
            rx.heading(tarea["titulo"], size="4"),
            rx.text(tarea["descripcion"], size="2", color="#4B5563"),
            rx.badge(tarea["estado"], color_scheme="gray", variant="soft"),
            rx.button(
                "Cambiar estado",
                on_click=on_cambiar,
                size="1", color_scheme="blue", margin_top="2",
            ),
            align_items="start", spacing="2",
        ),
        padding="15px",
        border=f"2px solid {color_borde}",
        border_radius="8px",
        background_color="#FFFFFF",
        box_shadow="0 2px 6px #00000010",
        width="100%",
        margin_bottom="10px",
    )


# ==========================================================
# COMPONENTE VISUAL: Tarjeta de indicador (para el panel)
# ==========================================================
def tarjeta_indicador(titulo: str, valor, color: str) -> rx.Component:
    """Componente reutilizable para mostrar un indicador numérico."""
    return rx.box(
        rx.vstack(
            rx.text(titulo, size="2", font_weight="bold", color="#6B7280"),
            rx.heading(valor, size="6", color=color),
            align_items="center", spacing="1",
        ),
        padding="20px",
        border="1px solid #E5E7EB",
        border_radius="10px",
        background_color="#F9FAFB",
        flex="1",
        text_align="center",
    )


# ==========================================================
# COMPONENTE VISUAL: Panel de indicadores (Ejercicio 2)
# ==========================================================
def panel_indicadores(total, pendientes, en_progreso, completadas, porcentaje) -> rx.Component:
    """Panel con los 5 indicadores, recibe todo por parámetros."""
    return rx.hstack(
        tarjeta_indicador("Total",         total,       "#1F2937"),
        tarjeta_indicador("Pendientes",    pendientes,  "#FFC107"),
        tarjeta_indicador("En Progreso",   en_progreso, "#2196F3"),
        tarjeta_indicador("Completadas",   completadas, "#4CAF50"),
        tarjeta_indicador("% Completadas", porcentaje,  "#8B5CF6"),
        spacing="4", width="100%", margin_bottom="20px",
    )