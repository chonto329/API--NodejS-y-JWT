const { request, response } = require('express')
const Marca = require('../models/Marca')
const e = require('express')
const {validationResult} = require('express-validator')


// CREAR  MARCA
const createMarca = async (req = request, res = response) => {
    const { nombre,estado } = req.body
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }

        const datos = { nombre,estado }
        datos.fechaCreacion = new Date()
        datos.fechaActualizacion = new Date()
        const marca = new Marca(datos)
        await marca.save()
        return res.json(marca)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// LISTAR MARCA
const getMarca = async (req = request, res = response) => {

    try {
        const marca = await Marca.find()
        return res.status(201).json(marca)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ACTUALIZAR MARCA
const updateMarca = async (req = request, res = response) => {

    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }

        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        const marca = await Marca.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json(marca)
    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ELIMINAR MARCA
const deleteMarca = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const marca = await Marca.findByIdAndDelete(id, { new: true })
        return res.status(201).json(marca)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}
module.exports = {
    createMarca,
    getMarca,
    updateMarca,
    deleteMarca
}