import reflex as rx
from .componentes import tarjeta_tarea, panel_indicadores


# ================================================================================================
# EJERCICIOS 1 Y 2: ESTADO DEL TABLERO KANBAN 
# ================================================================================================
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


# ================================================================================================
# EJERCICIO 3: SISTEMA DE REGISTRO DE SOLICITUDES
# ================================================================================================
class EstadoSolicitudes(rx.State):
    # Lista dinámica de solicitudes
    solicitudes: list[dict] = []
    mensaje_respuesta: str = ""
    tipo_mensaje: str = ""

    @rx.event
    def registrar(self, datos: dict[str, str]):
        # Extraer y limpiar
        nombre = datos.get("solicitante", "").strip()
        correo = datos.get("correo_sol", "").strip()
        tipo = datos.get("tipo_solicitud", "").strip()
        descripcion = datos.get("descripcion", "").strip()

        # Validación 1: Campos vacíos
        if not nombre or not correo or not tipo or not descripcion:
            self.mensaje_respuesta = "Todos los campos son obligatorios."
            self.tipo_mensaje = "error"
            return

        # Validación 2: Correo electrónico
        if "@" not in correo or "." not in correo.split("@")[-1]:
            self.mensaje_respuesta = "El correo electrónico no es válido."
            self.tipo_mensaje = "error"
            return

        # Validación 3: Longitud de descripción
        if len(descripcion) < 10:
            self.mensaje_respuesta = "La descripción debe tener al menos 10 caracteres."
            self.tipo_mensaje = "error"
            return

        # Si todo es válido, guardar la solicitud
        nueva_solicitud = {
            "nombre": nombre,
            "correo": correo,
            "tipo": tipo,
            "descripcion": descripcion,
        }
        self.solicitudes.append(nueva_solicitud)
        self.mensaje_respuesta = f"¡Solicitud de {nombre} registrada con éxito!"
        self.tipo_mensaje = "exito"

    @rx.event
    def eliminar(self, index: int):
        if 0 <= index < len(self.solicitudes):
            self.solicitudes.pop(index)


def tarjeta_solicitud(solicitud: dict, index: int) -> rx.Component:
    """Componente reutilizable que representa una solicitud registrada."""
    return rx.hstack(
        rx.vstack(
            rx.text(f"Tipo: {solicitud['tipo']}", font_weight="bold", color="#1F2937"),
            rx.text(f"Nombre: {solicitud['nombre']}", size="2"),
            rx.text(f"Correo: {solicitud['correo']}", size="2"),
            rx.text(f"Descripción: {solicitud['descripcion']}", size="2", font_style="italic"),
            align_items="start",
            spacing="1",
        ),
        rx.spacer(),
        rx.icon_button(
            rx.icon("trash", size=16),
            on_click=lambda: EstadoSolicitudes.eliminar(index),
            color_scheme="red",
            variant="ghost",
        ),
        width="100%",
        padding="1em",
        border="1px solid #E5E7EB",
        border_radius="8px",
        background_color="#FFFFFF",
    )


def formulario_solicitudes() -> rx.Component:
    """Componente que construye el formulario y la lista de solicitudes."""
    return rx.vstack(
        rx.heading("Ejercicio 3: Registro de Solicitudes", size="6", color="#1F2937"),
        
        rx.form(
            rx.vstack(
                rx.input(name="solicitante", placeholder="Nombre del solicitante", width="100%"),
                rx.input(name="correo_sol", placeholder="Correo electrónico", width="100%"),
                
                # Selector de tipo de solicitud
                rx.select(
                    ["Consulta", "Incidencia", "Requerimiento"],
                    name="tipo_solicitud",
                    placeholder="Seleccione el tipo de solicitud",
                    width="100%",
                ),
                
                rx.text_area(name="descripcion", placeholder="Descripción (mínimo 10 caracteres)...", width="100%", min_height="80px"),
                rx.button("Registrar Solicitud", type="submit", color_scheme="blue", width="100%"),
                spacing="4", width="100%",
            ),
            on_submit=EstadoSolicitudes.registrar, reset_on_submit=True, width="100%",
        ),

        # Mensajes de éxito o error
        rx.cond(
            EstadoSolicitudes.tipo_mensaje == "error",
            rx.box(rx.text(EstadoSolicitudes.mensaje_respuesta, color="white", font_weight="bold"), background_color="#EF4444", padding="1em", border_radius="8px", width="100%", margin_top="1em"),
        ),
        rx.cond(
            EstadoSolicitudes.tipo_mensaje == "exito",
            rx.box(rx.text(EstadoSolicitudes.mensaje_respuesta, color="white", font_weight="bold"), background_color="#10B981", padding="1em", border_radius="8px", width="100%", margin_top="1em"),
        ),

        # Lista dinámica de solicitudes
        rx.heading("Solicitudes Registradas", size="4", margin_top="1em"),
        rx.cond(
            EstadoSolicitudes.solicitudes.length() == 0,
            rx.text("No hay solicitudes registradas aún.", color="gray", font_style="italic"),
            rx.vstack(
                rx.foreach(EstadoSolicitudes.solicitudes, lambda item, index: tarjeta_solicitud(item, index)),
                width="100%",
                spacing="2",
            )
        ),

        spacing="4", padding="30px", border="1px solid #E5E7EB", border_radius="12px", background_color="#F9FAFB", width="100%",
    )


# ================================================================================================
# PÁGINA PRINCIPAL DE LOS EJERCICIOS (Integración de todos)
# ================================================================================================
def index() -> rx.Component:
    return rx.container(
        rx.vstack(
            rx.heading("Laboratorio N°09 - Ejercicios Propuestos", size="8", color="#111827", text_align="center"),
            rx.text("Equipo: Los Desarrolladores", size="4", color="#4B5563", text_align="center"),
            rx.divider(width="100%", margin_y="4"),
            
            # -------- EJERCICIO 2: Panel de indicadores --------
            panel_indicadores(
                EstadoKanban.total_tareas,
                EstadoKanban.total_pendientes,
                EstadoKanban.total_en_progreso,
                EstadoKanban.total_completadas,
                EstadoKanban.porcentaje_completadas,
            ),
            
            # -------- EJERCICIO 1: Filtro y Lista Kanban --------
            rx.button(
                rx.cond(
                    EstadoKanban.mostrar_solo_pendientes,
                    "Mostrar todas las tareas",
                    "Mostrar solo pendientes",
                ),
                on_click=EstadoKanban.toggle_filtro,
                color_scheme="purple", size="3",
            ),
            
            rx.cond(
                EstadoKanban.tareas_visibles.length() == 0,
                rx.text("No hay tareas que cumplan el filtro", color="gray", font_style="italic")
            ),
            
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

            rx.divider(width="100%", margin_y="6"),

            # -------- EJERCICIO 3: Tu Registro de Solicitudes --------
            formulario_solicitudes(),
            
            spacing="6", width="100%", align_items="center",
        ),
        padding="40px", max_width="900px", margin="0 auto", min_height="100vh", background_color="#FFFFFF",
    )

app = rx.App()
app.add_page(index, route="/", title="Ejercicios - Laboratorio 09")
