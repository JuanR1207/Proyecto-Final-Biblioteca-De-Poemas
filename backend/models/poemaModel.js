const pool = require('../db/connection')

const getAll = async () => {
  const res = await pool.query('SELECT * FROM poemas ORDER BY id DESC')
  return res.rows
}

const getAllByUsuario = async (usuario_id) => {
  const res = await pool.query(
    'SELECT * FROM poemas WHERE usuario_id = $1 ORDER BY id DESC',
    [usuario_id]
  )
  return res.rows
}

const getById = async (id) => {
  const res = await pool.query('SELECT * FROM poemas WHERE id = $1', [id])
  return res.rows[0]
}

const create = async (titulo, contenido, autor, usuario_id, categoria) => {
  const res = await pool.query(
    'INSERT INTO poemas (titulo, contenido, autor, usuario_id, categoria) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [titulo, contenido, autor, usuario_id, categoria]
  )
  return res.rows[0]
}

const update = async (id, titulo, contenido, autor, categoria) => {
  const res = await pool.query(
    'UPDATE poemas SET titulo=$1, contenido=$2, autor=$3, categoria=$4 WHERE id=$5 RETURNING *',
    [titulo, contenido, autor, categoria, id]
  )
  return res.rows[0]
}

const remove = async (id) => {
  await pool.query('DELETE FROM poemas WHERE id = $1', [id])
}

module.exports = { getAll, getAllByUsuario, getById, create, update, remove }