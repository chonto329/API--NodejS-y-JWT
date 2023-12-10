const {Router} = require('express')
const { createTipoEquipo, getTipoEquipo, updateTipoEquipo, deleteTipoEquipo } = require('../controllers/TipoEquipoController')
const { check } = require('express-validator')
const {ValidarJWT } = require('../middleware/validarJWT')
const {ValidarRoLAdmin } = require('../middleware/validarRolAdmin')

const router = Router()

// GUARDAR
router.post('/', [ValidarJWT, ValidarRoLAdmin],[

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
], createTipoEquipo)
//LISTAR
router.get('/',  [ValidarJWT, ValidarRoLAdmin],getTipoEquipo)
//ACTUALIZAR
router.put('/:id', [ValidarJWT, ValidarRoLAdmin],[

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
],updateTipoEquipo)
//ELIMINAR
router.delete('/:id', [ValidarJWT, ValidarRoLAdmin], deleteTipoEquipo)

module.exports = router