//19. este componente tiene todo lo relacionado a la autorización 
const express = require('express')
const router = express.Router()
//20 importamos dependencias de express validator
const {check} = require('express-validator')
//26 importamos el controlador para auth 
const authController = require('../controllers/authController')
const auth =require('../middleware/auth')

//21. aca van todos los controladores, middleware, las validaciones y el método que usamos para llamar
// recordar que esta ruta esta definida en
//iniciamos session
 router.post('/', 

    //26.1 agregamos el controlador a la ruta autenticarUsuario viene del controlador (exports.autenticarUsuario)
    authController.autenticarUsuario
)
 
// obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
) 
module.exports = router