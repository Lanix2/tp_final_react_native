const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Matter_schema = new Schema({                  
    materia: String,
    descripcion: String,
    cuatrimestre: Number,
    noticias: [{
        titulo: String, 
        descripcion: String,
        archivos: String
    }]
    
})

// Crear el modelo
const Matter = mongoose.model('Matter', Matter_schema);

module.exports = Matter;