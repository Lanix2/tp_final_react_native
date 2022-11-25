
const router = require('express').Router();
const { 
    get_news
    ,post_news
    ,put_news
    ,delete_news
} = require('../controllers/news.controllers')


router.get('/get_news', get_news)
//lo ven todos los usuarios

router.post('/post_news', post_news)
//postea solo la prece o director

router.put('/put_news', put_news)
//editan solo prece y dire

router.delete('/delete_news', delete_news)
//elimina solo prece y dire


module.exports = router