
const router = require('express').Router();
const { 
    post_assistance
    ,get_assistance
} = require('../controllers/assistance.controllers')



router.post('/post_assistance', post_assistance)
//la usa el precepor y cpaz tambien director

router.get('/get_assistance', get_assistance)
//mismo 2 ultimos usuarios pueden consultar asistencias por curso


module.exports = router