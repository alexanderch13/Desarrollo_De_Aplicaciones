-- ARCHIVO: sql/usuarios_biblioteca.sql
-- DESCRIPCION: Usuarios de biblioteca con hashes bcrypt y version de sesion.
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  rol ENUM('admin','lector') NOT NULL,
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
