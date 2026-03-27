const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/usuarioModel')

const buscarUsuario = async (usuario) => {
  return await userModel.getUserByUsername(usuario)
}

const registerUser = async (usuario, contrasena) => {
  const hashed = await bcrypt.hash(contrasena, 10)
  return await userModel.createUser(usuario, hashed)
}

const loginUser = async (usuario, contrasena) => {
  const user = await userModel.getUserByUsername(usuario)
  if (!user) throw new Error('Usuario no encontrado')

  const valid = await bcrypt.compare(contrasena, user.contrasena)
  if (!valid) throw new Error('Contraseña incorrecta')

  const token = jwt.sign(
    { id: user.id, usuario: user.usuario, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  return { id: user.id, usuario: user.usuario, rol: user.rol, token }
}

module.exports = { buscarUsuario, registerUser, loginUser }