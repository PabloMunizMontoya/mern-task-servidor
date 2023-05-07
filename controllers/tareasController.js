//56 controlador de tareas 

//56.1 importamos el modelo para tareas
const Tarea = require('../models/Tarea')

//56.2 como tarea requiere el id de cada proyecto también importamos el modelo de proyecto
const Proyecto = require('../models/Proyecto')

//56.4 importamos validationResults
const { ValidationResults } = require('express-validator')

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
}