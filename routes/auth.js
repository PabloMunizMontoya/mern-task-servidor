//19. este componente tiene todo lo relacionado a la autorización 
const express = require('express')
const router = express.Router()
//20 importamos dependencias de express validator
const {check} = require('express-validator')
//26 importamos el controlador para auth 
const authController = require('../controllers/authController')

//21. aca van todos los controladores, middleware, las validaciones y el método que usamos para llamar
router.post('/', 

    //21.1 agregamos las reglas de validación, para iniciar sección lo único que requerimos es e mail y password
    [
        check('email','Agrega un email valido').isEmail()
        
    ],
    //26.1 agregamos el controlador a la ruta autenticarUsuario viene del controlador (exports.autenticarUsuario)
    authController.autenticarUsuario
)
module.exports = router