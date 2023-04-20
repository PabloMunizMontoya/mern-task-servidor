//32 aca va a ir el routing de proyectos

//33 express nos da todo el entorno para enrutar, usar middlewares y peticiones http, por eso en el enrrutador importamos express.
const express = require('express')
const router = express.Router()
//37 importamos el controlador para proyectos
const proyectoController = require('../controllers/proyectoController')
//43 importamos el middleware de auth 
const auth = require('../middleware/auth')

//34 esta es la ruta con el tipo de llamado http que nos da express
router.post('/', 

    //44.usamos el middleware auth para verificar que el usuario este autentificado, de esta forma puede crear un nuevo proyecto, el middleware es algo que esta antes  de la petición post.
    auth, 

    //38. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.crearProyecto.
    proyectoController.crearProyecto 

)

/* //43. creamos una petición get para traer los proyectos
router.get('/', 

    //44.usamos el middleware auth para verificar que el usuario este autentificado, de esta forma puede crear un nuevo proyecto, el middleware es algo que esta antes  de la petición post.
    auth,
    
    //38. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.crearProyecto.
    proyectoController.crearProyecto 

)
 */



module.exports = router