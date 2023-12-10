const { request, response } = require('express')
const EstadoEquipo = require('../models/EstadoEquipo')
const e = require('express')
const { validationResult} = require('express-validator')


// CREAR  ESTADO DE EQUIPO
const createEstadoEquipo = async (req = request, res = response) => {
    const { nombre,estado } = req.body
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }

        const datos = { nombre,estado }
        datos.fechaCreacion = new Date()
        datos.fechaActualizacion = new Date()
        const estadoEquipo = new EstadoEquipo(datos)
        await estadoEquipo.save()
        return res.json(estadoEquipo)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// LISTAR ESTADO DE EQUIPO
const getEstadoEquipo = async (req = request, res = response) => {

    try {
        const estadoEquipo = await EstadoEquipo.find()
        return res.status(201).json(estadoEquipo)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ACTUALIZAR ESTADO DE EQUIPO
const updateEstadoEquipo = async (req = request, res = response) => {

    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json(estadoEquipo)
    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ELIMINAR ESTADO DE EQUIPO
const deleteEstadoEquipo = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id, { new: true })
        return res.status(201).json(estadoEquipo)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}
module.exports = {
    createEstadoEquipo,
    getEstadoEquipo,
    updateEstadoEquipo,
    deleteEstadoEquipo
}