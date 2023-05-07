//36 aca esta el controlador de proyecto

//40 tenemos que importar el modelo de proyecto para que el controlador use sus datos
const Proyecto = require('../models/Proyecto')
//46 tenemos que ingresar en el controlador la validación dada por express validator en la ruta, para esto usamos esta dependencia de esta biblioteca que nos vaa mostrar el resultado de la validación
const {validationResult} = require('express-validator')


//37 creamos el controlador,  req y res, que son los objetos de solicitud y respuesta proporcionados por Express para manejar las solicitudes HTTP.
exports.crearProyecto =async (req,res) => {

    //46.1 usamos validationResult en el controlador
    // validationResult es una función proporcionada por la biblioteca express-validator que se utiliza para validar y verificar si se han cumplido las reglas de validación definidas para los campos de entrada de una solicitud HTTP.

    //La función validationResult toma como argumento la solicitud (req) y devuelve un objeto errors que contiene los errores de validación que se han producido durante la verificación de las reglas de validación definidas para los campos de entrada.
    const errores = validationResult(req)

    //46.2 si errores no esta vació, quiere decir que no hay errores, si esta lleno entonces retornamos un response con el array de los errores.
    if(!errores.isEmpty()){

        //El código de estado HTTP 400, también conocido como "Bad Request" (solicitud incorrecta), se utiliza para indicar que el servidor no puede procesar la solicitud del cliente debido a un problema con la solicitud misma.
        return res.status(400).json({errores: errores.array()})
    }

    //39. cuando estamos usando function asíncronas es recomendado usar el try catch, para poder observar el error u operar si es que todo va bien. 
    try {
        
        //41. creamos un nuevo proyecto, como lo único que necesitamos es el nombre del proyecto, para crear el proyecto requerimos no mas la info que viene desde el body(el form que llena proyecto en el front) luego guardamos proyecto y por ultimo usamos un response en formato json del proyecto
        const proyecto = new Proyecto(req.body)

         //43. queremos crear en el proyecto quien es el creador del mismo antes de guardarlo, insertamos el creador via JWT, si vemos en el modelo de proyecto tenemos una propiedad llamada creador y aca le damos valor usando el jWT desde el middleware. En el mismo le damos valor a esta propiedad usando el req.usuario = cifrado.usuario que traíamos desde la verificación del token, pero por que .id? si vamos al controller de usuario vemos que le damos el valor por payload que es el id, lo que nos interesa y lo que de hecho esta guardado en jwt es el id del usuario 
        proyecto.creador = req.usuario.id 

        proyecto.save();
        res.json(proyecto)
        
    } catch (error) {

        console.log(error)
        //39.1 status 500 se refiere a un error en el servidor
        res.status(500).send('Hubo un error')
    }
}

//47 creamos otra instancia del controlador para obtener los proyectos del usuario actual.
exports.obtenerProyectos = async(req,res) =>{

    //47.1 usamos un try catch para poder ver en consola el error en caso de que halla uno.
    try {

        //47.2 si recordamos bien y vemos en rutas para este get primero introducimos el auth, en el auth le dimos al usuario un valor(su id) entonces esa información ahora la podemos consumir aquí.
        //por lo tanto para obtener sus proyectos vamos a usar el modelo de proyectos y con un método de mongoose vamos a encontrar todos los proyectos que contengan el id del creador, luego mostramos con un res.json los proyectos encontrados bajo esta petición.
        //luego queremos mostrar los proyectos mostrando primero el ultimo creado usamos el sort y el valor de creado dentro del proyecto 
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1})
        res.json({proyectos})
        console.log(req.usuario)
    } catch (error) {
        console.log(error)
        //En resumen, el código de estado 500 se utiliza para indicar que ha habido un error en el servidor que ha impedido que se procese la solicitud del cliente, mientras que el código de estado 400 se utiliza para indicar que la solicitud del cliente no ha pasado la validación y no se puede procesar.
        res.status(500).send('Hubo un error')
    }
}

//48 creamos el controlador para actualizar un proyecto
exports.actualizarProyecto = async(req,res) =>{

    //48.1 validamos
    const errores = validationResult(req)

    //48.2 si errores no esta vació, quiere decir que no hay errores, si esta lleno entonces retornamos un response con el array de los errores.
    if(!errores.isEmpty()){

        //El código de estado HTTP 400, también conocido como "Bad Request" (solicitud incorrecta), se utiliza para indicar que el servidor no puede procesar la solicitud del cliente debido a un problema con la solicitud misma.
        return res.status(400).json({errores: errores.array()})
    }

    // 48.3 extraemos la info de proyecto, el nombre viene por el request del body y lo que queremos es mostrar el nuevo proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    // 48.4 tenemos que revisar cada entrada por individual, en este caso lo que se puede modificar del proyecto es el nombre, entonces si nombre tiene algo le damos al nuevo proyecto ese nombre
    if (nombre){
        nuevoProyecto.nombre = nombre
    }

    try {

        //48.5 queremos traer primero el proyecto por su id, Proyecto es el modelo y dentro del modelo revisamos un id, el id esta en los params, con esto revisamos el id.
        let proyecto = await Proyecto.findById(req.params.id)

        //48.6 revisamos si el proyecto existe o no, si proyecto no existe se muestra el mensaje de error. 
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        //48.7 verificamos que el creador del proyecto se el que hace el llamado de modificación, creador es una propiedad de cada proyecto que tiene el id de su creador. el to string es para convertir el object id e un string
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //48.8 finalmente actualizamos, le decimos que va a actualizar el contenido de ese id, luego le decimos con que lo va a actualizar
        proyecto = await Proyecto.findByIdAndUpdate(req.params.id, nuevoProyecto, {new: true})

        res.json({proyecto})


    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor ')
    }

}

//51. elimina proyecto por su id 
exports.eliminarProyecto = async (req, res) => {

    try {

        //51.2 revisamos el id
        let proyecto = await Proyecto.findById(req.params.id)

        //51.3 revisamos si el proyecto existe o no 
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //51.4 verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //51.5 Eliminar el proyecto
        await Proyecto.findOneAndRemove({_id : req.params.id})
        res.json({msg:'Proyecto eliminado'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor ')
    }
    
}