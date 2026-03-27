const poemaModel = require('../models/poemaModel')

const getAllPoemas = () => poemaModel.getAll()
const getPoemasDeUsuario = (usuario_id) => poemaModel.getAllByUsuario(usuario_id)
const getPoemaById = (id) => poemaModel.getById(id)
const createPoema = (t, c, a, u, cat) => poemaModel.create(t, c, a, u, cat)
const updatePoema = (id, t, c, a, cat) => poemaModel.update(id, t, c, a, cat)
const deletePoema = (id) => poemaModel.remove(id)

module.exports = {
  getAllPoemas,
  getPoemasDeUsuario,
  getPoemaById,
  createPoema,
  updatePoema,
  deletePoema
}