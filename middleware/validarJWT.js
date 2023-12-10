const jwt = require('jsonwebtoken')

const ValidarJWT = (req, res, next) => {

    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ msg: "No autorizado" })
    }

    try {

        const payload = jwt.verify(token, "123456789")
        req.payload = payload
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "No autorizado" })
    }

}

module.exports = {
    ValidarJWT
}