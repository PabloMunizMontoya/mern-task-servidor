//12.2 importamos el modelo de usuario
const Usuario = require('../models/User.js')

// 9 generamos una function para el controlador como estamos trabajando con redux ponemos  el req res.

exports.crearUsuario = async (req, res ) =>{

    /* //11 el req body son los datos que el usuario coloca en el body, es para esto que en el index pusimos app.use(express.json({extended: true})), para qeu los datos que el usuario coloque sean Leidos. este console.log nos va a mostrar los datos que el usuario puso en el formulario, en este caso y en esta instancia en postman
    console.log(req.body) */

    //12 creamos un usuario, primero ponemos un try catch para poder ver el error en caso de que halla uno
    try {
        let usuario

        //12.1 creamos el nuevo usuario, usamos el modelo importado para hacer esto Usuario y le damos los valores por el request.body
        usuario = new Usuario(req.body)

        //12.2 guardamos el usuario
        await usuario.save()

        //12.3 mensaje de confirmación
        res.send('Usuario creado correctamente')
        
    } catch (error) {

        //12.4 mostramos el error en consola y usamos el response para enviar ese error
        console.log(error)
        res.status(400).send('hubo un error')
    }
}