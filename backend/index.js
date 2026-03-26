const express = require('express')
const cors = require('cors')
require('dotenv').config()

const poemasRoutes = require('./routes/poemas')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/poemas', poemasRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})