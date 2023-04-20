//32 aca va a ir el routing de proyectos

//33 express nos da todo el entorno para enrutar, usar middlewares y peticiones http, por eso en el enrrutador importamos express.
const express = require('express')
const router = express.Router()
//37 importamos el controlador para proyectos
const proyectoController = require('../controllers/proyectoController')

//34 esta es la ruta con el tipo de llamado http que nos da express
router.post('/', 

    //38. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.crearProyecto.
    proyectoController.crearProyecto 

)



module.exports = router