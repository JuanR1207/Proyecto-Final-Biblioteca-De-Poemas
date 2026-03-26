const express = require('express')
const router = express.Router()
const {
  getPoemas,
  getPoemaById,
  createPoema,
  updatePoema,
  deletePoema
} = require('../controllers/poemasController')

router.get('/', getPoemas)
router.get('/:id', getPoemaById)
router.post('/', createPoema)
router.put('/:id', updatePoema)
router.delete('/:id', deletePoema)

module.exports = router