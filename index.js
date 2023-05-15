const express = require('express')
const conectarDB =require('./config/db')

//En el contexto de una aplicación web que utiliza React y la biblioteca Axios para enviar solicitudes HTTP desde el lado del cliente al servidor, CORS es importante porque puede prevenir ataques de seguridad. Por defecto, los navegadores web bloquean solicitudes HTTP desde un dominio diferente al del servidor, lo que significa que si estás enviando solicitudes HTTP desde una aplicación React a un servidor diferente al de tu aplicación, es posible que encuentres errores de CORS.
//Para permitir que las solicitudes HTTP se realicen correctamente entre diferentes dominios, debes configurar el servidor para que permita solicitudes CORS. En el caso de Axios, puedes configurar el encabezado 'Access-Control-Allow-Origin' en la respuesta del servidor para permitir solicitudes de cualquier dominio, o especificar el dominio permitido para la solicitud.
const cors = require('cors')

//1. creamos el servidor
const app = express()

//6. conectamos la db
conectarDB()

//habilitamos cors
app.use(cors())

//9. Habilitar express.json, esto nos permite leer datos que el usurario coloque. al poner esto tenemos que enviar el header en postman como application/json para ello abrimos el postman ponemos la ruta en este caso es http://localhost:4000/api/usuarios y en headers ponemos en el key : content-type y en el value le ponemos application/json, luego vamos a body elegimos raw y nos disponemos a llenar la info en formato json, esto quiere decir que le vamos a enviar por body un formato json
app.use(express.json({extended: true}))


//2.creamos el puerto, entonces si no existe el servidor en la variable de entorno se le asigna el 4000
const PORT = process.env.PORT || 4000


/* //4. Definimos la pagina principal, entonces cuando el usuario valla a la pagina principal va a tener una request y una response.
app.get('/', (req, res) => {
    res.send('Hola Mundo')
}) */

//8. importamos todas nuestras rutas
app.use('/api/usuarios', require('./routes/usuarios'))

//18. importamos la ruta para auth
app.use('/api/auth', require('./routes/auth'))

//35 importamos la ruta para proyectos
app.use('/api/proyectos', require('./routes/proyectos'))

//54.0 agregamos el routing de las tareas
app.use('/api/tareas', require('./routes/tareas'))

// 3. arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})

