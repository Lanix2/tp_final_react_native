const mongoose = require('mongoose')
const Schema = mongoose.Schema

const News_schema = new Schema({   
    titulo: String, 
    descripcion: String,
    archivos: String,
    id_usuarios: String
})

// Crear el modelo
const News = mongoose.model('News', News_schema);

module.exports = News;