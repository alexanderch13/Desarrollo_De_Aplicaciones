-- Laboratorio 10 - Experiencia 01: MySQL con phpMyAdmin.
-- Parte de Aron Daniel Guzman Flores.
-- Ejecutar una sola vez en una BD que no tenga classics ni pre1900.
-- No elimina ni reemplaza tablas existentes.

CREATE DATABASE IF NOT EXISTS publications
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE publications;

-- a) Crear la tabla inicial con los cuatro campos de la guia.
CREATE TABLE classics (
    author VARCHAR(128) NOT NULL,
    title VARCHAR(128) NOT NULL,
    `type` VARCHAR(16) NOT NULL,
    `year` CHAR(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DESCRIBE classics;

-- Agregar el identificador, la clave primaria y el autoincremento.
ALTER TABLE classics
    ADD COLUMN id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;

-- Registros de ejemplo proporcionados en la practica.
INSERT INTO classics (author, title, `type`, `year`) VALUES
    ('Mark Twain', 'The Adventures of Tom Sawyer', 'Fiction', '1876'),
    ('Jane Austen', 'Pride and Prejudice', 'Fiction', '1811'),
    ('Charles Darwin', 'The Origin of Species', 'Non-Fiction', '1856'),
    ('Charles Dickens', 'The Old Curiosity Shop', 'Fiction', '1841'),
    ('William Shakespeare', 'Romeo and Juliet', 'Play', '1594');

SELECT * FROM classics ORDER BY id;

-- b) Renombrar la tabla.
ALTER TABLE classics RENAME TO pre1900;

-- c) Cambiar el tipo de year. SMALLINT permite los anos anteriores a 1901.
ALTER TABLE pre1900 MODIFY COLUMN `year` SMALLINT NOT NULL;

-- d) Agregar indices sobre la tabla y los campos que realmente existen.
-- La guia vuelve a escribir classics/category, pero aqui son pre1900/type.
ALTER TABLE pre1900
    ADD INDEX idx_author (author(20)),
    ADD INDEX idx_title (title(20)),
    ADD INDEX idx_type (`type`(4)),
    ADD INDEX idx_year (`year`);

DESCRIBE pre1900;
SHOW INDEX FROM pre1900;
