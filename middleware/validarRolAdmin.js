const jwt = require('jsonwebtoken')

const ValidarRoLAdmin = (req, res, next) => {

    if (req.payload.rol != "Administrador") {
        return res.status(401).json({ msg: "No estás autorizado" })
    }

    next()

}

module.exports = {
    ValidarRoLAdmin
}