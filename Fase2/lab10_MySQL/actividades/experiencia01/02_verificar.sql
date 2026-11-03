-- Consultas de comprobacion. Se pueden repetir sin modificar la BD.
USE publications;

-- Debe aparecer pre1900. classics ya fue renombrada.
SHOW TABLES;

-- id: PRIMARY KEY y AUTO_INCREMENT; year: SMALLINT.
DESCRIBE pre1900;

-- PRIMARY, idx_author, idx_title, idx_type e idx_year.
SHOW INDEX FROM pre1900;

-- Tras 01_desarrollo.sql: cinco registros, con id de 1 a 5.
SELECT id, author, title, `type`, `year`
FROM pre1900
ORDER BY id;

SELECT COUNT(*) AS total_libros FROM pre1900;
