let poemas = [
  { id: 1, titulo: "Oda a la vida", autor: "Juan Pérez", categoria: "Amor", contenido: "La vida es bella...", autor_id: 1 },
  { id: 2, titulo: "El mar", autor: "Ana García", categoria: "Naturaleza", contenido: "El mar canta...", autor_id: 1 },
  { id: 3, titulo: "Soledad", autor: "Carlos López", categoria: "Tristeza", contenido: "En la soledad...", autor_id: 2 },
]

const getPoemas = (req, res) => {
  const { autor_id } = req.query
  if (autor_id) {
    return res.json(poemas.filter(p => p.autor_id === parseInt(autor_id)))
  }
  res.json(poemas)
}

const getPoemaById = (req, res) => {
  const poema = poemas.find(p => p.id === parseInt(req.params.id))
  if (!poema) return res.status(404).json({ mensaje: "Poema no encontrado" })
  res.json(poema)
}

const createPoema = (req, res) => {
  const nuevoPoema = { id: poemas.length + 1, ...req.body }
  poemas.push(nuevoPoema)
  res.status(201).json(nuevoPoema)
}

const updatePoema = (req, res) => {
  const index = poemas.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ mensaje: "Poema no encontrado" })
  poemas[index] = { ...poemas[index], ...req.body }
  res.json(poemas[index])
}

const deletePoema = (req, res) => {
  poemas = poemas.filter(p => p.id !== parseInt(req.params.id))
  res.json({ mensaje: "Poema eliminado" })
}

module.exports = { getPoemas, getPoemaById, createPoema, updatePoema, deletePoema }