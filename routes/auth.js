const { Router } = require('express')
const { auth } = require('../controllers/Auth')
const { check } = require('express-validator')


const router = Router()

// GUARDAR 
router.post('/',[
    //VALIDAR LOS DATOS CON FUNCION CHECK
    check('email', 'Invalid.email').isEmail(),
    check('password', 'Invalid.password').not().isEmpty(),

], auth)


module.exports = router