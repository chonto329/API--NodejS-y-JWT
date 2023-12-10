const express = require('express')
const { mongoConn } = require('./databases/configuration')
const dotenv = require('dotenv').config()
const cors = require('cors')

const usuarios = require('./routes/usuario')
const marcas = require('./routes/marca')
const tipoEquipos = require('./routes/tipoEquipo')
const estadoEquipos = require('./routes/estadoEquipo')
const inventarios = require('./routes/Inventario')
const auth = require('./routes/auth')


mongoConn()

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// middlewares
app.use(express.json())
app.use(cors(corsOptions))


app.use(cors(corsOptions));

// RUTAS 
app.use('/api/v1/usuarios', usuarios)
app.use('/api/v1/marcas', marcas)
app.use('/api/v1/tipoEquipos', tipoEquipos)
app.use('/api/v1/estadoEquipos', estadoEquipos)
app.use('/api/v1/inventarios', inventarios)
app.use('/api/v1/login', auth)


module.exports = app