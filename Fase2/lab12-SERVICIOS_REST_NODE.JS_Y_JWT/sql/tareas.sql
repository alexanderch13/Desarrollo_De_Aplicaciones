-- ARCHIVO: sql/tareas.sql
-- DESCRIPCION: Procedimientos de tareas con paginacion SQL y actualizacion parcial del estado.
CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  estado ENUM('pendiente','en_progreso','terminada') NOT NULL DEFAULT 'pendiente',
  fecha_limite DATE NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DELIMITER //
DROP PROCEDURE IF EXISTS sp_tareas_listar //
CREATE PROCEDURE sp_tareas_listar(IN p_limite INT,IN p_offset INT)
BEGIN
  SELECT id,titulo,descripcion,estado,fecha_limite FROM tareas ORDER BY id LIMIT p_limite OFFSET p_offset;
  SELECT COUNT(*) AS total FROM tareas;
END //
DROP PROCEDURE IF EXISTS sp_tareas_obtener //
CREATE PROCEDURE sp_tareas_obtener(IN p_id INT)
BEGIN SELECT id,titulo,descripcion,estado,fecha_limite FROM tareas WHERE id=p_id; END //
DROP PROCEDURE IF EXISTS sp_tareas_crear //
CREATE PROCEDURE sp_tareas_crear(IN p_titulo VARCHAR(200),IN p_descripcion TEXT,IN p_estado VARCHAR(20),IN p_fecha DATE)
BEGIN
  INSERT INTO tareas(titulo,descripcion,estado,fecha_limite) VALUES(p_titulo,p_descripcion,p_estado,p_fecha);
  SELECT LAST_INSERT_ID() AS id;
END //
DROP PROCEDURE IF EXISTS sp_tareas_actualizar //
CREATE PROCEDURE sp_tareas_actualizar(IN p_id INT,IN p_titulo VARCHAR(200),IN p_descripcion TEXT,IN p_estado VARCHAR(20),IN p_fecha DATE)
BEGIN
  DECLARE v_existe INT DEFAULT 0;
  SELECT COUNT(*) INTO v_existe FROM tareas WHERE id=p_id;
  UPDATE tareas SET titulo=p_titulo,descripcion=p_descripcion,estado=p_estado,fecha_limite=p_fecha WHERE id=p_id;
  SELECT v_existe AS filas;
END //
DROP PROCEDURE IF EXISTS sp_tareas_estado //
CREATE PROCEDURE sp_tareas_estado(IN p_id INT,IN p_estado VARCHAR(20))
BEGIN
  DECLARE v_existe INT DEFAULT 0;
  SELECT COUNT(*) INTO v_existe FROM tareas WHERE id=p_id;
  UPDATE tareas SET estado=p_estado WHERE id=p_id;
  SELECT v_existe AS filas;
END //
DROP PROCEDURE IF EXISTS sp_tareas_eliminar //
CREATE PROCEDURE sp_tareas_eliminar(IN p_id INT)
BEGIN DELETE FROM tareas WHERE id=p_id; SELECT ROW_COUNT() AS filas; END //
DELIMITER ;
