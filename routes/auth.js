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

    //21.1 agregamos las reglas de validación, para iniciar sección lo único que requerimos es e mail y password
    [
        check('email','Agrega un email valido').isEmail(),
        check('password', 'El password debe ser mínimo de 8 caracteres').isLength({ min:8})
        
    ],
    //26.1 agregamos el controlador a la ruta autenticarUsuario viene del controlador (exports.autenticarUsuario)
    authController.autenticarUsuario
)
 
// obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
) 
module.exports = router