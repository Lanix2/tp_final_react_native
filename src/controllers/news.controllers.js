const ctrlNews = {}

const News = require('../models/News');

ctrlNews.get_news = async (req, res) => {

    const news = await News.find()

    return res.json({
        msg: 'GET_news',
        news: news
    })
}


ctrlNews.post_news = async (req, res) => {
    const {titulo, descripcion} = req.body

    const id_user = "63583cbff45a6e030ff8a78f"

    const news = new News({
        "titulo": titulo,
        "descripcion": descripcion,
        "archivos": "../files/news",
        "id_usuarios": id_user
    })

    news.save()

    const neww = await News.find()

    return res.json({
        msg: 'POST_news',
        new: neww
    })
}


ctrlNews.put_news = async (req, res) => {

    const {titulo, descripcion} = req.body
   
    const id_user = "63583cbff45a6e030ff8a78f"
    const id_new = "63607d3169f65692244b0dfe"

    await News.updateOne(
        {id: id_new},{
            $set:{
                "titulo": titulo,
                "descripcion": descripcion,
                "id_usuarios": id_user               
            }       
        }
    )
    
    const neww = await News.find()

    return res.json({
        msg: 'PUT_news',
        new: neww
    })
}

ctrlNews.delete_news = async (req, res) => {

    const id_news = "63608a84ad91928d1843b156"

    await News.deleteOne({_id: id_news})

    const neww = await News.find()

    return res.json({
        msg: 'delete_news',
        new: neww
    })
}





module.exports = ctrlNews