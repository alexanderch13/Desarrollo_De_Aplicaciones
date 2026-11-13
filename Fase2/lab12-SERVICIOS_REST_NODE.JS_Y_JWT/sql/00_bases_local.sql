-- ARCHIVO: sql/00_bases_local.sql
-- DESCRIPCION: Preparacion opcional local. Ejecutar como administrador antes de importar los procedimientos.
CREATE DATABASE IF NOT EXISTS biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS bodega CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS tareas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS matricula CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Crear con una cuenta administradora y elegir una contrasena propia.
CREATE USER IF NOT EXISTS 'lab12_app'@'%' IDENTIFIED BY 'REEMPLAZAR_CON_CLAVE_PROPIA';
GRANT EXECUTE ON biblioteca.* TO 'lab12_app'@'%';
GRANT EXECUTE ON bodega.* TO 'lab12_app'@'%';
GRANT EXECUTE ON tareas.* TO 'lab12_app'@'%';
GRANT EXECUTE ON matricula.* TO 'lab12_app'@'%';
