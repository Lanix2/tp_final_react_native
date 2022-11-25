const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Career_schema = new Schema({   
    carrera: String, 
    descripcion: String,
    duracion: Number,
    anio: Number,    
    materias: [{ 
        id_materia: String
    }],    
    asistencias: [{
        fecha: Date,
        id_usuarios: String
    }]
})


// Crear el modelo
const Career = mongoose.model('Careers', Career_schema);

module.exports = Career;