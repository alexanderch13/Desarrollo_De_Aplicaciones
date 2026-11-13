-- ARCHIVO: sql/matricula.sql
-- DESCRIPCION: Usuarios, cursos, matriculas y notas con integridad referencial y procedimientos por operacion.
CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(120) NOT NULL UNIQUE,
      password_hash VARCHAR(100) NOT NULL,
      rol ENUM('admin','docente','estudiante') NOT NULL,
      token_version INT NOT NULL DEFAULT 0,
      creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    DELIMITER //
    DROP PROCEDURE IF EXISTS sp_usuario_registrar //
    CREATE PROCEDURE sp_usuario_registrar(IN p_nombre VARCHAR(100), IN p_email VARCHAR(120), IN p_hash VARCHAR(100), IN p_rol VARCHAR(20))
    BEGIN
      INSERT INTO usuarios(nombre,email,password_hash,rol) VALUES(p_nombre,p_email,p_hash,p_rol);
      SELECT LAST_INSERT_ID() AS id;
    END //
    DROP PROCEDURE IF EXISTS sp_usuario_buscar_email //
    CREATE PROCEDURE sp_usuario_buscar_email(IN p_email VARCHAR(120))
    BEGIN
      SELECT id,nombre,email,password_hash,rol,token_version FROM usuarios WHERE email=p_email;
    END //
    DROP PROCEDURE IF EXISTS sp_usuario_obtener //
    CREATE PROCEDURE sp_usuario_obtener(IN p_id INT)
    BEGIN
      SELECT id,nombre,email,rol,token_version,creado FROM usuarios WHERE id=p_id;
    END //
    DROP PROCEDURE IF EXISTS sp_usuario_password //
    CREATE PROCEDURE sp_usuario_password(IN p_id INT, IN p_hash VARCHAR(100), IN p_version INT)
    BEGIN
      UPDATE usuarios SET password_hash=p_hash,token_version=token_version+1 WHERE id=p_id AND token_version=p_version;
      SELECT ROW_COUNT() AS filas;
    END //
    DELIMITER ;

CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  docente_id INT NOT NULL,
  FOREIGN KEY(docente_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS matriculas (
  curso_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  PRIMARY KEY(curso_id,estudiante_id),
  FOREIGN KEY(curso_id) REFERENCES cursos(id),
  FOREIGN KEY(estudiante_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS notas (
  curso_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  nota DECIMAL(4,2) NOT NULL,
  PRIMARY KEY(curso_id,estudiante_id),
  FOREIGN KEY(curso_id,estudiante_id) REFERENCES matriculas(curso_id,estudiante_id),
  CONSTRAINT ck_nota CHECK(nota BETWEEN 0 AND 20)
);
DELIMITER //
DROP PROCEDURE IF EXISTS sp_cursos_listar //
CREATE PROCEDURE sp_cursos_listar()
BEGIN SELECT id,codigo,nombre,docente_id FROM cursos ORDER BY id; END //
DROP PROCEDURE IF EXISTS sp_curso_obtener //
CREATE PROCEDURE sp_curso_obtener(IN p_id INT)
BEGIN SELECT id,codigo,nombre,docente_id FROM cursos WHERE id=p_id; END //
DROP PROCEDURE IF EXISTS sp_curso_crear //
CREATE PROCEDURE sp_curso_crear(IN p_codigo VARCHAR(20),IN p_nombre VARCHAR(120),IN p_docente INT)
BEGIN
  INSERT INTO cursos(codigo,nombre,docente_id) VALUES(p_codigo,p_nombre,p_docente);
  SELECT LAST_INSERT_ID() AS id;
END //
DROP PROCEDURE IF EXISTS sp_matricula_crear //
CREATE PROCEDURE sp_matricula_crear(IN p_curso INT,IN p_estudiante INT)
BEGIN
  INSERT INTO matriculas(curso_id,estudiante_id) VALUES(p_curso,p_estudiante);
  SELECT p_curso AS curso_id,p_estudiante AS estudiante_id;
END //
DROP PROCEDURE IF EXISTS sp_matricula_obtener //
CREATE PROCEDURE sp_matricula_obtener(IN p_curso INT,IN p_estudiante INT)
BEGIN SELECT curso_id,estudiante_id FROM matriculas WHERE curso_id=p_curso AND estudiante_id=p_estudiante; END //
DROP PROCEDURE IF EXISTS sp_notas_guardar //
CREATE PROCEDURE sp_notas_guardar(IN p_curso INT,IN p_estudiante INT,IN p_nota DECIMAL(4,2))
BEGIN
  DECLARE v_existe INT DEFAULT 0;
  SELECT COUNT(*) INTO v_existe FROM notas WHERE curso_id=p_curso AND estudiante_id=p_estudiante;
  INSERT INTO notas(curso_id,estudiante_id,nota) VALUES(p_curso,p_estudiante,p_nota)
  ON DUPLICATE KEY UPDATE nota=p_nota;
  SELECT (v_existe=0) AS creado;
END //
DROP PROCEDURE IF EXISTS sp_notas_propias //
CREATE PROCEDURE sp_notas_propias(IN p_estudiante INT)
BEGIN
  SELECT c.id AS curso_id,c.codigo,c.nombre,n.nota
  FROM notas n JOIN cursos c ON c.id=n.curso_id
  WHERE n.estudiante_id=p_estudiante ORDER BY c.id;
END //
DELIMITER ;
