//12.2 importamos el modelo de usuario
const Usuario = require('../models/User.js')

//15 importamos bcrypt para hachear los passwords de los usuarios
const bcryptjs = require('bcryptjs')

//16. importamos los resultados de la validación
const { validationResult } = require('express-validator')

//17 importamos jwt para hacer la validación del usuario
const jwt = require('jsonwebtoken')

// 9 generamos una function para el controlador como estamos trabajando con redux ponemos  el req res.
exports.crearUsuario = async (req, res ) =>{


    //16.1 revisamos si hay errores, la function importada desde express validator tiene como param el request, con este param analiza si hay errores y lo genera como un array
    const errores = validationResult(req)

    //16.2 si errores no esta vació, quiere decir que no hay errores, si esta lleno entonces retornamos un response con el array de lso errores.
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    //13 extraemos las propiedades del body con array destructuring 
    const { email, password } = req.body

    /* //11 el req body son los datos que el usuario coloca en el body, es para esto que en el index pusimos app.use(express.json({extended: true})), para qeu los datos que el usuario coloque sean Leidos. este console.log nos va a mostrar los datos que el usuario puso en el formulario, en este caso y en esta instancia en postman
    console.log(req.body) */

    //12 creamos un usuario, primero ponemos un try catch para poder ver el error en caso de que halla uno.

    try {

        //14 revisar que el usuario registrado sea único, entonces usamos nuestro modelo y le aplicamos un método de mongoose llamado findOne, entonces esto le va a dar valor a la variable si hay un usuario con un email.
        let usuario = await Usuario.findOne({email})

        //14.1 luego validamos esta variable con un if else, si usuario es true pues l usuario ya existe
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe'})
        }

        //12.1 creamos el nuevo usuario, usamos el modelo importado para hacer esto Usuario y le damos los valores por el request.body
        usuario = new Usuario(req.body)

        //15. hacheamos el password después de validar y crear la instancia de usuario. 
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        //12.2 guardamos el usuario
        await usuario.save()

        //17.1 después de guardar el usuario usamos el jwt: crear y firmar el JWT
        //crear token, le damos al payload el valor del id del usuario.
        const payload = {
            usuario : {
                id: usuario._id
            }
        }

        //firmar token
        jwt.sign(payload, process.env.SECRETA, {
            //esta parte es la configuración, nos dice que el token expira en una hora 
            expiresIn: 3600

        },  //esto es el callback para mostrar  el error o el token
            (error, token) => {
                if(error) throw error
                res.json({ token, msg: 'Usuario creado correctamente' })
            })

        /* //12.3 mensaje de confirmación
        res.json({ msg: 'Usuario creado correctamente' })
        res.token */
        

    } catch (error) {

        //12.4 mostramos el error en consola y usamos el response para enviar ese error
        console.log(error)
        res.status(400).send('hubo un error')
    }
}