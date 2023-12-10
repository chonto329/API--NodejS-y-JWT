const { request, response } = require('express')
const Usuario = require('../models/Usuario')
const e = require('express')
const bcryt = require('bcryptjs')
const { validationResult } = require('express-validator')


// CREAR  USUARIO
const createUsuario = async (req = request, res = response) => {
    const { nombre, email, password, estado, rol } = req.body
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        //VALIDACION DE EXISTE EMAIL
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).send('Email ya existe')
        }

        //ENCRYTAR CONTRASEÑA DE USUARIO CON BYCRYT
        const salt = bcryt.genSaltSync()
        const pass = bcryt.hashSync(password, salt)

        const datos = {
            nombre,
            email,
            password: pass,
            estado,
            rol
        }
        datos.fechaCreacion = new Date()
        datos.fechaActualizacion = new Date()

        const usuario = new Usuario(datos)
        await usuario.save()
        return res.json(usuario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// LISTAR USUARIO
const getUsuario = async (req = request, res = response) => {

    try {
        const usuario = await Usuario.find()
        return res.status(201).json(usuario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ACTUALIZAR USUARIO
const updateUsuario = async (req = request, res = response) => {

    try {

        const data = req.body

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        //VALIDACION DE EXISTE EMAIL
        const existeEmail = await Usuario.findOne({ email : data.email });
        if (existeEmail) {
            return res.status(400).send('Email ya existe')
        }

        //ENCRYTAR CONTRASEÑA DE USUARIO CON BYCRYT
        const salt = bcryt.genSaltSync()
        const pass = bcryt.hashSync(data.password, salt)

        const { id } = req.params
        data.password = pass
        data.fechaActualizacion = new Date()
        const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json(usuario)
    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ELIMINAR USUARIO
const deleteUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndDelete(id, { new: true })
        return res.status(201).json(usuario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}
module.exports = {
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
}