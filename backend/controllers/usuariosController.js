const usuarioService = require('../services/usuarioService')

const register = async (req, res) => {
  const { usuario, contraseña, contrasena } = req.body
  const pass = contraseña || contrasena

  if (!usuario || !pass) {
    return res.status(400).json({ mensaje: 'Datos incompletos' })
  }

  try {
    const existe = await usuarioService.buscarUsuario(usuario)
    if (existe) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' })
    }

    await usuarioService.registerUser(usuario, pass)
    res.status(201).json({ mensaje: 'Usuario creado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error del servidor' })
  }
}

const login = async (req, res) => {
  const { usuario, contraseña, contrasena } = req.body
  const pass = contraseña || contrasena

  if (!usuario || !pass) {
    return res.status(400).json({ mensaje: 'Datos incompletos' })
  }

  try {
    const resultado = await usuarioService.loginUser(usuario, pass)
    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(400).json({ mensaje: error.message })
  }
}

module.exports = { register, login }