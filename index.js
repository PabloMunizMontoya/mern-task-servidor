const express = require('express')

//1. creamos el servidor
const app = express()

//2.creamos el puerto, entonces si no existe el servidor en la variable de entorno se le asigna el 4000
const PORT = process.env.PORT || 4000

//4. Definimos la pagina principal, entonces cuando el usuario valla a la pagina principal va a tener una request y una response.
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

// 3. arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})

