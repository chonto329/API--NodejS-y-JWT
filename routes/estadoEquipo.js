const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipo, updateEstadoEquipo, deleteEstadoEquipo } = require('../controllers/EstadoEquipoController')
const { check } = require('express-validator')
const {  ValidarJWT } = require('../middleware/validarJWT')
const {  ValidarRoLAdmin } = require('../middleware/validarRolAdmin')

const router = Router()

// GUARDAR
router.post('/', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
], createEstadoEquipo)
//LISTAR
router.get('/',  [ValidarJWT, ValidarRoLAdmin],getEstadoEquipo)
//ACTUALIZAR
router.put('/:id', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
], updateEstadoEquipo)
//ELIMINAR
router.delete('/:id', [ValidarJWT, ValidarRoLAdmin], deleteEstadoEquipo)

module.exports = router