
const router = require('express').Router();
const { check } = require('express-validator')



const { 
    get_user
    ,post_nota
    ,register_user
    ,put_user
    ,delete_user 
    ,login
    ,auth
} = require('../controllers/users.controllers')


router.get('/get_user', get_user)
//obtenemos un usuario para consultarlo

//router.get('/get_users', get_users)
//obtenemos todos los usuarios para conmsultarlos

//router.post('/post_user', post_user) //ver


router.post('/register_user', register_user)
//creamos usuario -> preceptora y director

router.post('/login', login)

router.post('/auth', auth)
//logear usuario

router.post('/post_nota', post_nota)
//profesor carga notas

router.put('/put_user', put_user)
//editar datos alumnno

router.delete('/delete_user', delete_user)
//borrar usuario ver luego...


module.exports = router