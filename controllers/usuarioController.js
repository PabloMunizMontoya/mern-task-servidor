// 9 generamos una function para el controlador como estamos trabajando con redux ponemos  el req res.

exports.crearUsuario = (req, res ) =>{

    //11 el req body son los datos que el usuario coloca en el body, es para esto que en el index pusimos app.use(express.json({extended: true})), para qeu los datos que el usuario coloque sean Leidos.
    console.log(req.body)
}