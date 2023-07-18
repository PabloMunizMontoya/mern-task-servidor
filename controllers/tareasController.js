//56 controlador de tareas 

//56.1 importamos el modelo para tareas
const Tarea = require('../models/Tarea')

//56.2 como tarea requiere el id de cada proyecto también importamos el modelo de proyecto
const Proyecto = require('../models/Proyecto')

//56.4 importamos validationResults
const { validationResult } = require('express-validator')

//56.3 creamos una nueva tarea
exports.crearTarea = async (req, res) => {

    //56.4 usamos validationResult en el controlador

    // validationResult es una función proporcionada por la biblioteca express-validator que se utiliza para validar y verificar si se han cumplido las reglas de validación definidas para los campos de entrada de una solicitud HTTP. que esta en routes/tareas: [
    //    check('nombre', 'El nombre es obligatorio').not().isEmpty
    //()],

    //La función validationResult toma como argumento la solicitud (req) y devuelve un objeto errors que contiene los errores de validación que se han producido durante la verificación de las reglas de validación definidas para los campos de entrada.
    const errores = validationResult(req)

    //56.5 si errores no esta vació, quiere decir que no hay errores, si esta lleno entonces retornamos un response con el array de los errores.
    if(!errores.isEmpty()){

        //El código de estado HTTP 400, también conocido como "Bad Request" (solicitud incorrecta), se utiliza para indicar que el servidor no puede procesar la solicitud del cliente debido a un problema con la solicitud misma.
        return res.status(400).json({errores: errores.array()})
    }

    try {
         //56.6 extraer el proyecto y comprobar si existe, necesitamos el id del proyecto para compararlo y hacer comprobaciones, el proyecto lo obtenemos por body.

        //req es un objeto que representa la solicitud que se ha enviado al servidor. Este objeto contiene información sobre la solicitud, como las cabeceras, la URL solicitada, el método HTTP utilizado (por ejemplo, GET o POST), y cualquier dato enviado en el cuerpo de la solicitud.

        //req.body es una propiedad de req que contiene los datos enviados en el cuerpo de la solicitud, si los hay. En este caso, parece que se espera que los datos estén en formato JSON.
        const {proyecto} = req.body

        //56.7 validamos si el proyecto existe usando el id que traemos por req.body y el id de algún proyecto dentro de el modelo Proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //56.8 revisar si el proyecto actual pertenece al usuario autentificado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //56.9 creamos la tarea
        const tarea = new Tarea(req.body)
        
        await tarea.save()
        res.json({tarea})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//57.1 obtiene las tareas del proyecto indicado
exports.obtenerTareas = async (req, res) => {

    try {
        //57.2 extraer el proyecto y comprobar si existe, necesitamos el id del proyecto para compararlo y hacer comprobaciones, el proyecto lo obtenemos por body.

        //req es un objeto que representa la solicitud que se ha enviado al servidor. Este objeto contiene información sobre la solicitud, como las cabeceras, la URL solicitada, el método HTTP utilizado (por ejemplo, GET o POST), y cualquier dato enviado en el cuerpo de la solicitud.

        //req.body es una propiedad de req que contiene los datos enviados en el cuerpo de la solicitud, si los hay. En este caso, parece que se espera que los datos estén en formato JSON.
        const {proyecto} = req.query
        console.log(proyecto)
        //57.3 validamos si el proyecto existe usando el id que traemos por req.body y el id de algún proyecto dentro de el modelo Proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //57.4 revisar si el proyecto actual pertenece al usuario autentificado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //57.5 obtener las tareas por proyecto, vaa buscar las tareas en el proyecto que pasamos mas arriba por req.body
        const tareas = await Tarea.find
        ({proyecto}).sort({ creado: -1})
        res.json({ tareas })
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//59.1 controlador para actualizar tareas
exports.actualizarTareas = async (req, res) => {
    try {

        //59.2 extraemos los datos que necesitamos
        const {proyecto, nombre, estado} = req.body

        //59.3 revisamos si la tarea existe
        const tareaExiste = await Tarea.findById(req.params.id)

        if(!tareaExiste) {
            return res.status(404).json({msg: 'No existe esa tarea'})
        }

        //59.4 comprobamos que proyecto si exista
        const existeProyecto = await Proyecto.findById(proyecto)

        //59.4 validamos
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        
        //59.5 si el creador del proyecto no es quien quiere modificar 
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //59.6 creamos un objeto con la nueva información
        const nuevaTarea = {}

        //59.6.1 si el usuario cambia el nombre
        if(nombre) {
            nuevaTarea.nombre = nombre
        }

        //59.6.2 si el usuario cambia el estado
        if(estado) {
            nuevaTarea.estado = estado
        }
        
        //59.7 guardamos la tarea nueva 
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new:true})

        res.json({ tarea })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//60.1 controlador para eliminar tarea
exports.eliminarTareas = async (req, res) => {
    try {

        //60.2 extraemos los datos que necesitamos, enviamos proyecto por que proyecto tiene la persona que lo creo
        const {proyecto} = req.query
        
        //60.3 revisamos si la tarea existe
        const tareaExiste = await Tarea.findById(req.params.id)

        if(!tareaExiste) {
            return res.status(404).json({msg: 'No existe esa tarea'})
        }

        //60.4 comprobamos que proyecto si exista
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //60.5 comprobamos el creador del proyecto que quien quiere hacer la modificación 
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //60.6 Eliminar el proyecto
        await Tarea.findOneAndRemove({_id : req.params.id})
        res.json({msg:'Tarea eliminada'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}