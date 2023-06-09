//29 aca va el model de proyectos

//30 importamos mongoose
const mongoose = require('mongoose')

//31 creamos el schema, usando un método de mongoose
const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {

        //31.2 sera el id del usuario que lo crea 
        type: mongoose.Schema.Types.ObjectId,

        //31.3 este ref hace referencia al nombre del Modelo de donde viene esta data es decir el id se genera cuando se genera un usuario nuevo, allí en la librería de usuario cada usuario tiene un id, entonces le decimos con ref de que librería llega este dato
        ref: 'Usuario'
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

//31.1 Proyecto sera el nombre de la librería en la db y proyectoSchema con lo que se llenara esa librería
module.exports = mongoose.model('Proyecto', ProyectoSchema)