//40 aca esta el middleware para verificar que el usuario este autentificado es decir con un login activo.

//41 importamos el JWT, ya que tenemos que enviar el token y validarlo 
const jwt = require('jsonwebtoken')

//42.creamos la function que vaa operar este middleware, como estamos usando express la function tiene un req, res,next 
module.exports = function (req,res,next){

    //42.1 leer el token del header
    const token = req.header('Authorization')
    

    //42.1 validamos si el usuario tiene o no un token 
    if (!token){
        //El error HTTP 401, también conocido como "Unauthorized" (No autorizado), indica que la solicitud HTTP no pudo ser procesada porque el cliente no está autorizado para acceder al recurso solicitado
        res.status(401).json({msg: 'No hay token, permiso no valido'})
    }

    //42.2 validamos el token con un try catch 
    try {
         //para ello comparamos el token cifrado con la palabra secreta que esta en el archivo .env de variables de entorno.en realidad jwt funciona cifrando la palabra secreta y el método verify nos permite verificar dicho cifrado con la palabra que le damos en el.env.
        const cifrado = jwt.verify(token, process.env.SECRETA)
        
        // una vez verificado como parte del request agregamos el usuario, entendamos que cifrado contiene el nombre del usuario y el id es por esto que desde cifrado que es la verificación del token, es decir desde el token podemos extraer el nombre y el id del usuario
        req.usuario = cifrado.usuario
        
        // finalmente le damos next para que valla al siguiente middleware
        next()
    } catch (error) {
        res.status(401).json({msg:'Token no valido'})
    }
}