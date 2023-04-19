const mongoose = require('mongoose')

//11 creamos el schema de usuarios 
const UsuarioSchema = mongoose.Schema({

    //13aca vamos a agregar los datos que requiere el modelo para el usuario: 
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()

    }
})

//12 exportamos el modelo con un método de mongoose, entonces el primer parámetro le decimos a mongoose que vamos a crear el modelo usuario con el usuarioSchema
module.exports = mongoose.model('Usuario', UsuarioSchema)