import reflex as rx
from .componentes import tarjeta_tarea, panel_indicadores


class EstadoKanban(rx.State):
    """Estado que administra las tareas del tablero Kanban."""
    
    tareas: list[dict[str, str]] = [
        {"id": "1", "titulo": "Diseñar BD",     "descripcion": "Modelo entidad-relación", "estado": "Pendiente"},
        {"id": "2", "titulo": "Configurar API", "descripcion": "Endpoints de autenticación", "estado": "Pendiente"},
        {"id": "3", "titulo": "Frontend UI",    "descripcion": "Maquetación de componentes", "estado": "En progreso"},
        {"id": "4", "titulo": "Testing",        "descripcion": "Pruebas unitarias",         "estado": "En progreso"},
        {"id": "5", "titulo": "Setup Proyecto", "descripcion": "Inicialización con uv",     "estado": "Completada"},
        {"id": "6", "titulo": "Documentación",  "descripcion": "Redacción del README",      "estado": "Completada"},
    ]
    mostrar_solo_pendientes: bool = False

    # ---------- EVENTOS ----------
    @rx.event
    def toggle_filtro(self):
        self.mostrar_solo_pendientes = not self.mostrar_solo_pendientes

    @rx.event
    def cambiar_estado(self, id_tarea: str):
        for t in self.tareas:
            if t["id"] == id_tarea:
                if t["estado"] == "Pendiente":
                    t["estado"] = "En progreso"
                elif t["estado"] == "En progreso":
                    t["estado"] = "Completada"
                else:
                    t["estado"] = "Pendiente"
                break

    # ---------- @rx.var del EJERCICIO 1 (filtro) ----------
    @rx.var
    def tareas_visibles(self) -> list[dict[str, str]]:
        if self.mostrar_solo_pendientes:
            return [t for t in self.tareas if t["estado"] == "Pendiente"]
        return self.tareas

    # ---------- @rx.var del EJERCICIO 2 (indicadores) ----------
    @rx.var
    def total_tareas(self) -> int:
        return len(self.tareas)

    @rx.var
    def total_pendientes(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "Pendiente")

    @rx.var
    def total_en_progreso(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "En progreso")

    @rx.var
    def total_completadas(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "Completada")

    @rx.var
    def porcentaje_completadas(self) -> str:
        if len(self.tareas) == 0:
            return "0%"
        return f"{round((self.total_completadas / len(self.tareas)) * 100, 1)}%"


def index() -> rx.Component:
    return rx.container(
        rx.vstack(
            rx.heading("Tablero Kanban - Ejercicios", size="8"),
            
            # -------- EJERCICIO 2: Panel de indicadores --------
            panel_indicadores(
                EstadoKanban.total_tareas,
                EstadoKanban.total_pendientes,
                EstadoKanban.total_en_progreso,
                EstadoKanban.total_completadas,
                EstadoKanban.porcentaje_completadas,
            ),
            
            # -------- EJERCICIO 1: Filtro --------
            rx.button(
                rx.cond(
                    EstadoKanban.mostrar_solo_pendientes,
                    "Mostrar todas las tareas",
                    "Mostrar solo pendientes",
                ),
                on_click=EstadoKanban.toggle_filtro,
                color_scheme="purple", size="3",
            ),
            
            # -------- EJERCICIO 1: Mensaje cuando no hay tareas --------
            rx.cond(
                EstadoKanban.tareas_visibles.length() == 0,
                rx.text("No hay tareas que cumplan el filtro",
                        color="gray", font_style="italic")
            ),
            
            # -------- EJERCICIO 1: Lista dinámica de tareas --------
            rx.vstack(
                rx.foreach(
                    EstadoKanban.tareas_visibles,
                    lambda t: tarjeta_tarea(
                        t,
                        lambda: EstadoKanban.cambiar_estado(t["id"])
                    )
                ),
                spacing="3", width="100%",
            ),
            
            spacing="5", padding="20px", width="100%",
        ),
        max_width="900px", margin="0 auto",
    )


app = rx.App()
app.add_page(index, route="/")