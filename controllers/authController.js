 //20. importamos el modelo de usuario
const Usuario = require('../models/User.js')

//21. importamos bcrypt para comparar el password ya hacheado
const bcryptjs = require('bcryptjs')

//22. importamos los resultados de la validación
const { validationResult } = require('express-validator')

//23. importamos jwt para hacer la validación del usuario
const jwt = require('jsonwebtoken')

//24 creamos método para autenticar el usuario 
 exports.autenticarUsuario = async (req, res) => {

    //25 revisamos si hay errores, la function importada desde express validator tiene como param el request, con este param analiza si hay errores y lo genera como un array
    const errores = validationResult(req)

    //25.1 si errores no esta vació, quiere decir que no hay errores, si esta lleno entonces retornamos un response con el array de los errores.
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //26.extraemos el email y el password del req
    const {email, password} = req.body

    //27 usamos el try catch para mostrar si hay un error o no 
    try {

        //27.1 revisar que el usuario tenga el mismo e mail, es decir que el usuario ya este registrado, entonces con el método de mongoose findOne revisamos si Usuario tiene el email si no nos retorna un mensaje de error 
        let usuario = await Usuario.findOne({email})
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        //27.2 revisamos ahora el password, lo hacemos con un método de bcryptjs, comparamos entonces el password ingresado con el existente en la bd, como el password esta hacheado con bcryptjs necesitamos usar el método de esta librería 
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

         //27.2 si todo es correcto creamos el jwt 
        const payload = {
            usuario : {
                id: usuario.id
            }
        }

        //firmar token
        jwt.sign(payload, process.env.SECRETA, {
            //esta parte es la configuración, nos dice que el token expira en una hora 
            expiresIn: 3600

        },  //esto es el callback para mostrar  el error o el token
            (error, token) => {
                if(error) throw error

                //cuando un usuario accede correctamente enviamos el token
                res.json({ token, msg: 'Usuario logeado correctamente' })
            }) 

    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}  

//obtiene que usuario esta autenticado
 exports.usuarioAutenticado = async (req, res) => {
    try {
        //el usuario esta siendo guardado en el middleware de auth, este middleware lo usamos en la ruta entonces podemos acceder al usuario y a su info y compararla con la biblioteca Usuario en. el select es la parte donde le decimos que no queremos pasarla a esa respuesta. 
        // para refrescar estamos comparando el id del usuario que recién crea una cuenta con los id de la librería Usuario, para obtener el id del usuario que recién crea la cuenta usamos el token que previamente guardamos en el localStorage, sacamos el valor de la memoria y se lo asignamos al clienteAxios para enviar el token via headers y poder hacer la petición correctamente.
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'hubo un error'})
    }
}  