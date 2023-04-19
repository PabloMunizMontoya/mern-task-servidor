//7. rutas para crear usuarios, middleware

const express = require('express')
const router = express.Router()
const usuarioController = require ('../controllers/usuarioController')

//15 importamos dependencias de express validator
const {check} = require('express-validator')


// 9.crea un usuario, recibimos un request de tipo post hacia esta url /api/usuarios, esta url esta configurada en el router en index, todo lo que esta dentro de las llaves es lo que se ejecuta cuando enviamos el request , para que esta parte no quede tan larga vamos a armar controladores para que controlen lo que pasa dentro de este request.
/* router.post('/', () => {
    console.log('creando usuario...')
}) */
//10. como ya tenemos el controlador que se ocupa de la funcionalidad esto ya no es un arrow function si no que es la ruta y su controlador, como cada controlador tiene varias funcionalidades le indicamos cual es la que queremos.

router.post('/', 

    //15.1 agregamos las reglas de validación
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password', 'El password debe de ser mínimo de 8 caracteres').isLength({min: 8})
    ],
    usuarioController.crearUsuario) 
module.exports = router