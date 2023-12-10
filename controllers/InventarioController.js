const { request, response } = require('express')
const Categoria = require('../models/Inventario')
const e = require('express')
const { validationResult } = require('express-validator')
const Inventario = require('../models/Inventario')



// CREAR  INVENTARIO
const createInventario = async (req = request, res = response) => {
    const { serial, modelo, descripcion, color, foto, fechaCompra, precio, usuario, marca, estadoEquipo, tipoEquipo } = req.body
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        //VALIDACION DE EXISTE SERIAL
        const existeSerial = await Inventario.findOne({ serial });
        if (existeSerial) {
            return res.status(400).send('Serial ya existe')
        }

        const datos = { serial, modelo, descripcion, color, foto, precio, fechaCompra, usuario, marca, estadoEquipo, tipoEquipo }
        datos.fechaCreacion = new Date()
        datos.fechaActualizacion = new Date()
        const inventario = new Inventario(datos)
        await inventario.save()
        return res.json(inventario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// LISTAR INVENTARIO
const getInventario = async (req = request, res = response) => {

    try {
        const inventario = await Inventario.find().populate([
            {
                path: "usuario",
                select: "nombre email estado"
            },
            {
                path: "marca",
                select: "nombre estado"
            },
            {
                path: "estadoEquipo",
                select: "nombre estado"
            },
            {
                path: "tipoEquipo",
                select: "nombre estado"
            }
        ])
        return res.status(201).json(inventario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ACTUALIZAR INVENTARIO
const updateInventario = async (req = request, res = response) => {

    try {
        const data = req.body

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        //VALIDACION DE EXISTE SERIAL
        const existeSerial = await Inventario.findOne({ serial: data.serial });
        if (existeSerial) {
            return res.status(400).send('Serial ya existe')
        }

        const { id } = req.params
        data.fechaActualizacion = new Date()
        const inventario = await Inventario.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json(inventario)
    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

// ELIMINAR INVENTARIO
const deleteInventario = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const inventario = await Inventario.findByIdAndDelete(id, { new: true })
        return res.status(201).json(inventario)

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}
module.exports = {
    createInventario,
    getInventario,
    updateInventario,
    deleteInventario
}