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