const { Router } = require('express')
const { createUsuario, getUsuario, updateUsuario, deleteUsuario } = require('../controllers/UsuarioController')
const { check } = require('express-validator')
const { ValidarJWT } = require('../middleware/validarJWT')
const { ValidarRoLAdmin } = require('../middleware/validarRolAdmin')

const router = Router()

// GUARDAR 
router.post('/', [ValidarJWT, ValidarRoLAdmin] , [

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('email', 'Invalid.email').isEmail(),
    check('password', 'Invalid.password').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
    check('rol', 'Invalid.rol').isIn(['Administrador', 'Docente']),
], createUsuario)
//LISTAR
router.get('/', [ValidarJWT, ValidarRoLAdmin] ,getUsuario)
//ACTUALIZAR
router.put('/:id',[ValidarJWT, ValidarRoLAdmin] ,[

    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('nombre', 'Invalid.nombre').not().isEmpty(),
    check('email', 'Invalid.email').isEmail(),
    check('password', 'Invalid.password').not().isEmpty(),
    check('estado', 'Invalid.estado').isIn(['Activo', 'Inactivo']),
    check('rol', 'Invalid.rol').isIn(['Administrador', 'Docente']),
], updateUsuario)
//ELIMINAR
router.delete('/:id', [ValidarJWT, ValidarRoLAdmin] ,deleteUsuario)

module.exports = router