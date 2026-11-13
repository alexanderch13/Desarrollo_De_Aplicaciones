# Laboratorio 12 Servicios REST Node.js y JWT

Implementación completa de las seis experiencias de Biblioteca Digital y los tres ejercicios de la Guía N.º 12. Organización compatible con `Fase2` del repositorio de referencia. Los encabezados del código identifican archivo y descripción, sin datos de autoría personal.

## Inicio rápido

Requisitos: Node.js 22 o superior, npm y MySQL 8.0.16 o superior (recomendado 8.4). MySQL Workbench es opcional. Ejecuta los comandos desde esta carpeta, donde se encuentra el `package-lock.json`.

```bash
npm ci
npm run preparar
npm run exp1
```

Abre `http://localhost:3001/api/libros`. Con `Ctrl+C` detén el servidor. Las experiencias 1 y 2 funcionan sin base de datos.

Para desarrollo de una experiencia concreta:

```bash
cd actividades/experiencia02
npm run dev
```

Instala las dependencias **una vez en la raíz**; las subcarpetas usan esa instalación común. No ejecutes `npm ci` dentro de las subcarpetas. Conserva la carpeta `compartido` junto a `actividades` y `ejercicios`.

## Proyectos y comandos

| Comando desde la raíz | Carpeta | Puerto predeterminado | Función |
| --- | --- | --- | --- |
| `npm run exp1` | `actividades/experiencia01` | 3001 | Express y GET en memoria |
| `npm run exp2` | `actividades/experiencia02` | 3002 | CRUD en memoria con Router y controllers |
| `npm run exp3` | `actividades/experiencia03` | 3003 | CRUD MySQL y procedimientos |
| `npm run exp4` | `actividades/experiencia04` | 3004 | MySQL con TLS obligatorio |
| `npm run exp5` | `actividades/experiencia05` | 3005 | Registro e inicio de sesión JWT |
| `npm run exp6` | `actividades/experiencia06` | 3006 | Escritura solo admin y consultas públicas |
| `npm run bodega` | `ejercicios/ejercicio01_bodega` | 3011 | Categorías y productos |
| `npm run tareas` | `ejercicios/ejercicio02_tareas_nube` | 3012 | Paginación SQL y PATCH de estado |
| `npm run matricula` | `ejercicios/ejercicio03_matricula` | 3013 | Tres roles y notas propias |

`npm start` y `npm run dev` en la raíz ejecutan la experiencia 6. Se puede cambiar el puerto en el `.env` de cada proyecto. `.env` se carga por ruta absoluta, independientemente del directorio actual.

## Preparar MySQL

1. En MySQL Workbench entra con una cuenta administradora. Para la prueba local abre `sql/00_bases_local.sql`, reemplaza la contraseña ilustrativa y ejecútalo. Crea cuatro bases separadas: `biblioteca`, `bodega`, `tareas` y `matricula`.
2. Selecciona el esquema correspondiente y ejecuta los archivos de esta tabla. Los scripts no contienen `USE` para permitir el nombre asignado por un proveedor.
3. En cada `.env`, completa host, puerto, usuario, contraseña y nombre de base. La cuenta de la API usa `EXECUTE`; los procedimientos se crean con la cuenta administradora y su seguridad de definidor predeterminada.

| Base | Script que se importa |
| --- | --- |
| biblioteca, experiencias 3 y 4 | `sql/biblioteca.sql` |
| biblioteca, experiencias 5 y 6 | `sql/biblioteca.sql` y `sql/usuarios_biblioteca.sql` |
| bodega | `sql/bodega.sql` |
| tareas | `sql/tareas.sql` |
| matricula | `sql/matricula.sql` |

No importes `usuarios_biblioteca.sql` y `matricula.sql` en la misma base: sus roles son diferentes. Las experiencias 3 a 6 pueden compartir `biblioteca`. Los scripts conservan las tablas y vuelven a crear sus procedimientos; no eliminan registros de trabajo.

Alternativa a Workbench: agrega temporalmente `DB_ADMIN_USER` y `DB_ADMIN_PASSWORD` al `.env` del proyecto y ejecuta:

```bash
npm run importar -- exp3 sql/biblioteca.sql
npm run importar -- exp5 sql/usuarios_biblioteca.sql
npm run importar -- bodega sql/bodega.sql
npm run importar -- tareas sql/tareas.sql
npm run importar -- matricula sql/matricula.sql
```

La importación necesita que la base ya exista. Después retira las variables `DB_ADMIN_*`. El importador interpreta `DELIMITER` como instrucción del cliente y envía cada sentencia por separado.

## Base MySQL en nube y TLS

En un proveedor MySQL como Aiven, crea el servicio y las bases desde su panel. Copia los datos reales de conexión y descarga su certificado CA. En las experiencias 4, 5 y 6 y en tareas se exige `DB_SSL=true`.

Ejemplo de configuración que debes completar:

```dotenv
DB_HOST=HOST_REAL_DEL_PROVEEDOR
DB_PORT=PUERTO_REAL
DB_USER=USUARIO_REAL
DB_PASSWORD=CONTRASENA_REAL
DB_NAME=biblioteca
DB_SSL=true
DB_SSL_CA=./certs/ca.pem
```

Coloca la CA en `certs/ca.pem` **dentro de la carpeta del proyecto**. La ruta relativa se resuelve desde esa carpeta. Si el servicio usa una CA pública ya confiable, deja `DB_SSL_CA` vacío. La aplicación mantiene `rejectUnauthorized: true` y `verifyIdentity: true`. No desactives la verificación para resolver errores de certificados; revisa la CA y el host.

```bash
npm run conexion -- exp4
npm run conexion -- tareas
```

El script debe mostrar la base correcta y un cifrado TLS no vacío. La versión y el cifrado pueden variar. Si el proveedor no permite `CREATE USER`, crea la cuenta desde su panel y otorga los permisos admitidos por el servicio. Si solo asigna `defaultdb`, configura esa base para un proyecto y usa esquemas o servicios separados para los demás.

## Registro, acceso y roles

`npm run preparar` genera un secreto JWT distinto por proyecto. Las cuentas públicas reciben siempre `lector` en biblioteca y `estudiante` en matrícula, aunque alguien envíe `rol: "admin"` en el JSON. Los tokens de biblioteca duran 60 minutos y los de matrícula 30 minutos.

Para crear el administrador, edita `SEED_EMAIL`, `SEED_NOMBRE` y `SEED_PASSWORD` en el `.env` del servicio y ejecuta:

```bash
npm run crear-usuario -- exp6 admin
npm run crear-usuario -- matricula admin
```

Para un docente, modifica esos tres valores en matrícula para que el correo sea diferente y ejecuta `npm run crear-usuario -- matricula docente`. El script rechaza la contraseña ilustrativa. No hay contraseñas ni tokens reales incluidos en la entrega.

| Petición | Acceso |
| --- | --- |
| `GET /api/libros` y `GET /api/libros/:id` | Público |
| `POST /api/libros`, `PUT /api/libros/:id`, `DELETE /api/libros/:id` en exp6 | admin |
| `POST /api/auth/registro`, `POST /api/auth/login` | Público |
| `GET /api/auth/perfil` | Token válido |
| `PUT /api/auth/password` en matrícula | Token y contraseña actual |
| `GET /api/cursos` en matrícula | Token válido |
| `POST /api/cursos` y `POST /api/matriculas` | admin |
| `POST /api/notas` | docente asignado al curso |
| `GET /api/notas/mias` | estudiante; solo sus propias notas |

Envía el token como `Authorization: Bearer <token>`. El cambio de contraseña incrementa `token_version`, invalida los tokens anteriores y exige iniciar sesión otra vez. No se implementa refresh token, pues es opcional en la guía.

## Pruebas con fetch

Con el servidor iniciado, por ejemplo para bodega:

```bash
npm run bodega
```

En otra terminal:

```bash
npm run verificar -- bodega
```

El verificador también acepta una URL, por ejemplo `npm run verificar -- exp6 http://localhost:3006`. Lee el `.env` local para preparar sus cuentas de prueba y comprobar tokens vencidos. Se ejecuta contra una base de prácticas: crea correos y cursos únicos; conserva esas cuentas y los cursos para inspección. Limpia los libros, productos, categorías y tareas temporales de los casos correctos.

Para iniciar y comprobar los nueve servicios de forma automática, configura todos los `.env`, detén los servidores abiertos en los mismos puertos y ejecuta:

```bash
npm test
```

Para un subconjunto: `npm run comprobar -- exp1 exp2`. Los JSON de `evidencias` registran cada caso, su código esperado y el obtenido. Cualquier diferencia produce un código de salida distinto de cero.

## Evidencias incluidas y despliegue

La entrega contiene el registro de **176 comprobaciones HTTP correctas** realizadas el 13 de noviembre de 2026 con Node.js 24.22.1 y MySQL Community 8.4.7 **local**. Se probó TLS real con CA e identidad verificadas en las etapas que lo requieren. También se verificaron la persistencia tras reiniciar Node.js, el rechazo de otra CA, el acceso exclusivo mediante EXECUTE y el reinicio de Nodemon.

Se incluyen **26 capturas reales de pantalla** del entorno virtual de prueba en `evidencias/capturas`. El informe las presenta con número de figura y explicación. Consulta el índice en `docs/CAPTURAS.md` para localizar cada flujo implementado.

Estas pruebas no representan un despliegue en un DBaaS. Para acreditar la nube en la guía, completa la configuración con tu proveedor y agrega las dos capturas reales indicadas en `docs/EVIDENCIAS_NUBE.md`. El informe distingue la validación local de esa evidencia de despliegue.

## Integración con el repositorio

Copia esta carpeta completa dentro de `Fase2` del repositorio. Mantén `actividades`, `ejercicios`, `compartido`, `sql`, `scripts` y `pruebas` juntos. No se modificó ni publicó contenido en GitHub. El código de referencia revisado fue la rama `main`, commit `d0cd2ec` del 3 de noviembre de 2026.

El archivo `.gitignore` excluye `.env`, certificados, registros de consola y `node_modules`. Se incluye `package-lock.json` para repetir la instalación con `npm ci`. Los datos de ejemplo usan `example.test`.
