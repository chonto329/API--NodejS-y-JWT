const { request, response } = require('express')
const TipoEquipo = require('../models/TipoEquipo')
const e = require('express')
const { validationResult } = require('express-validator')



// CREAR  TIPO DE EQUIPO
const createTipoEquipo = async (req = request, res = response) => {
    const { nombre, estado } = req.body
    try {


        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }

        const datos = { nombre, estado }
        datos.fechaCreacion = new Date()
        datos.fechaActualizacion = new Date()
        const tipoEquipo = new TipoEquipo(datos)
        await tipoEquipo.save()
        return res.json(tipoEquipo)

    } catch (error) {
        s
        console.log(error)
        return res.json({ msj: error })
    }
}

// LISTAR TIPO DE EQUIPO
const getTipoEquipo = async (req = request, res = response) => {

    try {
        const tipoEquipo = await TipoEquipo.find()
        return res.status(201).json(tipoEquipo)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ACTUALIZAR TIPO DE EQUIPO
const updateTipoEquipo = async (req = request, res = response) => {

    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json(tipoEquipo)
    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ELIMINAR TIPO DE EQUIPO
const deleteTipoEquipo = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const tipoEquipo = await TipoEquipo.findByIdAndDelete(id, { new: true })
        return res.status(201).json(tipoEquipo)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}
module.exports = {
    createTipoEquipo,
    getTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo
}