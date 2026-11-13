-- ARCHIVO: sql/biblioteca.sql
-- DESCRIPCION: Esquema y cinco procedimientos CRUD del catalogo. Seleccionar antes la base biblioteca.
CREATE TABLE IF NOT EXISTS libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  autor VARCHAR(120) NOT NULL,
  anio SMALLINT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT ck_libro_anio CHECK (anio IS NULL OR anio BETWEEN 0 AND 9999)
);
INSERT INTO libros (id, titulo, autor, anio) VALUES
  (1, 'Catalogo inicial', 'Autor de ejemplo', 2024),
  (2, 'Servicios web', 'Autor de ejemplo', 2025)
ON DUPLICATE KEY UPDATE id = libros.id;
DELIMITER //
DROP PROCEDURE IF EXISTS sp_libros_listar //
CREATE PROCEDURE sp_libros_listar()
BEGIN
  SELECT id, titulo, autor, anio FROM libros ORDER BY id;
END //
DROP PROCEDURE IF EXISTS sp_libros_obtener //
CREATE PROCEDURE sp_libros_obtener(IN p_id INT)
BEGIN
  SELECT id, titulo, autor, anio FROM libros WHERE id = p_id;
END //
DROP PROCEDURE IF EXISTS sp_libros_crear //
CREATE PROCEDURE sp_libros_crear(IN p_titulo VARCHAR(200), IN p_autor VARCHAR(120), IN p_anio SMALLINT)
BEGIN
  INSERT INTO libros(titulo, autor, anio) VALUES(p_titulo, p_autor, p_anio);
  SELECT LAST_INSERT_ID() AS id;
END //
DROP PROCEDURE IF EXISTS sp_libros_actualizar //
CREATE PROCEDURE sp_libros_actualizar(IN p_id INT, IN p_titulo VARCHAR(200), IN p_autor VARCHAR(120), IN p_anio SMALLINT)
BEGIN
  DECLARE v_existe INT DEFAULT 0;
  SELECT COUNT(*) INTO v_existe FROM libros WHERE id = p_id;
  UPDATE libros SET titulo=p_titulo, autor=p_autor, anio=p_anio WHERE id=p_id;
  SELECT v_existe AS filas;
END //
DROP PROCEDURE IF EXISTS sp_libros_eliminar //
CREATE PROCEDURE sp_libros_eliminar(IN p_id INT)
BEGIN
  DELETE FROM libros WHERE id=p_id;
  SELECT ROW_COUNT() AS filas;
END //
DELIMITER ;
