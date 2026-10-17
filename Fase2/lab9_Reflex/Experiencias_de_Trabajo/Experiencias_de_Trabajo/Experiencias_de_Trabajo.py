import reflex as rx

class EstadoContador(rx.State):
    conteo: int = 0

    @rx.event
    def incrementar(self):
        self.conteo += 1

    @rx.event
    def disminuir(self):
        self.conteo -= 1

    @rx.event
    def reiniciar(self):
        self.conteo = 0

def contador() -> rx.Component:
    return rx.vstack(
        rx.heading("Experiencia 1: Contador Interactivo", size="6", color="#1F2937"),
        rx.text(EstadoContador.conteo, size="9", font_weight="bold", color="#2563EB"),
        rx.hstack(
            rx.button("Incrementar", on_click=EstadoContador.incrementar, color_scheme="green", size="3"),
            rx.button("Disminuir", on_click=EstadoContador.disminuir, color_scheme="red", size="3"),
            rx.button("Reiniciar", on_click=EstadoContador.reiniciar, color_scheme="gray", size="3"),
            spacing="3",
        ),
        rx.cond(
            EstadoContador.conteo > 0,
            rx.text("El contador es positivo", color="green", font_weight="bold"),
            rx.cond(
                EstadoContador.conteo < 0,
                rx.text("El contador es negativo", color="red", font_weight="bold"),
                rx.text("El contador es igual a cero", color="gray", font_weight="bold"),
            ),
        ),
        spacing="5", padding="30px", border="1px solid #E5E7EB", border_radius="12px",
        background_color="#F9FAFB", align_items="center", width="100%",
    )

class EstadoTareas(rx.State):
    tareas: list[str] = ["Diseñar interfaz", "Crear componentes", "Probar aplicación"]

    @rx.event
    def agregar_tarea(self, datos: dict[str, str]):
        nombre_tarea = datos.get("nombre_tarea", "").strip()
        if nombre_tarea:
            self.tareas.append(nombre_tarea)

    @rx.event
    def eliminar_tarea(self, tarea_a_eliminar: str):
        if tarea_a_eliminar in self.tareas:
            self.tareas.remove(tarea_a_eliminar)

def tarjeta_tarea(tarea: rx.Var[str]) -> rx.Component:
    return rx.hstack(
        rx.text(tarea, font_weight="bold"),
        rx.spacer(),
        rx.icon_button(rx.icon("x", size=16), on_click=lambda: EstadoTareas.eliminar_tarea(tarea), color_scheme="red", variant="ghost", size="1"),
        width="100%", padding="0.75em", border="1px solid #cccccc", border_radius="8px", background_color="#FFFFFF", align="center",
    )

def lista_tareas() -> rx.Component:
    return rx.vstack(
        rx.heading("Experiencia 2: Lista de Tareas", size="6", color="#1F2937"),
        rx.form(
            rx.hstack(
                rx.input(name="nombre_tarea", placeholder="Nueva tarea...", required=True, width="100%"),
                rx.button("Agregar", type="submit", color_scheme="blue"),
                width="100%", spacing="4",
            ),
            on_submit=EstadoTareas.agregar_tarea, reset_on_submit=True, width="100%",
        ),
        rx.vstack(rx.foreach(EstadoTareas.tareas, tarjeta_tarea), width="100%", spacing="2", margin_top="1em"),
        rx.cond(
            EstadoTareas.tareas.length() == 0,
            rx.text("No hay tareas registradas", color="gray", font_style="italic"),
            rx.text(f"Total: {EstadoTareas.tareas.length()} tareas", size="2", color="gray"),
        ),
        spacing="4", padding="30px", border="1px solid #E5E7EB", border_radius="12px", background_color="#F9FAFB", width="100%",
    )


class EstadoContacto(rx.State):
    mensaje_respuesta: str = ""
    tipo_mensaje: str = ""  # "", "error", "exito"

    @rx.event
    def enviar(self, datos: dict[str, str]):
        nombre = datos.get("nombre", "").strip()
        correo = datos.get("correo", "").strip()
        mensaje = datos.get("mensaje", "").strip()

        # Validación 1: nombre no vacío
        if not nombre:
            self.mensaje_respuesta = "El nombre no puede estar vacío."
            self.tipo_mensaje = "error"
            return

        # Validación 2: correo con formato básico válido
        if "@" not in correo or "." not in correo.split("@")[-1]:
            self.mensaje_respuesta = "El correo debe tener un formato válido."
            self.tipo_mensaje = "error"
            return

        # Validación 3: mensaje con longitud mínima
        if len(mensaje) < 10:
            self.mensaje_respuesta = "El mensaje debe tener al menos 10 caracteres."
            self.tipo_mensaje = "error"
            return

        # Si todo es válido
        self.mensaje_respuesta = f"¡Gracias, {nombre}! Hemos recibido tu mensaje."
        self.tipo_mensaje = "exito"


def formulario_contacto() -> rx.Component:
    return rx.vstack(
        rx.heading("Experiencia 3: Formulario de Contacto", size="6", color="#1F2937"),
        rx.form(
            rx.vstack(
                # Quitamos 'required' y 'type="email"' para que Python haga TODA la validación
                rx.input(
                    name="nombre",
                    placeholder="Nombre completo",
                    width="100%",
                ),
                rx.input(
                    name="correo",
                    placeholder="Correo electrónico",
                    width="100%",
                ),
                rx.text_area(
                    name="mensaje",
                    placeholder="Escribe tu mensaje (mínimo 10 caracteres)...",
                    width="100%",
                    min_height="120px",
                ),
                rx.button(
                    "Enviar",
                    type="submit",
                    color_scheme="blue",
                    width="100%",
                ),
                spacing="4",
                width="100%",
            ),
            on_submit=EstadoContacto.enviar,
            reset_on_submit=True,
            width="100%",
        ),

        # Mensajes de Alerta (usando rx.box con colores de fondo para que se vean bien grandes en las capturas)
        rx.cond(
            EstadoContacto.tipo_mensaje == "error",
            rx.box(
                rx.text(EstadoContacto.mensaje_respuesta, color="white", font_weight="bold"),
                background_color="#EF4444", # Rojo
                padding="1em",
                border_radius="8px",
                width="100%",
            ),
        ),
        rx.cond(
            EstadoContacto.tipo_mensaje == "exito",
            rx.box(
                rx.text(EstadoContacto.mensaje_respuesta, color="white", font_weight="bold"),
                background_color="#10B981", # Verde
                padding="1em",
                border_radius="8px",
                width="100%",
            ),
        ),

        spacing="4", padding="30px", border="1px solid #E5E7EB", border_radius="12px", background_color="#F9FAFB", width="100%",
    )

# PÁGINA PRINCIPAL: INTEGRA LAS 3 EXPERIENCIAS
def index() -> rx.Component:
    return rx.container(
        rx.vstack(
            rx.heading("Laboratorio N°09 - Reflex", size="8", color="#111827", text_align="center"),
            rx.text("Equipo: Los Desarrolladores", size="4", color="#4B5563", text_align="center"),
            rx.text("Aplicación web interactiva desarrollada con Python y Reflex.", size="3", color="#6B7280", text_align="center", margin_bottom="1em"),
            rx.divider(width="100%", margin_y="4"),
            contador(),
            lista_tareas(),
            formulario_contacto(),
            spacing="6", width="100%", align_items="center",
        ),
        padding="40px", max_width="800px", margin="0 auto", min_height="100vh", background_color="#FFFFFF",
    )

# CONFIGURACIÓN DE LA APLICACIÓN
app = rx.App()
app.add_page(index, route="/", title="Laboratorio 09 - Reflex")
