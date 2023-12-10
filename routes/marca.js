const { Router } = require('express')
const { createMarca, getMarca, updateMarca, deleteMarca } = require('../controllers/MarcaController')
const { check } = require('express-validator')
const { ValidarJWT } = require('../middleware/validarJWT')
const { ValidarRoLAdmin } = require('../middleware/validarRolAdmin')

const router = Router()

// GAURDAR
router.post('/', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
], createMarca)
//LISTAR
router.get('/', [ValidarJWT, ValidarRoLAdmin], getMarca)
//ACTUALIZAR
router.put('/:id', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
], updateMarca)
//ELIMINAR
router.delete('/:id', [ValidarJWT, ValidarRoLAdmin], deleteMarca)

module.exports = router 