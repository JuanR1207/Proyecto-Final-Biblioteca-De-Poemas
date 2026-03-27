const poemaService = require('../services/poemaService')

const getPoemas = async (req, res) => {
  try {
    const { autor_id } = req.query
    const poemas = autor_id
      ? await poemaService.getPoemasDeUsuario(autor_id)
      : await poemaService.getAllPoemas()
    res.json(poemas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPoemaById = async (req, res) => {
  try {
    const poema = await poemaService.getPoemaById(req.params.id)
    if (!poema) return res.status(404).json({ mensaje: 'Poema no encontrado' })
    res.json(poema)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createPoema = async (req, res) => {
  try {
    const { titulo, contenido, autor, usuario_id, categoria } = req.body
    const nuevoPoema = await poemaService.createPoema(titulo, contenido, autor, usuario_id, categoria)
    res.status(201).json(nuevoPoema)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updatePoema = async (req, res) => {
  try {
    const { titulo, contenido, autor, categoria } = req.body
    const poemaActualizado = await poemaService.updatePoema(req.params.id, titulo, contenido, autor, categoria)
    if (!poemaActualizado) return res.status(404).json({ mensaje: 'Poema no encontrado' })
    res.json(poemaActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletePoema = async (req, res) => {
  try {
    await poemaService.deletePoema(req.params.id)
    res.json({ mensaje: 'Poema eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getPoemas, getPoemaById, createPoema, updatePoema, deletePoema }