-- Estructura final para que el companero levante la BD en su XAMPP.
-- Contiene solo la estructura; no contiene registros de ejemplo.
-- Importar en una instalacion que aun no tenga la tabla pre1900.
-- Este archivo es una alternativa a ejecutar 01_desarrollo.sql.

CREATE DATABASE IF NOT EXISTS publications
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE publications;

CREATE TABLE pre1900 (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    author VARCHAR(128) NOT NULL,
    title VARCHAR(128) NOT NULL,
    `type` VARCHAR(16) NOT NULL,
    `year` SMALLINT NOT NULL,
    PRIMARY KEY (id),
    KEY idx_author (author(20)),
    KEY idx_title (title(20)),
    KEY idx_type (`type`(4)),
    KEY idx_year (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
