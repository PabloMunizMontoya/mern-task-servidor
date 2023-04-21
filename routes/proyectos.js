//32 aca va a ir el routing de proyectos

//33 express nos da todo el entorno para enrutar, usar middlewares y peticiones http, por eso en el enrrutador importamos express.
const express = require('express')
const router = express.Router()
//37 importamos el controlador para proyectos
const proyectoController = require('../controllers/proyectoController')
//43 importamos el middleware de auth 
const auth = require('../middleware/auth')
//45 importamos check que es una dependencia de express validator para poder checker y validar los datos ingresados
const {check} = require('express-validator')

//34 esta es la ruta con el tipo de llamado http que nos da express
router.post('/', 

    //44.usamos el middleware auth para verificar que el usuario este autentificado, de esta forma puede crear un nuevo proyecto, el middleware es algo que esta antes  de la petición post.
    auth, 

    //45.1 después de revisar la authentication agregamos los datos que deben ser chequeados con express validator check('nombre_del_campo', 'Mensaje_de_error').regla_de_validación();
    [
        check('nombre', 'El nombre del proyecto es obligatorio' ).not().isEmpty()
    ],

    //38. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.crearProyecto.
    proyectoController.crearProyecto 

)

 //43. creamos una petición get para traer los proyectos
router.get('/', 

    //44.usamos el middleware auth para verificar que el usuario este autentificado, de esta forma solo el usuario autenticado puede ver sus proyectos
    auth,
    
    //38. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.obtenerProyectos.
    proyectoController.obtenerProyectos 

)

//49 creamos la ruta para actualizar un proyecto usamos esta  vez el método put, para esto en la ruta debemos tener el id/ via id
router.put('/:id', 

    //49.1 usamos el middleware auth para verificar que el usuario este autentificado, de esta forma solo el usuario autenticado puede actualizar sus proyectos
    auth,

    //49.2 validamos que el proyecto tenga un nombre
    [
        check('nombre', 'El nombre del proyecto es obligatorio' ).not().isEmpty()
    ], 
    
    //49.3. ponemos el controlador en la ruta y luego le decimos con que método operara ese controlador, si vemos en el controlador la funcionalidad del mismo viene exports.actualizarProyecto
    proyectoController.actualizarProyecto

)



module.exports = router