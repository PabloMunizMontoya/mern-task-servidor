//7. rutas para crear usuarios, middleware

const express = require('express')
const router = express.Router()
const usuarioController = require ('../controllers/usuarioController')

// 9.crea un usuario, recibimos un request de tipo post hacia esta url /api/usuarios, esta url esta configurada en el router en index, todo lo que esta dentro de las llaves es lo que se ejecuta cuando enviamos el request , para que esta parte no quede tan larga vamos a armar controladores para que controlen lo que pasa dentro de este request.
/* router.post('/', () => {
    console.log('creando usuario...')
}) */
//10. como ya tenemos el controlador que se ocupa de la funcionalidad esto ya no es un arrow function si no que es la ruta y su controlador, como cada controlador tiene varias funcionalidades le indicamos cual es la que queremos.
router.post('/', usuarioController.crearUsuario) 
module.exports = router