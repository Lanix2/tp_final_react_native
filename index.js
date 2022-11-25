
const express = require('express')
const {default: helmet} = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')


const usuario = "DavidR"
const password = "12125"

const uri = `mongodb+srv://${usuario}:${password}@drodrigues.c1pos.mongodb.net/${usuario}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})



//middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

//routes
app.use('/user', require('./src/routes/user.routes'))
app.use('/news', require('./src/routes/news.routes'))
app.use('/assistance', require('./src/routes/assistance.routes'))
app.use('/matter', require('./src/routes/matter.routes'))
//configs
const port = process.env.PORT || 3000

//archivos estátivos

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
  })