const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users_schema = new Schema({   
    nombre: String, 
    apellido: String,
    fecha_nac: Date,
    direccion: String,
    email: String,
    contrasena: String,
    telefono: Number,
    sexo: Number,
    tipo: {
        type: String,
        enum: ['alumno', 'profesor', 'preceptor', 'director']
    },
    documentacion: String,
    notas:[{
       id_materia: String,
        nota: String,
        tipo: String
    }]

})

// Crear el modelo
const User = mongoose.model('Users', Users_schema);

module.exports = User;