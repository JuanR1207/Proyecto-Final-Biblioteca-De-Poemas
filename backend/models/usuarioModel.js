const pool = require('../db/connection')

const getUserByUsername = async (usuario) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE usuario = $1',
    [usuario]
  )
  return result.rows[0]
}

const createUser = async (usuario, contrasena) => {
  const result = await pool.query(
    'INSERT INTO usuarios (usuario, contrasena, rol, creado_en) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [usuario, contrasena, 'usuario']
  )
  return result.rows[0]
}

module.exports = { getUserByUsername, createUser }