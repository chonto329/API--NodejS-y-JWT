const { request, response } = require('express')
const Usuario = require('../models/Usuario')
const bcryt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { generarJWT } = require('../helpers/jwt')


// CREAR  USUARIO
const auth = async (req = request, res = response) => {
    const { email, password } = req.body
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array() })
        }
        //VALIDACION DE EXISTE EMAIL
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).send('Usuario no encontrado')
        }
        //VALIDAR CONTRASEÑAS
        const esIgual = bcryt.compareSync(password,usuario.password)
        if(!esIgual){
            return res.status(400).json({msg : "Usuario no encontrado"})
        }

        //GENERAR TOKEN 
        const token = generarJWT(usuario)
        //EVIAR RESPUESTA DE USUARIO
        res.json({
            _id: usuario._id,
            nombre : usuario.nombre,
            rol: usuario.rol,
            email: usuario.email,
            access_token : token
        })

    } catch (error) {
        console.log(error)
        return res.json({ msj: error })
    }
}

module.exports = {
    auth
}