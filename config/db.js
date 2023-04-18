//5. aca va lo que se requiere para conectarse con mongodb
const mongoose = require('mongoose')


require('dotenv').config({path:'variables.env'})

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        })
        console.log('DB conectada')
    } catch (error) {
        console.log(error)
        process.exit(1) // detener app si hay error 
    }
}

module.exports = conectarDB