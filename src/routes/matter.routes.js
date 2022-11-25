
const router = require('express').Router();
const { 
    get_matter
    ,get_career  
    ,post_matter
    ,post_career
    ,post_news
    ,put_matter
    ,delete_matter  
} = require('../controllers/matter.controllers')


router.get('/get_matter', get_matter)
//materias correspondientes a la carrera elegida

router.get('/get_career', get_career) 
// si alum solo la carrera que cursa
//si profe -prece -dire todas

router.post('/post_matter', post_matter)
//crear materia solo director

router.post('/post_career', post_career)
//crear materia solo director

router.post('/post_news', post_news)
//crea noticias profesor

router.put('/put_matter', put_matter)
//editar materia solo director

router.delete('/delete_matter', delete_matter)
//eliminar materia solo director



module.exports = router