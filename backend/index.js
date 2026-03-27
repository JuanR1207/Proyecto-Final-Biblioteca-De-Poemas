const express = require('express')
const cors = require('cors')
require('dotenv').config()

// ✅ Pool importado al principio
const pool = require('./db/connection')

const poemasRoutes = require('./routes/poemas')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/poemas', poemasRoutes)
app.use('/api/usuarios', require('./routes/usuariosRoutes'))

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

pool.query('SELECT NOW()')
  .then(res => console.log('DB conectada:', res.rows))
  .catch(err => console.error('Error DB:', err))