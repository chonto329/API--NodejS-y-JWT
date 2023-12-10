const { Router } = require('express')
const { createInventario, getInventario, updateInventario, deleteInventario } = require('../controllers/InventarioController')
const { check } = require('express-validator')
const {ValidarJWT} = require('../middleware/validarJWT')
const {ValidarRoLAdmin} = require('../middleware/validarRolAdmin')

const router = Router()

// GUADAR
router.post('/', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('serial', 'Invalid.serial').not().isEmpty(),
    check('modelo', 'Invalid.modelo').not().isEmpty(),
    check('descripcion', 'Invalid.descripcion').not().isEmpty(),
    check('color', 'Invalid.color').not().isEmpty(),
    check('foto', 'Invalid.foto').not().isEmpty(),
    check('fechaCompra', 'Invalid.fechaCompra').not().isEmpty(),
    check('precio', 'Invalid.precio').not().isEmpty().isFloat({ min: 0 }),
    check('usuario', 'Invalid.usuario').not().isEmpty(),
    check('marca', 'Invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'Invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'Invalid.tipoEquipo').not().isEmpty()

], createInventario)
//LISTAR
router.get('/', [ValidarJWT], getInventario)
//ACTUALIZAR
router.put('/:id', [ValidarJWT, ValidarRoLAdmin], [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('serial', 'Invalid.serial').not().isEmpty(),
    check('modelo', 'Invalid.modelo').not().isEmpty(),
    check('descripcion', 'Invalid.descripcion').not().isEmpty(),
    check('color', 'Invalid.color').not().isEmpty(),
    check('foto', 'Invalid.foto').not().isEmpty(),
    check('fechaCompra', 'Invalid.fechaCompra').not().isEmpty(),
    check('precio', 'Invalid.precio').not().isEmpty().isFloat({ min: 0 }),
    check('usuario', 'Invalid.usuario').not().isEmpty(),
    check('marca', 'Invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'Invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'Invalid.tipoEquipo').not().isEmpty()

], updateInventario)
//ELIMINAR
router.delete('/:id', [ValidarJWT, ValidarRoLAdmin], deleteInventario)

module.exports = router