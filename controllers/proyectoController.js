//36 aca esta el controlador de proyecto

//40 tenemos que importar el modelo de proyecto para que el controlador use sus datos
const Proyecto = require('../models/Proyecto')
const proyecto = require('../models/Proyecto')

//37 creamos el controlador,  req y res, que son los objetos de solicitud y respuesta proporcionados por Express para manejar las solicitudes HTTP.
exports.crearProyecto =async (req,res) => {

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