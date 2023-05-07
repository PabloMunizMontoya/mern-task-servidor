//55.0 aca va a ir el routing de proyectos

//55.1 express nos da todo el entorno para enrutar, usar middlewares y peticiones http, por eso en el enrrutador importamos express.
const express = require('express')
const router = express.Router()

//55.2 importamos el controlador para tareas
const tareasController = require('../controllers/tareasController')

//55.3 importamos el middleware de auth 
const auth = require('../middleware/auth')

//55.4 importamos check que es una dependencia de express validator para poder checker y validar los datos ingresados
const {check} = require('express-validator')

//55.5 creamos una tarea, definimos las acciones para la ruta
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty
    ],
    tareasController.crearTarea
)

module.exports = router
