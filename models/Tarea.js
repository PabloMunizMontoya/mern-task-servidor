//52.0 modelo para tarea

// 52.1 importamos mongoose
const mongoose = require('mongoose')

// 52.2 creamos el schema
const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true
    }, 
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
})

module.exports = mongoose.model('Tarea', TareaSchema)